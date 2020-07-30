import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Selection } from '../../data/selection';
import { Elt } from '../../data/elt';
import { SelectionService } from '../../services/selection.service';

@Component({
  selector: 'app-abstract-node',
  template: '',
})
export class AbstractNodeComponent implements OnInit, OnDestroy {
  @ViewChild('anchor') nodeRef: ElementRef;

  selected = false;
  selectedAttr: Attr;

  selection: Selection;

  subs: Subscription[] = [];

  constructor(protected dataService: DataService, protected selectionService: SelectionService) {}

  ngOnInit() {
    this.subs.push(
      this.dataService.selectedFile.subscribe((file) => {
        this.selection = file?.selection;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  onAttrClick(event: Event, attr: Attr, node: Elt) {
    event.stopPropagation();
    this.selectionService.selectAttr(attr, node, this);
  }

  scrollIfNeeded() {
    const elt = this.nodeRef.nativeElement;
    const rect = elt.getBoundingClientRect();
    if (rect.bottom > window.innerHeight) {
      elt.scrollIntoView();
    }
    if (rect.top < 0) {
      elt.scrollIntoView();
    }
  }
}
