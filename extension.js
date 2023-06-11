"use strict";
const vscode = require("vscode");
const languageclient = require("vscode-languageclient");

let client;

function activate(context) {
    try {
        const serverOptions = {
            command: "node",
            args: [
                context.extensionPath + "/bf.js",
                "--language-server"
            ]
        };
        const clientOptions = {
            documentSelector: [
                {
                    scheme: "file",
                    language: "brainfuck",
                }
            ],
        };
        client = new languageclient.LanguageClient("bf-mode", serverOptions, clientOptions);
        context.subscriptions.push(client.start());
    } catch (e) {
        vscode.window.showErrorMessage("bf-mode couldn't be started.");
    }
}

function deactivate() {
    if (client) return client.stop();
}

module.exports = { activate, deactivate }