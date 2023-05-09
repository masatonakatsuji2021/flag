const fs = require("fs");
const filePath = require("path");

var outputPath = filePath.dirname(process.argv[0]);

try{
    var exists = fs.statSync(outputPath + "/flag.cmd").isFile();
}catch(error){
    var exists = false;
}

if(exists){
    fs.unlinkSync(outputPath + "/flag.cmd");
}