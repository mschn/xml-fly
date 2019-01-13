import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss']
})
export class ArrayComponent implements OnInit {

  @Input() nodes: Node[];

  private collapsed = false;

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
