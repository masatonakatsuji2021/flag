const fs = require("fs");
const filePath = require("path");

var root = filePath.dirname(__dirname);

var outputPath = filePath.dirname(process.argv[0]);

var str = fs.readFileSync(root + "/includes/start.cmd").toString();

fs.writeFileSync(outputPath + "/flag.cmd", str);