import * as fs from "fs";
import * as filePath from "path";
import * as os from "os";

if(os.platform() == "win32"){
    const outputPath = filePath.dirname(process.argv[0]);
    const str = fs.readFileSync("./includes/start.cmd").toString()
    fs.writeFileSync(outputPath + "/flag.cmd", str);
    console.log("command add \"flag\"");
}
else if(os.platform() == "linux"){
    const prefixPath = filePath.dirname(process.execPath);
    const outputPath = prefixPath + "/flag";
    const str = fs.readFileSync("./includes/linux").toString()
    fs.writeFileSync(outputPath, str);
    fs.chmodSync(outputPath, "0777");
    console.log("command add \"flag\"");
}