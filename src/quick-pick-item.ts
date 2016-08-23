import * as vscode from 'vscode';
import * as path from 'path';

import {getUriExtensions, getCompanionNameMap} from './tools';

export class QuickPickItem implements vscode.QuickPickItem {

    private friendlyName: string;

    constructor(public uri: vscode.Uri) {
        let exts = getUriExtensions(uri);
        this.friendlyName = this.matchCompanionName(exts);
    }

    get label() {
        if (!this.friendlyName) {
            return path.basename(this.uri.fsPath);
        }
        return this.friendlyName;
    }

    get description() {
        if (this.friendlyName) {
            return path.basename(this.uri.fsPath);
        }

        return null;
    }

    matchCompanionName(ext: string) {
        let map = getCompanionNameMap();
        return map[ext];
    }
}

export let createQuickPickItemList = function (uris: Array<vscode.Uri>): Array<QuickPickItem> {
    return uris.map((uri: vscode.Uri) => {
        return new QuickPickItem(uri);
    });
}
