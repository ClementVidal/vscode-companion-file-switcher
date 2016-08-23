
import * as vscode from 'vscode';

import * as path from 'path';

export interface Companion {
    extension: string;
    doc: vscode.TextDocument;
}

interface Uri {
    uri: vscode.Uri,
    name: string,
    dir: string,
    exts: string
}

export class QuickPickItem implements vscode.QuickPickItem {

    private friendlyName: string;

    constructor(public uri: Uri) {
        this.friendlyName = this.matchFriendlyName(this.uri.exts);
    }

    get label() {
        if (!this.friendlyName) {
            return path.basename(this.uri.uri.fsPath);
        }
        return this.friendlyName;
    }

    get description() {
        if (this.friendlyName) {
            return path.basename(this.uri.uri.fsPath);
        }

        return null;
    }

    matchFriendlyName(ext: string) {
        let map = {
            'component.ts': 'Code',
            'component.html': 'View',
            'component.scss': 'Style',
        }

        return map[ext];
    }
}

export class CompanionFiles {

    constructor() {

    }


    createQuickPickItemList(uris: Array<vscode.Uri>): Array<QuickPickItem> {
        return uris.map((uri: vscode.Uri) => {
            return new QuickPickItem(this.parseUri(uri));
        });
    }

    list(): Thenable<Array<vscode.Uri>> {

        let t = new Promise<Array<vscode.Uri>>((resolve, reject) => {
            let doc: vscode.TextDocument = undefined;
            if (vscode.window.activeTextEditor) {
                doc = vscode.window.activeTextEditor.document;
            }
            if (!doc) {
                return reject('No active document found');
            }

            let pUri = this.parseUri(doc.uri);
            let searchPatern = pUri.dir + '/*';
            vscode.workspace.findFiles(searchPatern, '**/node_modules/**').then((r: Array<vscode.Uri>) => {
                let c = this.matchCompanion(pUri, r);

                resolve(c);
            });

        });

        return t;
    }

    matchCompanion(uri: Uri, companionUris: Array<vscode.Uri>): Array<vscode.Uri> {

        let filteredCompanionUris = companionUris.filter((companionUri: vscode.Uri) => {
            let p = this.parseUri(companionUri);
            if (p.name === uri.name && p.uri.fsPath !== uri.uri.fsPath) {
                return true;
            }

            return false;
        });

        return filteredCompanionUris;
    }

    parseUri(uri: vscode.Uri): Uri {
        let split = path.basename(uri.fsPath).split('.');
        let name = split[0];
        let exts = split.slice(1).join('.');
        let dir = path.dirname(uri.fsPath);
        let root = vscode.workspace.rootPath;
        if (!root.endsWith('/')) {
            root = root + '/';
        }

        // Remove root directory
        dir = dir.replace(root, '');
        return {
            name, exts, dir, uri
        }
    }
}
