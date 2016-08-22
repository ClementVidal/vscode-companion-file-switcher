
import * as vscode from 'vscode';

import * as path from 'path';

export interface Companion {
    extension: string;
    doc: vscode.TextDocument; 
}

export class CompanionFiles {

    constructor() {

    }

    list( doc: vscode.TextDocument ): Array<vscode.TextDocument> {

        if( ! doc ) {
            return null;
        }

        let exts = path.basename( doc.fileName ).split('.');
        let dir = path.dirname( doc.fileName );

        dir = dir.replace( vscode.workspace.rootPath+'/', '' );

        let searchPatern =  dir+'/*';
        vscode.workspace.findFiles(searchPatern, '**/node_modules/**' ).then( (r) => console.log( searchPatern, r ));
        return null
    }

}