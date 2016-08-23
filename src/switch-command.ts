import * as vscode from 'vscode';

import {CompanionFiles} from './companion-files';
import {createQuickPickItemList, QuickPickItem} from './quick-pick-item';

export let switchCommand = function () {

    let companionFile = new CompanionFiles();

    companionFile.list().then((cs: Array<vscode.Uri>) => {

        // Create item list from companions files
        let qpItemList = createQuickPickItemList(cs);

        if (qpItemList.length === 0) {

            vscode.window.showInformationMessage('No companions file found.');
        } else {

            // Pick one
            vscode.window.showQuickPick(qpItemList).then((pickedItem: QuickPickItem) => {
                // Open doc
                vscode.workspace.openTextDocument(pickedItem.uri).then((document: vscode.TextDocument) => {
                    const active_view_column = vscode.window.activeTextEditor.viewColumn;

                    // Show a text document to the active view column
                    vscode.window.showTextDocument(document, active_view_column).then(
                        document => {
                        },
                        reason => {
                            vscode.window.showErrorMessage('Failed to show companion file.');
                        });
                }, r => {
                    vscode.window.showErrorMessage('Failed to open companion file.');
                });
            }, reason => {
                vscode.window.showErrorMessage('Failed to pick companion file.');
            });

        }

    }, (r) => {
        vscode.window.showErrorMessage('Failed to list companions document !');
    });
    
}