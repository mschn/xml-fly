import { Component, OnInit, Input } from '@angular/core';
import { AbstractNodeComponent } from '../abstract-node/abstract-node.component';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss']
})
export class ArrayComponent extends AbstractNodeComponent implements OnInit  {

  @Input() nodes: Node[];

  constructor(dataService: DataService) {
    super(dataService);
   }

  ngOnInit() {
    super.ngOnInit();
  }

  getChildNodes(node: Node): Node[] {
    const tagNames = (this.nodes[0] as any).childNodesSet;
    const ret = [];
    tagNames.forEach(tagName => {
      ret.push(this.getChildNodeByTagname(node, tagName));
    });
    return ret;
  }

  getChildNodeByTagname(node: Node, tagName: string): Node {
    for (let i = 0; i < node.childNodes.length; i++) {
      const childNode = node.childNodes[i];
      if (childNode instanceof Element && childNode.tagName === tagName) {
        return childNode;
      }
      if (childNode instanceof Text && !this.isEmptyTextNode(childNode) && tagName === '#text') {
        return childNode;
      }
    }
  }

}
