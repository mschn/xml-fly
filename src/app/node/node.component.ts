import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {

  @Input() node: Node;

  @Output() selection = new EventEmitter<Node>();

  collapsed = false;

  constructor() { }

  ngOnInit() {
  }

  isTextNode(): boolean {
    return (this.node.childNodes
      && this.node.childNodes.length === 1
      && this.node.childNodes[0] instanceof Text);
  }

  clickNode(event: Event) {
    event.stopPropagation();
    this.selection.emit(this.node);
  }

  onSelectedNode(node: Node) {
    this.selection.emit(node);
  }

  toggle(collapsed: boolean, event: Event) {
    this.collapsed = collapsed;
    event.stopPropagation();
  }

}
