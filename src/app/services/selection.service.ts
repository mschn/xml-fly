import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { XmlFile } from '../data/xml-file';
import { Elt } from '../data/elt';
import { AbstractNodeComponent } from '../xml-view/abstract-node/abstract-node.component';
import { Attr } from '../data/attr';

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
      this.selectedFile.selected = false;
    }
    file.selected = true;
    this.dataService.setSelectedFile(file);
  }

  deselectFile() {
    if (this.selectedFile) {
      this.selectedFile.selected = false;
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
    if (sel.element === node && !sel.attr) {
      this.clearSelection();
      return;
    }
    this.clearSelection();
    sel.selectNode(node);
    node.selected = true;
    node.selection = sel;
    node.viewRef = source;
    node.expand();
    node.expandParent();
    source.scrollIfNeeded();
    this.refreshNode();
  }

  selectAttr(attr: Attr, node: Elt, source: AbstractNodeComponent): void {
    const sel = this.selectedFile.selection;
    if (sel.attr === attr) {
      this.clearSelection();
      return;
    }
    this.clearSelection();
    sel.selectAttr(attr, node);
    node.selected = true;
    node.selection = sel;
    node.viewRef = source;
    node.expand();
    node.expandParent();
    source.scrollIfNeeded();
  }

  clearSelection() {
    const sel = this.selectedFile.selection;
    const ref = this.selectedFile.selection.element?.viewRef;
    sel.deselect();
    sel.clear();
    if (ref) {
      ref.cdr.markForCheck();
    }
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
    this.refreshNode();
  }

  showSearch(state = true) {
    if (this.selectedFile) {
      this.selectedFile.searchVisible = state;
    }
  }

  refreshNode() {
    this.selectedFile?.selection?.element?.viewRef.cdr.markForCheck();
  }
}
