import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-xml-view',
  templateUrl: './xml-view.component.html',
  styleUrls: ['./xml-view.component.css']
})
export class XmlViewComponent implements OnInit {

  document: Document;

  parserError: string;

  selectedNode: Node;

  @Input() set xmlString (value: string) {
    const parser = new DOMParser();
    this.document = parser.parseFromString(value, 'application/xml');
    const parsererror = this.document.querySelector('html body parsererror div');
    if (parsererror) {
      this.parserError = parsererror.textContent;
    } else {
      this.parserError =  null;
    }
  }

  constructor() { }

  ngOnInit() {
  }

  onSelectedNode(node: Node) {
    this.setSelected(this.selectedNode, false);
    this.selectedNode = node;
    this.setSelected(this.selectedNode, true);
  }

  setSelected(node: Node, state: boolean) {
    if (!node) {
      return;
    }
    const elt = node as any;
    elt.selected = state;
  }

  getSelectedNodeHierarchy(): Node[] {
    const ret = [];
    let node = this.selectedNode;
    while (node && node.parentNode) {
      ret.push(node);
      node = node.parentNode;
    }
    return ret.reverse();
  }

}
