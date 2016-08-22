
import * as vscode from 'vscode';

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

        console.log( doc.fileName );

        console.log( doc.fileName.split('.') );

/*        doc.fileName.split()
        vscode.workspace.findFiles( )*/
        return null
    }

}