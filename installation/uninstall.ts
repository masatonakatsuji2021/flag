import * as fs from "fs";
import * as filePath from "path";

const outputPath = filePath.dirname(process.argv[0]);

let exists;
try{
    exists = fs.statSync(outputPath + "/flag.cmd").isFile();
}catch(error){
    exists = false;
}

if(exists){
    fs.unlinkSync(outputPath + "/flag.cmd");
}