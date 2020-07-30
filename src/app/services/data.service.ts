import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { XmlFile } from '../data/xml-file';
import { SearchResult } from '../data/search-result';
import { Elt } from '../data/elt';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _files = new BehaviorSubject<XmlFile[]>([]);
  private _selectedFile = new BehaviorSubject<XmlFile>(null);
  private _searchVisible = new BehaviorSubject<boolean>(false);
  private _searchText: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private _searchResults: BehaviorSubject<SearchResult[]> = new BehaviorSubject<SearchResult[]>(null);
  private _isLoading = new BehaviorSubject<boolean>(false);

  readonly files = this._files.asObservable();
  readonly selectedFile = this._selectedFile.asObservable();
  readonly searchVisible = this._searchVisible.asObservable();
  readonly searchText = this._searchText.asObservable();
  readonly searchResults = this._searchResults.asObservable();
  readonly isLoading = this._isLoading.asObservable();

  constructor() {}

  setSearchVisible(visible: boolean) {
    this._searchVisible.next(visible);
  }

  setSearchText(text: string) {
    this._searchText.next(text);
  }

  setSearchResults(res: SearchResult[]) {
    this._searchResults.next(res);
  }

  setIsLoading(loading: boolean) {
    this._isLoading.next(loading);
  }

  addFile(file: XmlFile) {
    const arr = this._files.value;
    arr.push(file);
    this._files.next(arr);
  }

  removeFile(file: XmlFile) {
    const arr = this._files.value;
    const idx = arr.indexOf(file);
    if (idx > -1) {
      arr.splice(idx, 1);
    }
    this._files.next(arr);
  }

  findFile(file: XmlFile): XmlFile {
    return this._files.value.find((f) => f.xmlFileContent === file.xmlFileContent);
  }

  setSelectedFile(file: XmlFile) {
    this._selectedFile.next(file);
  }
}
