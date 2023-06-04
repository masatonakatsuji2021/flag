const cli = require("@flagfw/cli");

cli.outn("* FLAG");

var args = process.argv;

var mainCommand = args[0];

if(mainCommand == "front"){
    args.shift();
    process.argv = args;
    require("@flagfw/front/cli.js");
}
else if(mainCommand == "server"){
    args.shift();
    process.argv = args;
    require("@flagfw/server/cli.js");
}
else{
    cli.red("[ERROR]").outn("\"" + mainCommand + "\" is not exists command.");
}
