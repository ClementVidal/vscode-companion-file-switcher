import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "file-switcher" is now active!');

    let disposable = vscode.commands.registerCommand('extension.fileSwitcher.switch', () => {
        vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}