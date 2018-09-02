import * as vscode from 'vscode';
import * as path from 'path';

import { getUriName, getUriDirectory } from './tools';


export class CompanionFiles {

    constructor() {

    }

    list(): Thenable<Array<vscode.Uri>> {

        let t = new Promise<Array<vscode.Uri>>(
            (resolve, reject) => {
                let doc: vscode.TextDocument = undefined;
                if (vscode.window.activeTextEditor) {
                    doc = vscode.window.activeTextEditor.document;
                }
                if (!doc) {
                    return reject('No active document found');
                }

                let uriDir = getUriDirectory(doc.uri);
                let searchPatern = '*';
                if (uriDir.length)
                    searchPatern = path.normalize( uriDir + '/*' );
                vscode.workspace.findFiles(searchPatern, '**/node_modules/**').then(
                    (r: Array<vscode.Uri>) => {
                        return resolve(this.matchCompanion(doc.uri, r));
                    },
                    reason => {
                        return reject('Failed to find companions files');
                    });
            });

        return t;
    }

    matchCompanion(sourceUri: vscode.Uri, companionUris: Array<vscode.Uri>): Array<vscode.Uri> {
        let sourceName = getUriName(sourceUri);
        let filteredCompanionUris = companionUris.filter((companionUri: vscode.Uri) => {
            let companionName = getUriName(companionUri);
            if (companionName === sourceName && companionUri.fsPath !== sourceUri.fsPath) {
                return true;
            }

            return false;
        });

        return filteredCompanionUris;
    }

}
