const cli = require("@flag/cli");

var args = process.argv;

var mainCommand = args[0];

if(mainCommand == "front"){
    args.shift();
    process.argv = args;
    require("@flag/front/cli.js");
}
else{
    cli.red("[ERROR]").outn("\"" + mainCommand + "\" is not exists command.");
}
