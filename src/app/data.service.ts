import { Injectable } from '@angular/core';
import { XmlFile } from './model';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  files: Array<XmlFile>;
  selectedFile: XmlFile;

  obsSelectedFile: XmlFile;

  constructor() {
    this.files = new Array<XmlFile>();
    this.obsSelectedFile = new XmlFile();
  }

  getFiles(): Observable<XmlFile[]> {
    return of(this.files);
  }

  getSelectedFile(): Observable<XmlFile> {
    return of(this.obsSelectedFile);
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
    this.selectedFile = file;

    this.obsSelectedFile.selectedNode = this.selectedFile.selectedNode;
  }

  selectNode(node: Node): void {
    this.obsSelectedFile.selectedNode = node;
  }

}
