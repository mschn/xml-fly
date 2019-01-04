import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  @Input() node: Node;

  @Output() selection = new EventEmitter<Node>();

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
    console.log(this.node);
  }

  onSelectedNode(node: Node) {
    this.selection.emit(node);
  }

}
