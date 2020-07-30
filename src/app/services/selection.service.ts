import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { XmlFile } from '../data/xml-file';
import { Elt } from '../data/elt';
import { AbstractNodeComponent } from '../xml-view/abstract-node/abstract-node.component';

@Injectable({
  providedIn: 'root',
})
export class SelectionService {
  selectedFile: XmlFile;
  files: XmlFile[];

  constructor(private readonly dataService: DataService) {
    this.dataService.getSelectedFile().subscribe((selectedFile) => (this.selectedFile = selectedFile));
    this.dataService.getFiles().subscribe((files) => (this.files = files));
  }

  selectFile(file: XmlFile): void {
    if (this.selectedFile) {
      this.selectedFile.deselect();
    }
    file.select();
    this.dataService.setSelectedFile(file);
  }

  deselectFile() {
    if (this.selectedFile) {
      this.selectedFile.deselect();
    }
    this.dataService.setSelectedFile(null);
  }

  closeFile(file?: XmlFile): void {
    if (!file) {
      file = this.selectedFile;
    }
    if (this.selectedFile) {
      this.selectedFile.clearSelection();
    }
    this.deselectFile();
    this.dataService.removeFile(file);
    setTimeout((_) => {
      if (this.files.length > 0) {
        this.selectFile(this.files[0]);
      }
    });
  }

  selectNode(node: Elt, source: AbstractNodeComponent): void {
    this.selectedFile.selectNode(node, source);
    node.expandParent();
    source.scrollIfNeeded();
  }

  clearSelection() {
    this.selectedFile.clearSelection();
  }

  selectAttr(attr: Attr, node: Elt, source: AbstractNodeComponent): void {
    this.selectedFile.selectAttr(attr, node, source);
  }
}
