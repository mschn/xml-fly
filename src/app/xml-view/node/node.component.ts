import { Component, OnInit, Input } from '@angular/core';
import { AbstractNodeComponent } from '../abstract-node/abstract-node.component';
import { DataService } from '../../services/data.service';
import { Elt } from '../../data/elt';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent extends AbstractNodeComponent implements OnInit {
  @Input() node: Elt;

  @Input() noTagName = false;

  @Input() arrayInParent = false;

  constructor(dataService: DataService) {
    super(dataService);
  }

  show(event: Event) {
    this.node.collapsed = false;
  }

  hide(event: Event) {
    this.node.collapsed = true;
  }

  ngOnInit() {
    this.node.viewRef = this;
    if (this.arrayInParent) {
      this.node.collapsed = true;
    }
  }

  onNodeClick(event: Event) {
    event.stopPropagation();
    this.dataService.selectNode(this.node, this);
  }

  getValue(value: string) {
    const search = this.dataService.getSearchTextValue();
    return value.replace(search, `<span class="search-result">${search}</span>`);
  }
}
