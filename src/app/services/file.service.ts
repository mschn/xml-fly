import { Injectable, NgZone } from '@angular/core';
import { DataService } from './data.service';
import { XmlService } from './xml.service';
import { XmlFile } from '../data/xml-file';
import { SelectionService } from './selection.service';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(
    private readonly dataService: DataService,
    private readonly selectionService: SelectionService,
    private readonly xmlService: XmlService
  ) {}

  openFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.dataService.setIsLoading(true);

      const file = target.files[0];
      setTimeout(() => {
        this.doOpenFile(file)
          .then(() => {})
          .catch((err) => console.log('failed to open file ', err))
          .finally(() => this.dataService.setIsLoading(false));
      });
    }
  }

  openFileDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files) {
      this.dataService.setIsLoading(true);
      const file = event.dataTransfer.files[0];
      setTimeout(() => {
        this.doOpenFile(file)
          .then(() => {})
          .catch((err) => console.log('failed to open file ', err))
          .finally(() => this.dataService.setIsLoading(false));
      });
    }
    return false;
  }

  doOpenFile(file: File): Promise<{}> {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject();
      }
      const reader = new FileReader();
      try {
        reader.readAsText(file);
      } catch (e) {
        reject(e);
      }
      reader.onload = () => {
        const xmlFile = new XmlFile();
        xmlFile.name = file.name;
        xmlFile.xmlFileContent = reader.result.toString();
        this.doOpen(xmlFile).then((_) => resolve());
      };
    });
  }

  doOpen(f: XmlFile): Promise<{}> {
    f.selected = true;
    return new Promise((resolve, reject) => {
      this.xmlService.parseFile(f.xmlFileContent).then((ft) => {
        f.tree = ft;
        const existingFile = this.dataService.findFile(f);
        if (existingFile) {
          this.selectionService.selectFile(existingFile);
        } else {
          this.selectionService.selectFile(f);
          this.dataService.addFile(f);
        }
        resolve();
      });
    });
  }
}
