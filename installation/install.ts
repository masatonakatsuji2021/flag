import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { execSync } from "child_process";

const gp_ : string = execSync("npm root -g").toString().split("\n").join("");
const globalPath : string = path.dirname(gp_);

if(__dirname.indexOf(globalPath) === 0){
    console.log("# global install setting");
    console.log("#");

    if(os.platform() == "win32"){
        console.log("# platform = Win32");
        console.log("#");
        const str = fs.readFileSync("installation/includes/start.cmd").toString()
        console.log("# add command(Prompt) \"flag.cmd\"");
        console.log("# command path = " + globalPath + "/flag.cmd");
        fs.writeFileSync(globalPath + "/flag.cmd", str);
        console.log("# ..... OK");
    
        const bashStr = fs.readFileSync("installation/includes/start.bash").toString();
        console.log("# add command(Git Bash) \"flag\"")
        console.log("# command path = " + globalPath + "/flag");
        fs.writeFileSync(globalPath + "/flag", bashStr);
        console.log("# ..... OK");
        console.log("#");
        console.log("# install complete!");
    }
    else if(os.platform() == "linux"){
        console.log("# platform = Linux");
        console.log("#");
        console.log("# add command \"flag\"");
        const outputPath = globalPath + "/flag";
        console.log("# command path = " + globalPath + "/flag");
        const str = fs.readFileSync("installation/includes/linux").toString()
        fs.writeFileSync(outputPath, str);
        console.log("# ..... Write OK");
        fs.chmodSync(outputPath, "0777");
        console.log("# ..... Change Permission OK");
        console.log("#");
        console.log("# install complete!");
    }
}

