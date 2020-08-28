import { Component, OnInit, Input } from '@angular/core';
import { AbstractNodeComponent } from '../abstract-node/abstract-node.component';
import { DataService } from '../../services/data.service';
import { Elt } from '../../data/elt';
import { SelectionService } from '../../services/selection.service';
import { Attr } from '../../data/attr';
import { faPlusSquare, faMinusSquare, faSlash, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss'],
})
export class ArrayComponent extends AbstractNodeComponent implements OnInit {
  @Input() nodes: Elt[];

  icons = { faPlusSquare, faMinusSquare, faSlash, faEllipsisH };

  constructor(dataService: DataService, selectionService: SelectionService) {
    super(dataService, selectionService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.nodes.forEach((n: any) => {
      n.viewRef = this;
    });
  }

  onNodeClick(event: Event) {
    event.stopPropagation();
    return false;
  }

  onSubNodeClick(event: Event, node: Elt) {
    event.stopPropagation();
    this.selectionService.selectNode(node, this);
  }

  show(event: Event) {
    this.nodes[0].collapsed = false;
  }

  hide(event: Event) {
    this.nodes[0].collapsed = true;
  }

  getAttrList(node: Elt): Attr[] {
    const attrNames = this.nodes[0].attributeNames;
    if (!attrNames) {
      return [];
    }
    return Array.from(attrNames).map((attrName) => {
      return node.attributes.find((attr) => attr.name === attrName);
    });
  }

  getChildNodes(node: Elt): Elt[][] {
    const tagNames = this.nodes[0].childrenNames;
    let ret: Elt[][] = [];
    tagNames.forEach((tagName) => {
      ret = ret.concat([this.getChildNodesByTagname(node, tagName)]);
    });
    return ret;
  }

  getChildNodesByTagname(node: Elt, tagName: string): Elt[] {
    for (let i = 0; i < node.children.length; i++) {
      const arr = node.children[i];
      if (arr[0].name === tagName) {
        return arr;
      }
    }
  }
}
