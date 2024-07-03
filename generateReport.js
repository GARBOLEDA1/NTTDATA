const { generateSummaryReport } = require('k6-html-reporter');

const options = {
    jsonFile: 'output.json',  // Ruta al archivo JSON
    output: 'output.html'     // Ruta al archivo HTML de salida
};

generateSummaryReport(options);
