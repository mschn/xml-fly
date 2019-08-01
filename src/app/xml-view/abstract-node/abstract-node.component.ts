import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Elt } from 'src/app/model';

@Component({
  selector: 'app-abstract-node',
  template: ''
})
export class AbstractNodeComponent implements OnInit {

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
