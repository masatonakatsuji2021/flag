const cli = require("@flagfw/cli");

var args = process.argv;

var mainCommand = args[0];

if(mainCommand == "front"){
    cli.outn("* FLAG FRONT");
    args.shift();
    process.argv = args;
    require("@flagfw/front/cli.js");
}
else if(mainCommand == "server"){
    cli.outn("* FLAG SERVER");
    args.shift();
    process.argv = args;
    require("@flagfw/server/cli.js");
}
else{
    cli.red("[ERROR]").outn("\"" + mainCommand + "\" is not exists command.");
}
