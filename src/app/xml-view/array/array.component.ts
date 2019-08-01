import { Component, OnInit, Input } from '@angular/core';
import { AbstractNodeComponent } from '../abstract-node/abstract-node.component';
import { DataService } from 'src/app/data.service';
import { Elt } from 'src/app/model';

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
    this.dataService.selectNode(this.nodes[0], this);
  }

  show(event: Event) {
    (this.nodes[0] as any).collapsed = false;
  }

  hide(event: Event) {
    (this.nodes[0] as any).collapsed = true;
  }

  getChildNodes(node: Elt): Elt[] {
    const tagNames = this.nodes[0].childrenNames;
    const ret = [];
    tagNames.forEach(tagName => {
      ret.push(this.getChildNodeByTagname(node, tagName));
    });
    return ret;
  }

  getChildNodeByTagname(node: Elt, tagName: string): Elt {
    for (let i = 0; i < node.children.length; i++) {
      const arr = node.children[i];
      if (arr[0].name === tagName) {
        return arr[0];
      }
    }
  }

}
