import { Injectable } from '@angular/core';
import { XmlFile } from './model';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  files: Array<XmlFile>;
  selectedFile: XmlFile;

  constructor() {
    this.files = new Array<XmlFile>();
  }

  getFiles(): Observable<XmlFile[]> {
    return of(this.files);
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
          this.selectFile(f);
          this.files.push(f);
          resolve();
        };
      }
    });
  }

  selectFile(file: XmlFile): void {
    if (this.selectedFile) {
      this.selectedFile.selected = false;
    }
    file.selected = true;
    this.selectedFile = file;
  }

  selectNode(node: Node): void {
    this.selectedFile.selectedNode = node;
  }

}
