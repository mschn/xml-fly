import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Elt } from 'src/app/model';

@Component({
  selector: 'app-abstract-node',
  template: ''
})
export class AbstractNodeComponent implements OnInit {

  collapsed = false;
  selected = false;
  selectedAttr: Attr;

  constructor(protected dataService: DataService) { }

  ngOnInit() {
  }

  show(event: Event) {
    this.collapsed = false;
  }

  hide(event: Event) {
    this.collapsed = true;
  }

  onAttrClick(event: Event, attr: Attr, node: Elt) {
    event.stopPropagation();
    this.dataService.selectAttr(attr, node, this);
  }
}
