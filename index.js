"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("@flagfw/cli");
const cli_2 = require("@flagfw/front/cli");
const cli_3 = require("@flagfw/server/cli");
var args = process.argv;
var mainCommand = args[0];
if (mainCommand == "front") {
    args.shift();
    process.argv = args;
    (0, cli_2.default)();
}
else if (mainCommand == "server") {
    args.shift();
    process.argv = args;
    (0, cli_3.default)();
}
else {
    if (mainCommand) {
        cli_1.FlagCLI.red("[ERROR]").outn("\"" + mainCommand + "\" is not exists command.");
    }
    else {
        cli_1.FlagCLI.red("[ERROR]").outn("command not found.");
    }
}
