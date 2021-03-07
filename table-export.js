
function createMDTable(rows) {
    let header = `| Nivel | Profundidad | Nombre | Tipo | Picture | Modificador | Inicio | Longitud | Fin |\r\n`;
    let separator = `|-|-|--------|------|---------|-------------|--------|----------|-----|\r\n`;

    let lines = [];
    rows.forEach(row => {
        lines.push(`${exists(row.level)}| ${exists(row.depth)}| ${exists(row.name)}|${exists(row.type)}|${exists(row.pic)}|${exists(row.usage)}|${exists(row.start)}|${exists(row.length)}|${exists(row.end)}| \r\n`);
    });

    const table = header + separator + lines.join('');
    return table;
}

function createCSVTable(rows) {
    let header = `Nivel;Profundidad;Nombre;Tipo;Picture;Modificador;Inicio;Longitud;Fin;\r\n`;
    let lines = [];
    rows.forEach(row => {
        lines.push(`${exists(row.level)}; ${exists(row.depth)}; ${exists(row.name)};${exists(row.type)};${exists(row.pic)};${exists(row.usage)};${exists(row.start)};${exists(row.length)};${exists(row.end)}; \r\n`);
    });

    const table = header + lines.join('');
    return table;
}

function createHTMLTable(table) {

    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Copy</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.min.js"
        integrity="sha384-nsg8ua9HAw1y0W1btsyWgBklPnCUAFLuTMS2G72MMONqmOymq585AcH49TLBQObG"
        crossorigin="anonymous"></script>
        <style>
        .button:hover{
            cursor: pointer;
            overflow: visible;
            color: darkgreen;
          }
        </style>
    </head>
    <body>
        <div class="container-fluid col-md-10">  
        ${table}
        </div>
    </body>
    </html>`;

    return html;
}

function exists(property) {
    property == undefined ? property = '' : property;
    return property;
}