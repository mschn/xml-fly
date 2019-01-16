import { Component } from '@angular/core';
import { XmlFile } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  xmlFileContent: string;

  files: Array<XmlFile>;
  selectedFile: XmlFile;

  loading = false;

  constructor() {
    this.files = new Array<XmlFile>();
  }

  openFile(event: Event) {
    this.loading = true;
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
        this.loading = false;
      };
    }
  }

  selectFile(file: XmlFile) {
    if (this.selectedFile) {
      this.selectedFile.selected = false;
    }
    file.selected = true;
    this.selectedFile = file;
  }

}
