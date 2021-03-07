function createOutrec() {
    let outrec = [];
    for (let i = 0; i < tableEntries.length; i++) {

        const entry = tableEntries[i];
        if (entry.type == "AN") {
            outrec.push(['\n' + entry.start, entry.length, "C';'"])
        }

        if (entry.type == "ZD") {
            if (entry.sign) {
                const edit = createEdit(entry.sign, entry.integer, entry.decimal);
                outrec.push(['\n' + entry.start, entry.length, `${entry.type},EDIT=(${edit}),SIGNS=(+,-,,)`]);
            } else {
                if (entry.decimal) {
                    console.log(entry)
                    outrec.push(['\n' + entry.start, entry.integer,
                        "C','", entry.start + entry.integer, entry.decimal
                        , "C';'"]);

                } else {
                    outrec.push(['\n' + entry.start, entry.length, "C';'"]);
                }
            }
        }

        if (entry.type == "SFF") {
            if (entry.usage == "SIGN TRAILING SEPARATE CHARACTER") {
                if (entry.decimal) {
                    outrec.push(['\n' + entry.end, "1", entry.start, entry.integer, "C','", entry.start + entry.integer, entry.decimal, "C';'"])

                } else {
                    outrec.push(['\n' + entry.end, "1", entry.start, entry.integer, "C';'"])

                }
            } else {
                if (entry.decimal) {
                    outrec.push(['\n' + entry.start, entry.integer, "C','", entry.start + entry.integer, entry.decimal, "C';'"])

                } else {
                    outrec.push(['\n' + entry.start, entry.integer, "C';'"])

                }
            }
        }

        if (entry.type == "PD" || entry.type == "BI") {
            const edit = createEdit(entry.sign, entry.integer, entry.decimal);
            if (entry.sign) {
                outrec.push(['\n' + entry.start, entry.length, `${entry.type},EDIT=(${edit}),SIGNS=(+,-,,)`]);
            } else {
                outrec.push(['\n' + entry.start, entry.length, `${entry.type},EDIT=(${edit})`]);
            }

        }
    }

    textOutput.value = outrec.flat().join(",").substring(1);
    return outrec.flat().join(",").substring(1);
}

function createEdit(sign, integer, decimal) {
    let edit = '';

    if (sign) {
        edit = 'S';
    }

    for (let i = 0; i < integer; i++) {
        edit += 'T';
    }

    if (decimal) {
        edit += ',';
        for (let i = 0; i < decimal; i++) {
            edit += 'T';
        }
    }

    return edit;
}