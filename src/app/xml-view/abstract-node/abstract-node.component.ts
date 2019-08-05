import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Elt } from 'src/app/model';

@Component({
  selector: 'app-abstract-node',
  template: ''
})
export class AbstractNodeComponent implements OnInit {

  @ViewChild('anchor', { static: false }) nodeRef: ElementRef;

  selected = false;
  selectedAttr: Attr;

  constructor(protected dataService: DataService) { }

  ngOnInit() {
  }

  onAttrClick(event: Event, attr: Attr, node: Elt) {
    event.stopPropagation();
    this.dataService.selectAttr(attr, node, this);
  }
}
