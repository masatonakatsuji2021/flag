"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cli_1 = require("@flagfw/flag/bin/Cli");
const front_1 = require("@flagfw/front");
const server_1 = require("@flagfw/server");
let args = Cli_1.default.getArgs();
var mainCommand = args[0];
if (mainCommand == "front") {
    (0, front_1.default)();
}
else if (mainCommand == "server") {
    (0, server_1.default)();
}
else {
    if (mainCommand) {
        Cli_1.default.red("[ERROR]").outn("\"" + mainCommand + "\" is not exists command.");
    }
    else {
        Cli_1.default.red("[ERROR]").outn("command not found.");
    }
}
