import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { SearchService } from '../services/search.service';
import { SelectionService } from '../services/selection.service';
import { XmlFile } from '../data/xml-file';
import { faSearch, faChevronRight, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input() file: XmlFile;
  @ViewChild('searchBox', { static: true }) searchBox: ElementRef;

  currentResult: number;
  searchDone = false;

  icons = { faSearch, faChevronRight, faChevronLeft, faTimes };

  constructor(private readonly selectionService: SelectionService, private readonly searchService: SearchService) {}

  ngOnInit() {
    this.focusSearch();
  }

  ngOnDestroy() {}

  onEnter(event: KeyboardEvent) {
    if (event.key !== 'Enter') {
      return;
    }
    if (this.searchDone) {
      if (event.shiftKey) {
        this.prevResult();
      } else {
        this.nextResult();
      }
    } else {
      this.doSearch();
    }
  }

  doSearch() {
    if (this.file.searchText && this.file.searchText.trim().length > 0) {
      this.clearResults();
      this.searchService.doSearch(this.file.searchText);
      this.currentResult = 0;
      this.searchDone = true;
      this.refreshResults();
      this.gotoResult();
    }
  }

  nextResult() {
    if (this.file.searchResults && this.file.searchResults.length > 0) {
      this.currentResult++;
      if (this.currentResult >= this.file.searchResults.length) {
        this.currentResult = 0;
      }
      this.gotoResult();
    }
  }

  prevResult() {
    if (this.file.searchResults && this.file.searchResults.length > 0) {
      this.currentResult--;
      if (this.currentResult < 0) {
        this.currentResult = this.file.searchResults.length - 1;
      }
      this.gotoResult();
    }
  }

  gotoResult() {
    if (this.file.searchResults.length === 0) {
      return;
    }
    this.selectionService.clearSelection();
    const elt = this.file.searchResults[this.currentResult].elt;
    const attr = this.file.searchResults[this.currentResult].attr;
    if (attr) {
      this.selectionService.selectAttr(attr, elt, elt.viewRef);
    } else {
      this.selectionService.selectNode(elt, elt.viewRef);
    }
    this.refreshNode();
  }

  focusSearch() {
    this.searchBox.nativeElement.focus();
  }

  close() {
    this.clearResults();
    this.searchDone = false;
    this.file.searchResults = [];
    this.file.searchVisible = false;
  }

  refreshNode() {
    this.file.searchResults[this.currentResult].elt.viewRef.cdr.markForCheck();
  }

  refreshResults() {
    this.file.searchResults.forEach((res) => res.elt.viewRef.cdr.markForCheck());
  }

  clearResults() {
    if (this.file?.searchResults?.length) {
      this.file.searchResults.forEach((res) => {
        res.searchText = null;
        res.elt.viewRef.cdr.markForCheck();
        res.elt.searchResults = [];
      });
    }
  }
}
