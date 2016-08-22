import * as vscode from 'vscode';

import {CompanionFiles} from './companion-files';

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "file-switcher" is now active!');

    let disposable = vscode.commands.registerCommand('extension.fileSwitcher.switch', () => {

        let companionFile = new CompanionFiles();
        let activeDoc: vscode.TextDocument = undefined;
        if (vscode.window.activeTextEditor) {
            activeDoc = vscode.window.activeTextEditor.document;
        }
        companionFile.list(activeDoc);
        vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}