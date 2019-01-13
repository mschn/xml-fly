import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']

})
export class NodeComponent implements OnInit {

  @Input() node: Node;

  @Input() noTagName = false;

  private collapsed = false;

  @Input() arrayInParent = false;

  ngOnInit() {
    if (this.arrayInParent) {
      this.collapsed = true;
    }
  }

  isTextNode(): boolean {
    return (this.node.childNodes
      && this.node.childNodes.length === 1
      && this.node.childNodes[0] instanceof Text);
  }

  getChildNodes(): any {
    const nodes = {};
    for (let i = 0 ; i < this.node.childNodes.length; i++) {
      const node = this.node.childNodes[i] as Element;
      if (!nodes.hasOwnProperty(node.tagName)) {
        nodes[node.tagName] = [];
      }
      nodes[node.tagName].push(node);
    }
    return Object.values(nodes);
  }

  show(event: Event) {
    this.collapsed = false;
  }

  hide(event: Event) {
    this.collapsed = true;
  }
}
