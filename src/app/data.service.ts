import { Injectable } from '@angular/core';
import { XmlFile, Selection } from './model';
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

  openFile(event: Event): Promise<{}> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length) {
        const file = target.files[0];
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
      }
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

  selectNode(node: Node): void {
    this.selection.type = 'Node';
    this.selection.path = this.getNodePath(node);
    this.selection.value = node.textContent;
  }

  private getNodePath(node: Node): string[] {
    const paths = [];
    let curNode = node;
    while (curNode.parentNode) {
      paths.push((curNode as Element).tagName);
      curNode = curNode.parentNode;
    }
    return paths.reverse();
  }

  selectAttr(attr: Attr, node: Node): void {
    this.selection.type = 'Attr';
    this.selection.path = this.getNodePath(node);
    this.selection.path.push(attr.name);
    this.selection.value = attr.value;

  }

}
