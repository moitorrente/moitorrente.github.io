const okSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
<path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
</svg>`;

const warningSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation" viewBox="0 0 16 16">
<path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"/>
</svg>`;

const errorSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>`

const switchThemeChk = document.getElementById("theme-check");

function switchTheme() {
    document.documentElement.classList.toggle('clear-mode');
    document.documentElement.classList.toggle('dark-mode');
};



const fileSelector = document.getElementById('file');
const runButton = document.getElementById('run');
const csvButton = document.getElementById('csv');
const textInput = document.getElementById('input-text');
const textInputExpanded = document.getElementById('input-text-xp');
const textOutput = document.getElementById('output-text');
const textOutputExpanded = document.getElementById('output-text-xp');

const normalize = document.getElementById("normalize");
const removePrefix = document.getElementById("remove-prefix");
const removeSufix = document.getElementById("remove-sufix");

const clearButton = document.querySelectorAll(".clear");
const clearOutputButton = document.getElementById("clear-output");

const textInputSize = document.getElementById("input-font-size");
const textInputReset = document.getElementById("input-font-reset");

const textOutputSize = document.getElementById("output-font-size");
const textOutputReset = document.getElementById("output-font-reset");

const inputExpand = document.getElementById("input-expand");
const outputExpand = document.getElementById("output-expand");

const outputType = document.getElementById("output-type-selector");
const urlUpdateInput = document.getElementById("url-update-input");

textInputSize.addEventListener("input", () => {
    textInput.style.fontSize = `${textInputSize.value}px`;
});
textOutputSize.addEventListener("input", () => {
    textOutput.style.fontSize = `${textOutputSize.value}px`;
});

textInputReset.addEventListener("click", () => {
    textInput.style.fontSize = `16px`;
    textInputSize.value = "16";
})

textOutputReset.addEventListener("click", () => {
    textOutput.style.fontSize = `16px`;
    textOutputSize.value = "16";
})

inputExpand.addEventListener('click', () => {
    textInputExpanded.value = textInput.value;
});
outputExpand.addEventListener('click', () => {
    textOutputExpanded.value = textOutput.value;
});


urlUpdateInput.addEventListener("change", () => {
    toggleAutoUpdate(urlUpdateInput.checked);
})


runButton.addEventListener('click', process);

csvButton.addEventListener('click', createOuput);

textOutput.addEventListener("input", () => {
    copyButton.innerHTML =
        `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
      class="bi bi-clipboard" viewBox="0 0 16 16">
      <path
        d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
      <path
        d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
    </svg>`;
})


function createOuput() {

    switch (outputType.value) {
        case 'outrec':
            createOutrec();
            break;
        case 'table-md':
            textOutput.value = createMDTable(fullTable);
            break;
        case 'table-csv':
            textOutput.value = createCSVTable(fullTable);
            break;
        case 'table-html':
            textOutput.value = createHTMLTable(document.getElementById("table").innerHTML);
            break;
        case 'json':
            textOutput.value = JSON.stringify(copyFields[0], null, 2);
            break;
    }

}

clearButton.forEach(x => {
    x.addEventListener('click', clearAll)
});

clearOutputButton.addEventListener('click', clearOutput);

textInputExpanded.addEventListener('change', () => {
    textInput.value = textInputExpanded.value;
});
textOutputExpanded.addEventListener('change', () => {
    textOutput.value = textOutputExpanded.value;
});

function clearAll() {
    clearInput();
    clearIntermediate();
    clearOutput();
}


function clearInput() {
    textInput.value = "";
    textInputExpanded.value = "";
    updateURL(false);
}

function clearOutput() {
    textOutput.value = "";
}

let tableEntries = [];
let fullTable = [];

function clearIntermediate() {
    copyFields = [];
    tableEntries = [];
    fullTable = [];
    occursNames = [];
    document.getElementById("table-body").innerHTML = null;
    start = 1;
    finish = 0;
    id = 0;
}



function recursiveRead(structure, outrec) {
    if (structure.isPic) {
        outrec.push(structure.start);
    }

    if (structure.childs.length > 0) {
        for (let t = 0; t < structure.childs.length; t++) {
            recursiveRead(structure.childs[t], outrec);
        }
    }

}



function process() {
    clearIntermediate();
    const text = textInput.value;

    if (text) {
        parse(text);
        createOuput();
    }

}

fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    getAsText(fileList[0]);
});


function getAsText(fileToRead) {
    const reader = new FileReader();
    reader.readAsText(fileToRead);
    reader.onload = loadHandler;
    reader.onerror = errorHandler;
}

let copyFields = [];
let occursNames = [];
let id = 0;

function loadHandler(event) {
    //parse(event.target.result);
    textInput.value = event.target.result;
}

function errorHandler(evt) {
    if (evt.target.error.name == 'NotReadableError') {
        alert('No se puede leer el fichero');
    } else {
        alert(evt);
    }
}

function parse(text) {


    const raw = text.replaceAll(/\r\n|\n/g, "").split(/\./);
    const lines = raw.map(x => x.split(' '));
    const filtered = lines.map(line => {
        return line.filter(field => field)
    });

    //copyFields.push(new Field("00 PLACEHOLDER.", -1));

    filtered.forEach((line, index) => {
        if (line != '' && line[0] != '*') {
            let field = new Field(line, index);

            if (removePrefix.checked && field.name) {
                field.removePrefix("TT-");
            }

            if (removeSufix.checked && field.name) {
                field.removeSufix();
            }



            if (field.isOccurs && !field.isPic) {
                occursNames.push({ level: field.level, name: field.name, occurs: field.occurs });
            }


            if (field.isOccurs && field.isPic) {
                for (let i = 0; i < field.occurs; i++) {
                    let newField = new Field();

                    newField.decimal = field.decimal;
                    newField.end = field.end;
                    newField.id = field.id;
                    newField.integer = field.integer;
                    newField.isOccurs = field.isOccurs;
                    newField.isPic = field.isPic;
                    newField.length = field.length;
                    newField.level = field.level;
                    newField.picText = field.picText;
                    newField.sign = field.sign;
                    newField.start = field.start;
                    newField.type = field.type;
                    newField.usage = field.usage;

                    newField.name = `${field.name}(${i})`
                    copyFields.push(newField);
                }
            } else {
                copyFields.push(field);
            }
        }
    });


    createHierarchy(copyFields);

    occursNames.sort(compare);

    for (let i = 0; i < occursNames.length; i++) {
        let tooccurs = findNode(occursNames[i].name, copyFields[0]);
        expandOccurs(tooccurs, occursNames[i].occurs);
    }


    createRow(copyFields[0], 1);
    recursiveScan(copyFields[0], 1);


    return filtered;
}


function createHierarchy(copyFields) {
    let levels = copyFields.map(x => x.level).sort((a, b) => b - a);

    for (let i = 0; i < copyFields.length; i++) {
        let index = copyFields.findIndex(x => x.level == levels[i]);
        if (index > 0) {
            let child = copyFields[index];
            if (copyFields[index - 1]) {
                child.parent = (copyFields[index - 1].name)
                copyFields[index - 1].addChild(copyFields.splice(index, 1));
            }

        }
    }

    levels = copyFields.map(x => x.level);

    if (levels.length > 1) {
        createHierarchy(copyFields);
    } else {
        return copyFields;
    }
}



function createRow(field, depth) {

    const table = document.getElementById("table-body")


    let row = document.createElement("tr");
    let level = document.createElement("th");
    let depthCol = document.createElement("td");
    let name = document.createElement("td");
    let type = document.createElement("td");
    let usage = document.createElement("td");
    let picture = document.createElement("td");
    let startCol = document.createElement("td");
    let length = document.createElement("td");
    let finishCol = document.createElement("td");
    let validation = document.createElement("td");


    level.innerHTML = field.level;
    depthCol.innerHTML = depth;
    name.innerHTML = field.name;
    if (field.type) type.innerHTML = field.type;
    field.usage ? usage.innerHTML = field.usage : usage.innerHTML = "";
    if (field.picText) picture.innerHTML = field.picText;

    if (field.isPic) {
        const entryStart = start;
        startCol.innerHTML = start;
        field.setStart(start);
        length.innerHTML = field.length;
        finish = start + field.length - 1;
        finishCol.innerHTML = finish;
        start = finish + 1;
        const entryEnd = finish;
        field.setEnd(finish);

        let entry = new Entry(depth, field.level, field.name, field.picText, entryStart, entryEnd, field.length, field.type, field.usage, field.integer, field.decimal, field.sign);

        tableEntries.push(entry);
        fullTable.push(entry)
    } else {
        fullTable.push(new Entry(depth, field.level, field.name))
    }

    let validationBadge = createBadge("", field.validation.color, field.validation.level)

    validation.setAttribute("data-container", "body");

    if (field.validation.level > 0) {
        validation.setAttribute("data-bs-toggle", "collapse");
        validation.setAttribute("data-bs-target", `#toggleHelp${field.id}`);
        validationBadge.classList.add("button");
    }
    validation.appendChild(validationBadge);



    row.appendChild(level);
    row.appendChild(depthCol);
    row.appendChild(name);
    row.appendChild(type);

    row.appendChild(picture);
    row.appendChild(usage);
    row.appendChild(startCol);
    row.appendChild(length);
    row.appendChild(finishCol);
    row.appendChild(validation);





    table.appendChild(row);

    if (field.validation.level > 0) {



        for (let i = 0; i < field.validation.message.length; i++) {
            let firstDiv = document.createElement("tr");
            firstDiv.classList.add("collapse");
            firstDiv.classList.add("alert");

            if (field.validation.message[i].color == "bg-warning") {
                firstDiv.classList.add("alert-warning");
            } else {
                firstDiv.classList.add("alert-danger");
            }

            firstDiv.id = `toggleHelp${field.id}`;
            let secondDiv = document.createElement("td");
            secondDiv.innerHTML = `<strong>${field.validation.message[i].tooltip}</strong>`;

            secondDiv.setAttribute("colspan", "10")

            firstDiv.appendChild(secondDiv);
            table.appendChild(firstDiv);
        }
    }
}

function createBadge(text, color, level) {
    let badge = document.createElement("span");
    badge.classList.add("badge");
    badge.classList.add(color);


    if (level != undefined) {
        switch (level) {
            case 0:
                text = okSVG;
                break;
            case 4:
                text = warningSVG;
                break;
            case 8:
                text = errorSVG;
        }
    }

    badge.innerHTML = text;
    return badge;
}

let start = 1;
let finish = 0;

function findNode(search, currentNode) {
    var i,
        currentChild,
        result;

    if (search == currentNode.name) {
        return currentNode;
    } else {
        for (i = 0; i < currentNode.childs.length; i++) {
            currentChild = currentNode.childs[i];
            result = findNode(search, currentChild);
            if (result !== false) {
                return result;
            }
        }
        return false;
    }
}


function recursiveScan(structure, depth) {
    if (structure.name != null) {
        if (structure.childs.length > 0) {
            depth++;
            for (let t = 0; t < structure.childs.length; t++) {
                createRow(structure.childs[t], depth)
                recursiveScan(structure.childs[t], depth);
            }
        }
    }
    return true;
}

function compare(a, b) {
    if (a.level < b.level) {
        return -1;
    }
    if (a.level > b.level) {
        return 1;
    }
    return 0;
}


function expandOccurs(structure, occurs) {
    const repeated = new Array(occurs).fill(structure.childs).flat();
    structure.childs = repeated;
    return structure;
}


function parsePIC(inputPicture) {
    let picture = Array.from(inputPicture);
    const first = picture[0];
    const numbers = returnNumericValues(inputPicture);

    let PIC = {};

    switch (first) {
        case 'X':
            PIC.type = 'AN';
            PIC.sign = false;
            [PIC.length] = numbers;
            break;
        case '9':
            PIC.type = 'ZD';
            PIC.sign = false;
            [PIC.integer, PIC.decimal] = numbers;
            break;
        case 'S':
            PIC.type = 'ZD';
            PIC.sign = true;
            [PIC.integer, PIC.decimal] = numbers;
            break;
        case 'Z':
            PIC.type = 'ZD';
            PIC.mask = true;
            [PIC.integer, PIC.decimal] = numbers;
            break;
        default:
            PIC.type = inputPicture;
    }

    return PIC;
}

function returnNumericValues(picture) {
    const pictures = picture.split('V');
    let first, second;
    [first, second = ''] = pictures;

    firstArray = Array.from(first);
    secondArray = Array.from(second);

    let integer = 0;
    let decimal = 0;

    if (firstArray.filter(x => x == '(' || x == ')') != '') {
        integer = countWithPar(firstArray);
    } else {
        integer = countExact(firstArray);
    }

    if (secondArray.length) {
        if (secondArray.filter(x => x == '(' || x == ')') != '') {
            decimal = countWithPar(secondArray);
        } else {
            decimal = countExact(secondArray);
        }
    }

    return [integer, decimal]
}


function countWithPar(picture) {
    let startIndex = 0;
    let endIndex = 0;
    let tempValue = [];

    for (let i = 0; i < picture.length; i++) {
        if (picture[i] == '(') {
            startIndex = i;
        }
        if (picture[i] == ')') {
            endIndex = i;
        }
    }

    for (let i = startIndex + 1; i < endIndex; i++) {
        tempValue.push(picture[i]);
    }

    return (parseInt(tempValue.join('')));
}

function countExact(picture) {
    let counter = 1;

    for (let i = 0; i < picture.length; i++) {
        if (picture[i] == picture[i + 1]) {
            if (picture[i] == 'X' || picture[i] == '9' || picture[i] == 'Z') {
                counter++
            }
        }
    }

    return counter;
}

const downloadFileName = document.getElementById("download-name")
const downloadButton = document.getElementById("download");
downloadButton.addEventListener("click", () => {
    let extension;

    switch (outputType.value) {
        case 'outrec':
            extension = "txt"
            break;
        case 'table-md':
            extension = "md"
            break;
        case 'table-csv':
            extension = "csv"
            break;
        case 'table-html':
            extension = "html"
            break;
        case 'json':
            extension = "json"
            break;
    }

    saveTextAsFile(textOutput.value, `${downloadFileName.value}.${extension}`);
})

function saveTextAsFile(textToWrite, fileNameToSaveAs) {
    let textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
    let downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}

const copyButton = document.getElementById("copy-button");
copyButton.addEventListener("click", copyOutput);

function copyOutput() {

    navigator.clipboard.writeText(textOutput.value);
    copyButton.innerHTML =
        `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
    </svg>`;

}

//-----------------------------------------------------



var textareas = document.getElementsByTagName('textarea');
var count = textareas.length;
for (var i = 0; i < count; i++) {
    textareas[i].onkeydown = function (e) {
        if (e.key == 'Tab') {
            e.preventDefault();
            let s = this.selectionStart;
            this.value = this.value.substring(0, this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
            this.selectionEnd = s + 1;
        }
    }
}