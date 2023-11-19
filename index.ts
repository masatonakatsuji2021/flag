import { FlagCLI } from "@flagfw/cli";
import front from "@flagfw/front/cli";
import server from "@flagfw/server/cli";

var args = process.argv;

var mainCommand = args[0];

if(mainCommand == "front"){
    args.shift();
    process.argv = args;
    front();
}
else if(mainCommand == "server"){
    args.shift();
    process.argv = args;
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
