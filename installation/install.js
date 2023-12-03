"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const filePath = require("path");
const os = require("os");
if (os.platform() == "win32") {
    const outputPath = filePath.dirname(process.argv[0]);
    const str = fs.readFileSync("./includes/start.cmd").toString();
    fs.writeFileSync(outputPath + "/flag.cmd", str);
}
else if (os.platform() == "linux") {
    const prefixPath = filePath.dirname(process.execPath);
    const outputPath = prefixPath + "/flag3";
    const str = fs.readFileSync("./includes/linux").toString();
    fs.writeFileSync(outputPath, str);
    fs.chmodSync(outputPath, "0777");
    console.log("add command flag");
}
