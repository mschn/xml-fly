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
    this.dataService.selectedFile.subscribe((selectedFile) => (this.selectedFile = selectedFile));
    this.dataService.files.subscribe((files) => (this.files = files));
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
      this.clearSelection();
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
    const sel = this.selectedFile.selection;
    sel.deselect();
    if (sel.element === node && !sel.attr) {
      this.clearSelection();
    } else {
      sel.selectNode(node);
      node.selected = true;
      node.selection = sel;
      node.viewRef = source;
      node.expandParent();
      source.scrollIfNeeded();
    }
  }

  selectAttr(attr: Attr, node: Elt, source: AbstractNodeComponent): void {
    const sel = this.selectedFile.selection;
    sel.deselect();
    if (sel.attr === attr) {
      this.clearSelection();
    } else {
      sel.selectAttr(attr, node);
      node.selected = true;
      node.selection = sel;
    }
  }

  clearSelection() {
    const sel = this.selectedFile.selection;
    sel.deselect();
    sel.clear();
  }

  highlightSelection() {
    const sel = this.selectedFile.selection;
    const hl = sel.element.highlights;
    if (!this.selectedFile || !sel.element) {
      return;
    }
    if (sel?.type === 'Node') {
      if (hl.node == null) {
        hl.node = `Add a custom node annotation here`;
      } else {
        hl.node = null;
      }
    } else {
      if (hl.attrs[sel.attr.name] == null) {
        hl.attrs[sel.attr.name] = `Add a custom attribute annotation here`;
      } else {
        hl.attrs[sel.attr.name] = null;
      }

    }
    this.selectedFile.selection.element.viewRef.cdr.markForCheck();
  }
}
