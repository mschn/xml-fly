import { Component, OnInit, Input } from '@angular/core';
import { AbstractNodeComponent } from '../abstract-node/abstract-node.component';
import { DataService } from '../../services/data.service';
import { Elt } from '../../data/elt';
import { SelectionService } from '../../services/selection.service';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { Attr } from '../../data/attr';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent extends AbstractNodeComponent implements OnInit {
  @Input() node: Elt;

  @Input() noTagName = false;

  @Input() arrayInParent = false;

  searchText: string;
  icons = { faPlusSquare, faMinusSquare };

  constructor(readonly dataService: DataService, readonly selectionService: SelectionService) {
    super(dataService, selectionService);
    this.dataService.searchText.subscribe((searchText) => (this.searchText = searchText));
  }

  getAttributes(): Attr[] {
    if (!this.node.attributes) {
      return [];
    }
    return Object.values(this.node.attributes);
  }

  getChildren(): Elt[][] {
    if (!this.node.children) {
      return [];
    }
    return Object.values(this.node.children);
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
    this.selectionService.selectNode(this.node, this);
  }

  getValue(value: string) {
    return value.replace(this.searchText, `<span class="search-result">${this.searchText}</span>`);
  }
}
