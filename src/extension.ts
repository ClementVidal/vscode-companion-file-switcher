import * as vscode from 'vscode';

import {CompanionFiles, QuickPickItem} from './companion-files';

export function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand('extension.fileSwitcher.switch', () => {

        let companionFile = new CompanionFiles();

        companionFile.list().then((cs: Array<vscode.Uri>) => {

            // Create item list from companions files
            let qpItemList = companionFile.createQuickPickItemList(cs);

            // Pick one
            vscode.window.showQuickPick(qpItemList).then((i: QuickPickItem) => {
                // Open doc
                vscode.workspace.openTextDocument(i.uri.uri).then((d) => {
                }, (r) => {
                    vscode.window.showErrorMessage('Failed to open document !');
                });
            }, (r) => {
                vscode.window.showErrorMessage('Failed to pick document !');
            });

        }, (r) => {
            vscode.window.showErrorMessage('Failed to list companions document !');
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}