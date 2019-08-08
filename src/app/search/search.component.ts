import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { SearchResult } from '../model';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  @ViewChild('searchBox', { static: false }) searchBox: ElementRef;

  searchVisible: boolean;
  searchText = '';

  searchResults: SearchResult[];
  currentResult: number;

  subs: Subscription[] = [];

  constructor(
    private readonly data: DataService,
    private readonly searchService: SearchService
  ) { }

  ngOnInit() {
    this.subs.push(this.data.searchVisible.subscribe(searchVisible => {
      this.searchVisible = searchVisible;
      if (searchVisible) {
        setTimeout(_ => this.focusSearch());
      }
    }));
    this.subs.push(this.data.getSearchResults().subscribe(res => {
      this.currentResult = 0;
      this.searchResults = res;
      if (res && res.length > 0) {
        this.gotoResult();  
      }
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  doSearch() {
    if (this.searchText && this.searchText.trim().length > 0) {
      this.searchService.doSearch(this.searchText);
    }
  }

  nextResult() {
    if (this.searchResults && this.searchResults.length > 0) {
      this.currentResult++;
      if (this.currentResult >= this.searchResults.length) {
        this.currentResult = 0;
      }
      this.gotoResult();
    }
  }

  prevResult() {
    if (this.searchResults && this.searchResults.length > 0) {
      this.currentResult--;
      if (this.currentResult < 0) {
        this.currentResult = this.searchResults.length - 1;
      }
      this.gotoResult();
    }
  }

  gotoResult() {
    const elt = this.searchResults[this.currentResult].elt;
    this.data.selectNode(elt, elt.viewRef);
  }

  focusSearch() {
    this.searchBox.nativeElement.focus();
  }

}
