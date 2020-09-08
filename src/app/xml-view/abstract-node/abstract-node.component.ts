import { Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Elt } from '../../data/elt';
import { SelectionService } from '../../services/selection.service';
import scrollIntoView from 'scroll-into-view-if-needed';

@Component({
  selector: 'app-abstract-node',
  template: '',
})
export class AbstractNodeComponent {
  @ViewChild('anchor') nodeRef: ElementRef;

  constructor(
    protected dataService: DataService,
    protected selectionService: SelectionService,
    readonly cdr: ChangeDetectorRef
  ) {}

  onAttrClick(event: Event, attr: Attr, node: Elt) {
    event.stopPropagation();
    this.selectionService?.selectedFile?.selection?.element?.viewRef?.cdr?.markForCheck();
    this.selectionService.selectAttr(attr, node, this);
    this.cdr.markForCheck();
  }

  scrollIfNeeded() {
    let elt = this.nodeRef.nativeElement;
    const header = elt.querySelector('.header .tagname');
    const searchRes = elt.querySelector('.search-result');
    if (searchRes) {
      elt = searchRes;
    } else if (header) {
      elt = header;
    }
    scrollIntoView(elt, { behavior: 'smooth', scrollMode: 'if-needed' });
  }

  hasNodeHighlight(node: Elt): boolean {
    return node.highlights && node.highlights.node != null;
  }

  hasAttrHighlight(node: Elt, attr: Attr): boolean {
    return node.highlights && node.highlights.attrs[attr.name] != null;
  }

  highlightFocusOut(event, node: Elt) {
    node.highlights.node = event.target.innerText;
  }

  highlightFocusAttrOut(event, node: Elt, attr: Attr) {
    node.highlights.attrs[attr.name] = event.target.innerText;
  }

  getTextValue(value: string, node: Elt): string {
    if (node.searchResults.length > 0) {
      const searchText = node.searchResults[0].searchText;
      const re = new RegExp(searchText, 'gi');
      return value.replace(re, `<span class="search-result">${searchText}</span>`);
    } else {
      return value;
    }
  }
}
