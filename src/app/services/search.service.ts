import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { SearchResult } from '../data/search-result';
import { Elt } from '../data/elt';
import { XmlFile } from '../data/xml-file';
import { Attr } from '../data/attr';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  selectedFile: XmlFile;

  constructor(private readonly data: DataService) {
    this.data.selectedFile.subscribe((selectedFile) => (this.selectedFile = selectedFile));
  }

  doSearch(search: string) {
    const searchResults: SearchResult[] = [];
    const tree = this.selectedFile.tree;
    this.doSearchRec(search, tree, searchResults);
    this.selectedFile.searchResults = searchResults;
    this.selectedFile.searchText = search;
  }

  private doSearchRec(search: string, elt: Elt, results: SearchResult[]) {
    this.searchElement(search, elt, results);

    if (elt.attributes) {
      Object.values(elt.attributes).forEach((attr) => {
        this.searchAttribute(search, elt, attr, results);
      });
    }

    if (elt.children) {
      Object.values(elt.children).forEach((children) =>
        children.forEach((child) => {
          this.doSearchRec(search, child, results);
        })
      );
    }
  }

  private searchElement(search: string, elt: Elt, results: SearchResult[]) {
    if (this.matchElementName(search, elt) || this.matchElementText(search, elt)) {
      const res = {
        elt: elt,
        searchText: search,
      };
      results.push(res);
      elt.searchResults.push(res);
    }
  }

  private searchAttribute(search: string, elt: Elt, attr: Attr, results: SearchResult[]) {
    if (this.matchAttributeName(search, elt, attr) || this.matchAttributeText(search, elt, attr)) {
      const res = {
        elt,
        attr,
        searchText: search,
      };
      results.push(res);
      elt.searchResults.push(res);
    }
  }

  private matchElementName(search: string, elt: Elt): boolean {
    return elt.name.toLowerCase().includes(search.toLowerCase());
  }

  private matchElementText(search: string, elt: Elt): boolean {
    return elt.text && elt.text.toLowerCase().includes(search.toLowerCase());
  }

  private matchAttributeName(search: string, elt: Elt, attr: Attr): boolean {
    return attr.name.toLowerCase().includes(search.toLowerCase());
  }

  private matchAttributeText(search: string, elt: Elt, attr: Attr): boolean {
    return attr.value.toLowerCase().includes(search.toLowerCase());
  }
}
