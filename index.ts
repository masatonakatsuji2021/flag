import FlagCLI from "@flagfw/flag/bin/Cli";
import front from "@flagfw/front";
import server from "@flagfw/server";

let args = FlagCLI.getArgs();

var mainCommand = args[0];

if(mainCommand == "front"){
    front();
}
else if(mainCommand == "server"){
    server();
}
else{
    if(mainCommand){
        FlagCLI.red("[ERROR]").outn("\"" + mainCommand + "\" is not exists command.");
    }        
    else{
        FlagCLI.red("[ERROR]").outn("command not found.");
    }
}
