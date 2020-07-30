import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { SearchResult } from '../data/search-result';
import { Elt } from '../data/elt';
import { XmlFile } from '../data/xml-file';

@Injectable({
  providedIn: 'root',
})
export class SearchService {

  selectedFile: XmlFile;

  constructor(private readonly data: DataService) {
    this.data.selectedFile.subscribe(selectedFile => this.selectedFile = selectedFile);
  }

  doSearch(search: string) {
    const searchResults: SearchResult[] = [];
    const tree = this.selectedFile.tree;
    this.doSearchRec(search, tree, searchResults);
    this.data.setSearchResults(searchResults);
    this.data.setSearchText(search);
  }

  private doSearchRec(search: string, elt: Elt, results: SearchResult[]) {
    if (elt.name.includes(search)) {
      results.push({
        elt: elt,
      });
    }
    if (elt.children) {
      elt.children.forEach((children) =>
        children.forEach((child) => {
          this.doSearchRec(search, child, results);
        })
      );
    }
  }
}
