import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { XmlService } from './xml.service';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { XmlFile } from '../data/xml-file';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(
    private readonly dataService: DataService,
    private readonly hotkeysService: HotkeysService,
    private readonly xmlService: XmlService
  ) {
    this.hotkeysService.add(
      new Hotkey('ctrl+o', (event: KeyboardEvent): boolean => {
        const btn = document.querySelector('#open-file') as HTMLElement;
        btn.click();
        event.preventDefault();
        return false;
      })
    );
    this.hotkeysService.add(
      new Hotkey('ctrl+f', (event: KeyboardEvent): boolean => {
        this.dataService.setSearchVisible(true);
        event.preventDefault();
        return false;
      })
    );
  }

  openFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.dataService.isLoading.next(true);

      const file = target.files[0];
      setTimeout(() => {
        this.doOpenFile(file)
          .then(() => {})
          .catch((err) => console.log('failed to open file ', err))
          .finally(() => this.dataService.isLoading.next(false));
      });
    }
  }

  openFileDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files) {
      this.dataService.isLoading.next(true);
      const file = event.dataTransfer.files[0];
      setTimeout(() => {
        this.doOpenFile(file)
          .then(() => {})
          .catch((err) => console.log('failed to open file ', err))
          .finally(() => this.dataService.isLoading.next(false));
      });
    }
    return false;
  }

  private doOpenFile(file: File): Promise<{}> {
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
        const f = new XmlFile();
        f.name = file.name;
        f.selected = true;
        f.xmlFileContent = reader.result.toString();
        f.tree = this.xmlService.parseFile(f.xmlFileContent);

        const existingFile = this.findFile(f);
        if (existingFile) {
          this.dataService.selectFile(existingFile);
        } else {
          this.dataService.selectFile(f);
          this.dataService.files.push(f);
        }
        resolve();
      };
    });
  }

  private findFile(file: XmlFile): XmlFile {
    for (const f of this.dataService.files) {
      if (file.xmlFileContent === f.xmlFileContent) {
        return f;
      }
    }
    return null;
  }
}
