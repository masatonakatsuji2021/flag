"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cli_1 = require("@flagfw/flag/bin/Cli");
let args = Cli_1.default.getArgs();
var mainCommand = args[0];
if (mainCommand == "front") {
    try {
        const front = require("@flagfw/front");
        front.default();
    }
    catch (err) {
        Cli_1.default.red("[ERROR] ").outn("Npm Module \"@flagfw/front\" is not installed or there is a problem with the module");
    }
}
else if (mainCommand == "server") {
    try {
        const server = require("@flagfw/server");
        server.default();
    }
    catch (err) {
        Cli_1.default.red("[ERROR] ").outn("Npm Module \"@flagfw/server\" is not installed or there is a problem with the module");
    }
}
else {
    if (mainCommand) {
        Cli_1.default.red("[ERROR]").outn("\"" + mainCommand + "\" is not exists command.");
    }
    else {
        Cli_1.default.red("[ERROR]").outn("command not found.");
    }
}
