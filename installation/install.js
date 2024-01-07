"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const os = require("os");
const child_process_1 = require("child_process");
const gp_ = (0, child_process_1.execSync)("npm root -g").toString().split("\n").join("");
const globalPath = path.dirname(gp_);
if (__dirname.indexOf(globalPath) === 0) {
    console.log("# global install setting");
    console.log("#");
    if (os.platform() == "win32") {
        console.log("# platform = Win32");
        console.log("#");
        const str = fs.readFileSync("installation/includes/start.cmd").toString();
        console.log("# add command(Prompt) \"flag.cmd\"");
        console.log("# command path = " + globalPath + "/flag.cmd");
        fs.writeFileSync(globalPath + "/flag.cmd", str);
        console.log("# ..... OK");
        const bashStr = fs.readFileSync("installation/includes/start.bash").toString();
        console.log("# add command(Git Bash) \"flag\"");
        console.log("# command path = " + globalPath + "/flag");
        fs.writeFileSync(globalPath + "/flag", bashStr);
        console.log("# ..... OK");
        console.log("#");
        console.log("# install complete!");
    }
    else if (os.platform() == "linux") {
        console.log("# platform = Linux");
        console.log("#");
        console.log("# add command \"flag\"");
        const outputPath = globalPath + "/flag";
        console.log("# command path = " + globalPath + "/flag");
        const str = fs.readFileSync("installation/includes/linux").toString();
        fs.writeFileSync(outputPath, str);
        console.log("# ..... Write OK");
        fs.chmodSync(outputPath, "0777");
        console.log("# ..... Change Permission OK");
        console.log("#");
        console.log("# install complete!");
    }
}
