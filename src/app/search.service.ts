import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { SearchResult, Elt } from './model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private readonly data: DataService) {}

  doSearch(search: string) {
    const searchResults: SearchResult[] = [];
    const tree = this.data.selectedFile.tree;
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
