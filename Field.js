//https://www.ibm.com/support/knowledgecenter/SSEPEK_11.0.0/apsg/src/tpc/db2z_hostvariablecobol.html
//https://www.ibm.com/support/knowledgecenter/SS6SG3_4.2.0/com.ibm.entcobol.doc_4.2/PGandLR/ref/rlddecom.htm

const USAGE = ["BINARY", "COMP", "COMP-1", "COMP-2", "COMP-3", "COMP-4", "COMP-5", "PACKED-DECIMAL", "DISPLAY", "SIGN TRAILING SEPARATE CHARACTER", "SIGN LEADING SEPARATE CHARACTER"];

class Field {
    constructor(input, id) {
        this.childs = [];
        this.id = id;
        this.start = 0;
        this.end = 0;
        this.validation = {
            level: 0,
            color: "bg-success",
            message: []
        }
        if (input) {
            this.parseLine(input);
        }

    }


    parseLine(input) {

        let level, name, type, rest;
        [level, name, type, ...rest] = input;
        this.setLevel(level);
        this.setName(name);

        if (this.name == "") {
            [level, type, ...rest] = input;
        }


        this.setSubstructure(type, rest);
    }

    setParent(parent) {
        this.parent = parent;
    }

    setLevel(level) {
        this.level = level;

        if (isNaN(this.level)) {
            this.setValidation(8, "Nivel no numérico");
        }
    }

    setName(name) {
        if (name == "PIC" || name == "OCCURS" || name == "REDEFINES") {
            this.name = "";
            this.setValidation(8, "Falta el nombre");
        } else {
            this.name = name


        }
    }

    removePrefix(prefix) {
        let replace = prefix;
        let reg = new RegExp(`^${replace}`);

        if (this.name) {
            this.name = this.name.replace(reg, "");

        } else {
            this.setValidation(8, "Falta el nombre");
        }

    }

    removeSufix() {
        if (this.name) {
            let temp = Array.from(this.name);
            if (temp[temp.length - 1] == ":" && temp[temp.length - 2] == ";" && temp[temp.length - 3] == ":") {
                temp.splice(temp.length - 1);
                temp.splice(temp.length - 1);
                temp.splice(temp.length - 1);
                this.name = temp.join("");
            }
        } else {
            this.setValidation(8, "Falta el nombre");
        }
    }



    setSubstructure(type, data) {
        switch (type) {
            case 'PIC':
                this.isPic = true;
                this.setPicture(data)
                break;
            case 'OCCURS':
                this.isOccurs = true;
                this.setOccurs(data)
                break;
            case 'REDEFINES':
                this.isRedefines = true;
                break;
            case undefined:
                this.isSubstructure = true;
                break;
            default:
                this.setValidation(8, `Valor "${type}" no definido`);
        }
    }

    setPicture(value) {
        let picText, usage;
        [picText, ...usage] = value;

        let PIC = parsePIC(picText);

        if (PIC) {
            Object.assign(this, PIC);
        } else {
            this.setValidation(8, `Picture no válida`);
        }

        if (usage.length > 0) {
            this.usage = usage.join(" ");
            if (usage[0] == "OCCURS") {
                this.isOccurs = true;
                this.occurs = usage[1];
                this.usage = '';
            }
        }

        if (this.type == "AN") {
            if (this.usage) {
                this.setValidation(8, `Campo alfanumérico con usage: ${this.usage}`);
            }

        } else {
            if (!USAGE.includes(this.usage) && this.usage) {
                this.setValidation(8, `Usage incorrecto: ${this.usage}`);
                this.usage = '';
            }

            if (usage == 'COMP-3' ||
                usage == 'PACKED-DECIMAL') {
                this.type = 'PD';
                if ((this.integer + this.decimal) % 2 == 0) {
                    this.setValidation(4, "Packed decimal par")
                }
            }

            if (usage == 'COMP-1' ||
                usage == 'COMP' ||
                usage == 'BINARY' ||
                usage == 'COMP-4') {
                this.type = 'BI';
            }

            if (usage[0] == "OCCURS") {
                console.log("aqui3")
                this.isOccurs = true;
                this.setOccurs(usage[1]);
            }

            if (this.usage == "SIGN TRAILING SEPARATE CHARACTER" ||
                this.usage == "SIGN LEADING SEPARATE CHARACTER") {
                if (!this.sign) {
                    this.setValidation(8, "Campo sin signo pero con modificador de signo")
                }
                this.type = "SFF";
            }


        }


        if (normalize.checked && !this.mask) {
            this.normalize(picText);
        } else {
            this.picText = value[0];
        }

        this.setLength();


    }

    setLength() {

        switch (this.type) {
            case 'AN':
                break;
            case 'ZD':
            case 'SFF':
                this.length = this.integer + this.decimal;
                if (this.usage == 'SIGN TRAILING SEPARATE CHARACTER' ||
                    this.usage == 'SIGN LEADING SEPARATE CHARACTER') {
                    this.length++;
                }
                break;
            case 'PD':
                this.length = Math.floor((this.integer + this.decimal) / 2) + 1;
                break;
            case 'BI':
                let length = this.integer + this.decimal;
                if (length > 0 && length <= 4) {
                    this.length = 2;
                } else if (length >= 5 && length <= 9) {
                    this.length = 4;
                } else if (length >= 10 && length <= 18) {
                    this.length = 8;
                }
                break;
            default:
                this.setValidation(8, `Tipo de picture no definido: "${this.type}"`);
                this.length = 0;

        }

        if (isNaN(this.length)) {
            this.setValidation(8, `Longitud incorrecta ${this.length}`);
            this.length = 0;
        }

        if (this.type != 'AN' && (this.integer + this.decimal) > 18) {
            this.setValidation(8, 'Campo numérico demasiado largo');
        }

    }

    setOccurs(value) {
        let num;
        [num] = value;
        num = parseInt(num)
        if (isNaN(num)) {
            this.setValidation(8, "Occurs no numérico")
        } else {
            this.occurs = num;
        }
    }

    addChild(child) {
        this.childs.push(child[0]);
    }

    setDepth(depth) {
        this.depth = depth;
    }

    normalize() {
        if (this.type == 'AN') {
            this.picText = `X(${nf(this.length)})`
        }

        if (this.type == 'ZD' || this.type == 'PD' || this.type == 'BI' || this.type == "SFF") {
            if (this.decimal == 0) {
                this.picText = `9(${nf(this.integer)})`;
            } else {
                this.picText = `9(${nf(this.integer)})V9(${nf(this.decimal)})`;
            }

            if (this.sign) {
                this.picText = 'S' + this.picText;
            }
        }
    }

    setValidation(value, tooltip) {
        if (this.validation.level < value) {
            this.validation.level = value;
        }

        switch (this.validation.level) {
            case 0:
                this.validation.color = "bg-success";
                break;
            case 4:
                this.validation.color = "bg-warning";
                break;
            case 8:
                this.validation.color = "bg-danger";
                break;
        }

        let color = this.validation.color;

        let duplicated = false;

        if (this.validation.message.length) {
            duplicated = this.validation.message.map(x => x.tooltip == tooltip).reduce((a, b) => a && b);

        }


        if (!duplicated) {
            this.validation.message.push({ color, tooltip })

        }


    }

    setStart(start) {
        if (this.start == 0 && !this.isOccurs) this.start = start;
    }

    setEnd(end) {
        if (this.end == 0 && !this.isOccurs) this.end = end;
    }
}

function nf(num) {
    if (num.toString().length < 2) {
        return '0' + num;
    } else {
        return num.toString();
    }
}