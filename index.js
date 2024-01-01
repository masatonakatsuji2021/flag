"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cli_1 = require("@flagfw/flag/bin/Cli");
let args = Cli_1.default.getArgs();
var mainCommand = args[0];
if (mainCommand == "front") {
    let front;
    try {
        front = require("@flagfw/front");
    }
    catch (err) {
        Cli_1.default.red("[ERROR] ").outn("Npm Module \"@flagfw/front\" is not installed or there is a problem with the module");
        process.exit();
    }
    front.default();
}
else if (mainCommand == "server") {
    let server;
    try {
        server = require("@flagfw/server");
    }
    catch (err) {
        Cli_1.default.red("[ERROR] ").outn("Npm Module \"@flagfw/server\" is not installed or there is a problem with the module");
        process.exit();
    }
    server.default();
}
else {
    if (mainCommand) {
        Cli_1.default.red("[ERROR]").outn("\"" + mainCommand + "\" is not exists command.");
    }
    else {
        Cli_1.default.red("[ERROR]").outn("command not found.");
    }
}
