import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { AbstractNodeComponent } from '../xml-view/abstract-node/abstract-node.component';
import { XmlService } from './xml.service';
import { XmlFile } from '../data/xml-file';
import { SearchResult } from '../data/search-result';
import { Selection } from '../data/selection';
import { Elt } from '../data/elt';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  files: Array<XmlFile> = new Array<XmlFile>();
  selectedFile = new BehaviorSubject<XmlFile>(null);

  searchVisible = new BehaviorSubject<boolean>(false);
  searchText: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  searchResults: BehaviorSubject<SearchResult[]> = new BehaviorSubject<SearchResult[]>(null);
  isLoading = new BehaviorSubject<boolean>(false);

  constructor(private readonly xmlService: XmlService) {}

  getSearchVisible(): Observable<boolean> {
    return this.searchVisible.asObservable();
  }
  setSearchVisible(visible: boolean) {
    this.searchVisible.next(visible);
  }

  setSearchText(text: string) {
    this.searchText.next(text);
  }
  getSearchTextValue(): string {
    return this.searchText.value;
  }

  getSearchResults(): Observable<SearchResult[]> {
    return this.searchResults.asObservable();
  }
  setSearchResults(res: SearchResult[]) {
    this.searchResults.next(res);
  }

  getFiles(): Observable<XmlFile[]> {
    return of(this.files);
  }

  getSelectedFile(): Observable<XmlFile> {
    return this.selectedFile.asObservable();
  }

  selectFile(file: XmlFile): void {
      if (this.selectedFile.value) {
        this.selectedFile.value.selected = false;
      }
      if (!file.selection) {
        file.selection = new Selection();
      }
      file.selected = true;
      this.selectedFile.next(file);
  }

  deselectFile() {
    if (this.selectedFile.value) {
      this.selectedFile.value.selected = false;
    }
    this.selectedFile.next(null);
  }

  selectNode(node: Elt, source: AbstractNodeComponent): void {
    if (this.selectedFile.value.selection && this.selectedFile.value.selection.node) {
      this.selectedFile.value.selection.node.selected = false;
    }
    this.selectedFile.value.selection.type = 'Node';
    this.selectedFile.value.selection.path = this.getNodePath(node);
    this.selectedFile.value.selection.value = node.text;
    this.selectedFile.value.selection.element = node;
    this.selectedFile.value.selection.node = source;
    this.selectedFile.value.selection.node.selected = true;
    this.selectedFile.value.selection.node.selectedAttr = null;

    this.expandParent(node);
    this.scrollIfNeeded(source);
  }

  selectAttr(attr: Attr, node: Elt, source: AbstractNodeComponent): void {
    if (this.selectedFile.value.selection && this.selectedFile.value.selection.node) {
      this.selectedFile.value.selection.node.selected = false;
    }
    this.selectedFile.value.selection.type = 'Attr';
    this.selectedFile.value.selection.path = this.getNodePath(node);
    this.selectedFile.value.selection.path.push(attr.name);
    this.selectedFile.value.selection.value = attr.value;
    this.selectedFile.value.selection.node = source;
    this.selectedFile.value.selection.element = node;
    this.selectedFile.value.selection.node.selected = true;
    this.selectedFile.value.selection.node.selectedAttr = attr;
  }

  clearSelection() {
    if (this.selectedFile.value.selection && this.selectedFile.value.selection.node) {
      this.selectedFile.value.selection.node.selected = false;
    }
    this.selectedFile.value.selection.type = null;
    this.selectedFile.value.selection.path = null;
    this.selectedFile.value.selection.value = null;
    this.selectedFile.value.selection.element = null;
    this.selectedFile.value.selection.node = null;
  }

  closeFile(file?: XmlFile): void {
    if (!file) {
      file = this.selectedFile.value;
    }

    if (this.selectedFile.value) {
      this.selectedFile.value.selection.node = null;
      this.selectedFile.value.selection.type = null;
    }

    const idx = this.files.indexOf(file);
    if (idx > -1) {
      this.files.splice(idx, 1);
    }
    if (this.files.length > 0) {
      this.selectFile(this.files[0]);
    }
  }

  expandAll() {
    this.toggleAll(this.selectedFile.value.tree, false);
  }

  collapseAll() {
    this.toggleAll(this.selectedFile.value.tree, true);
  }

  toggleAll(node: Elt, state: boolean) {
    if (!node) {
      return;
    }
    node.collapsed = state;
    if (!node.children) {
      return;
    }
    for (let i = 0; i < node.children.length; i++) {
      for (let j = 0; j < node.children[i].length; j++) {
        this.toggleAll(node.children[i][j], state);
      }
    }
  }

  private expandParent(node: Elt) {
    if (node.parent) {
      node.parent.collapsed = false;
      this.expandParent(node.parent);
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

  private scrollIfNeeded(node: AbstractNodeComponent) {
    const elt = node.nodeRef.nativeElement;

    const rect = elt.getBoundingClientRect();
    if (rect.bottom > window.innerHeight) {
      elt.scrollIntoView();
    }
    if (rect.top < 0) {
      elt.scrollIntoView();
    }
  }
}
