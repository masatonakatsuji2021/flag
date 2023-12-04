"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("@flagfw/cli");
const front_1 = require("@flagfw/front");
const server_1 = require("@flagfw/server");
var args = process.argv;
var mainCommand = args[0];
if (mainCommand == "front") {
    args.shift();
    process.argv = args;
    (0, front_1.default)();
}
else if (mainCommand == "server") {
    args.shift();
    process.argv = args;
    (0, server_1.default)();
}
else {
    if (mainCommand) {
        cli_1.FlagCLI.red("[ERROR]").outn("\"" + mainCommand + "\" is not exists command.");
    }
    else {
        cli_1.FlagCLI.red("[ERROR]").outn("command not found.");
    }
}
