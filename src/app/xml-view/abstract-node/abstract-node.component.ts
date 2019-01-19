import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-abstract-node',
  template: ''
})
export class AbstractNodeComponent implements OnInit {

  private readonly MAX_TEXT_LEN = 200;

  collapsed = false;

  constructor(private dataService: DataService) { }

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

  onClick(event: Event, node: Node) {
    event.stopPropagation();
    this.dataService.selectNode(node);
  }
}