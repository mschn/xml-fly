import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-abstract-node',
  template: ''
})
export class AbstractNodeComponent implements OnInit {

  private readonly MAX_TEXT_LEN = 200;

  collapsed = false;

  constructor() { }

  ngOnInit() {
  }

  isTextNode(node: Node): boolean {
    return (node.childNodes
      && node.childNodes.length === 1
      && node.childNodes[0] instanceof Text);
  }

  getText(node: Node): string {
    let ret: string = node.textContent;
    if (ret.length > this.MAX_TEXT_LEN) {
      ret = ret.substring(0, this.MAX_TEXT_LEN) + '…';
    }
    return ret;
  }

  show(event: Event) {
    this.collapsed = false;
  }

  hide(event: Event) {
    this.collapsed = true;
  }
}
