import FlagCLI from "@flagfw/flag/bin/Cli";
let args = FlagCLI.getArgs();

var mainCommand = args[0];

if(mainCommand == "front"){
    try{
        const front = require("@flagfw/front");
        front.default();
    }catch(err){
        FlagCLI.red("[ERROR] ").outn("Npm Module \"@flagfw/front\" is not installed or there is a problem with the module");
    }
}
else if(mainCommand == "server"){
    try{
        const server = require("@flagfw/server");
        server.default();
    }catch(err){
        FlagCLI.red("[ERROR] ").outn("Npm Module \"@flagfw/server\" is not installed or there is a problem with the module");
    }
}
else{
    if(mainCommand){
        FlagCLI.red("[ERROR]").outn("\"" + mainCommand + "\" is not exists command.");
    }        
    else{
        FlagCLI.red("[ERROR]").outn("command not found.");
    }
}
