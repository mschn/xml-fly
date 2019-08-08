import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Elt, Selection } from 'src/app/model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-abstract-node',
  template: ''
})
export class AbstractNodeComponent implements OnInit, OnDestroy {

  @ViewChild('anchor', { static: false }) nodeRef: ElementRef;

  selected = false;
  selectedAttr: Attr;

  selection: Selection;

  subs: Subscription[] = [];

  constructor(protected dataService: DataService) { }

  ngOnInit() {
    this.subs.push(this.dataService.getSelection().subscribe(sel => this.selection = sel));
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  onAttrClick(event: Event, attr: Attr, node: Elt) {
    event.stopPropagation();
    this.dataService.selectAttr(attr, node, this);
  }
}
