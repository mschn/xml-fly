import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-xml-view',
  templateUrl: './xml-view.component.html',
  styleUrls: ['./xml-view.component.css']
})
export class XmlViewComponent implements OnInit {

  document: Document;

  parserError: string;

  @Input() set xmlString (value: string) {
    const parser = new DOMParser();
    const document = parser.parseFromString(value, 'application/xml');
    const parsererror = document.querySelector('html body parsererror div');
    if (parsererror) {
      this.parserError = parsererror.textContent;
    } else {
      this.parserError =  null;
    }
    this.groupArrays(document);
    this.document = document;
  }

  private groupArrays (parentNode: Node) {
    const nodes: {[s: string]: Array<Element> } = {};
    for (let i = 0; i < parentNode.childNodes.length; i++) {
      const node = parentNode.childNodes[i] as Element;
      if (!nodes.hasOwnProperty(node.tagName)) {
        nodes[node.tagName] = [];
      }
      this.groupArrays(node);
      nodes[node.tagName].push(node);
    }
    const nodeGroups = Object.values(nodes);
    this.removeEmptyTextNodes(nodeGroups);
    (parentNode as any).childNodesGroups = Object.values(nodeGroups);
  }

  private removeEmptyTextNodes(nodesGroups: Element[][]) {
    for (let i = nodesGroups.length - 1; i >= 0; i--) {
      const nodeGroup = nodesGroups[i];
      if (nodeGroup.every(element => {
        return element instanceof Text && element.textContent.trim() === '';
      })) {
        nodesGroups.splice(i, 1);
      }
    }
  }

  constructor() { }

  ngOnInit() {
  }
}
