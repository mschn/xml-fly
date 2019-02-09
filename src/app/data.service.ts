import { Injectable } from '@angular/core';
import { XmlFile, Selection, Elt } from './model';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  files: Array<XmlFile>;
  selectedFile: XmlFile;

  selection: Selection;

  constructor() {
    this.files = new Array<XmlFile>();
    this.selection = new Selection();
  }

  getFiles(): Observable<XmlFile[]> {
    return of(this.files);
  }

  getSelection(): Observable<Selection> {
    return of(this.selection);
  }

  openFile(file: File): Promise<{}> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const f = new XmlFile();
        f.name = file.name;
        f.selected = true;
        f.xmlFileContent = reader.result.toString();

        const existingFile = this.findFile(f);
        if (existingFile) {
          this.selectFile(existingFile);
        } else {
          this.selectFile(f);
          this.files.push(f);
        }
        resolve();
      };
    });
  }

  private findFile(file: XmlFile): XmlFile {
    for (const f of this.files) {
      if (file.xmlFileContent === f.xmlFileContent) {
        return f;
      }
    }
    return null;
  }

  selectFile(file: XmlFile): void {
    if (this.selectedFile) {
      this.selectedFile.selected = false;
    }
    file.selected = true;
    this.selection.type = null;
    this.selectedFile = file;
  }

  selectNode(node: Elt): void {
    this.selection.type = 'Node';
    this.selection.path = this.getNodePath(node);
    this.selection.value = node.text;
  }

  private getNodePath(node: Elt): string[] {
    const paths = [];
    let curNode = node;
    while (curNode.parent) {
      paths.push(curNode.name);
      curNode = curNode.parent;
    }
    return paths.reverse();
  }

  selectAttr(attr: Attr, node: Elt): void {
    this.selection.type = 'Attr';
    this.selection.path = this.getNodePath(node);
    this.selection.path.push(attr.name);
    this.selection.value = attr.value;

  }

}
