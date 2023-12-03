"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const filePath = require("path");
const outputPath = filePath.dirname(process.argv[0]);
let exists;
try {
    exists = fs.statSync(outputPath + "/flag.cmd").isFile();
}
catch (error) {
    exists = false;
}
if (exists) {
    fs.unlinkSync(outputPath + "/flag.cmd");
}
