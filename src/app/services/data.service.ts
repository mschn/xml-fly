import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { XmlFile } from '../data/xml-file';
import { SearchResult } from '../data/search-result';
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

  constructor() {}

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
  removeFile(file: XmlFile) {
    const idx = this.files.indexOf(file);
    if (idx > -1) {
      this.files.splice(idx, 1);
    }
  }

  getSelectedFile(): Observable<XmlFile> {
    return this.selectedFile.asObservable();
  }

  setSelectedFile(file: XmlFile) {
    this.selectedFile.next(file);
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
}
