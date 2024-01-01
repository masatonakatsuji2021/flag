import FlagCLI from "@flagfw/flag/bin/Cli";
let args = FlagCLI.getArgs();

var mainCommand = args[0];

if(mainCommand == "front"){
    let front;
    try{
        front = require("@flagfw/front");
    }catch(err){
        FlagCLI.red("[ERROR] ").outn("Npm Module \"@flagfw/front\" is not installed or there is a problem with the module");
        process.exit();
    }

    front.default();
}
else if(mainCommand == "server"){
    let server;
    try{
        server = require("@flagfw/server");
    }catch(err){
        FlagCLI.red("[ERROR] ").outn("Npm Module \"@flagfw/server\" is not installed or there is a problem with the module");
        process.exit();
    }

    server.default();
}
else{
    if(mainCommand){
        FlagCLI.red("[ERROR]").outn("\"" + mainCommand + "\" is not exists command.");
    }        
    else{
        FlagCLI.red("[ERROR]").outn("command not found.");
    }
}
