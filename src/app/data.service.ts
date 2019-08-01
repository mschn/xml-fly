import { Injectable } from '@angular/core';
import { XmlFile, Selection, Elt } from './model';
import { of, Observable } from 'rxjs';
import { AbstractNodeComponent } from './xml-view/abstract-node/abstract-node.component';

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

  selectFile(file: XmlFile): void {
    if (this.selectedFile) {
      this.selectedFile.selected = false;
    }
    file.selected = true;
    this.selection.type = null;
    this.selectedFile = file;
  }

  selectNode(node: Elt, source: AbstractNodeComponent): void {
    if (this.selection && this.selection.node) {
      this.selection.node.selected = false;
    }
    this.selection.type = 'Node';
    this.selection.path = this.getNodePath(node);
    this.selection.value = node.text;
    this.selection.node = source;
    this.selection.node.selected = true;
    this.selection.node.selectedAttr = null;
  }

  selectAttr(attr: Attr, node: Elt, source: AbstractNodeComponent): void {
    if (this.selection && this.selection.node) {
      this.selection.node.selected = false;
    }
    this.selection.type = 'Attr';
    this.selection.path = this.getNodePath(node);
    this.selection.path.push(attr.name);
    this.selection.value = attr.value;
    this.selection.node = source;
    this.selection.node.selected = true;
    this.selection.node.selectedAttr = attr;
  }

  closeFile(file?: XmlFile): void {
    if (!file) {
      file = this.selectedFile;
    }

    const idx = this.files.indexOf(file);
    if (idx > -1) {
      this.files.splice(idx, 1);
    }
    if (this.files.length > 0) {
      this.selectFile(this.files[0]);
    }
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

  private findFile(file: XmlFile): XmlFile {
    for (const f of this.files) {
      if (file.xmlFileContent === f.xmlFileContent) {
        return f;
      }
    }
    return null;
  }
}
