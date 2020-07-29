import { Component, OnInit, Input } from '@angular/core';
import { AbstractNodeComponent } from '../abstract-node/abstract-node.component';
import { DataService } from '../../services/data.service';
import { Elt } from '../../data/elt';

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss']
})
export class ArrayComponent extends AbstractNodeComponent implements OnInit  {

  @Input() nodes: Elt[];

  constructor(dataService: DataService) {
    super(dataService);
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
    this.dataService.selectNode(node, this);
  }

  show(event: Event) {
    this.nodes[0].collapsed = false;
  }

  hide(event: Event) {
    this.nodes[0].collapsed = true;
  }

  getChildNodes(node: Elt): Elt[][] {
    const tagNames = this.nodes[0].childrenNames;
    let ret: Elt[][] = [];
    tagNames.forEach(tagName => {
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
