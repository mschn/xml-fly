import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-abstract-node',
  template: '',
  styleUrls: ['./abstract-node.component.css']
})
export class AbstractNodeComponent implements OnInit {

  collapsed = false;

  constructor() { }

  ngOnInit() {
  }

  isTextNode(node: Node): boolean {
    return (node.childNodes
      && node.childNodes.length === 1
      && node.childNodes[0] instanceof Text);
  }

  show(event: Event) {
    this.collapsed = false;
  }

  hide(event: Event) {
    this.collapsed = true;
  }
}
