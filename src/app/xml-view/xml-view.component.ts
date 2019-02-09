import { Component, OnInit, Input } from '@angular/core';
import { Elt, Attr } from '../model';

@Component({
  selector: 'app-xml-view',
  templateUrl: './xml-view.component.html',
  styleUrls: ['./xml-view.component.css']
})
export class XmlViewComponent implements OnInit {

  elt: Elt;

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
    this.elt = this.buildTree(document);
  }

  private buildTree (parentNode: Node, parentElt: Elt = null): Elt {
    const elt = this.getElt(parentNode);
    if (parentElt) {
      elt.parent = parentElt;
    }

    if (this.isTextNode(parentNode)) {
      return elt;
    }

    if (parentNode instanceof Element) {
      elt.attributes = [];
      for (let i = 0; i < parentNode.attributes.length; i++) {
        const attr = new Attr();
        attr.name = parentNode.attributes[i].name;
        attr.value = parentNode.attributes[i].value;
        elt.attributes.push(attr);
      }
    }

    const nodes: { [s: string]: Elt[] } = {};
    for (let i = 0; i < parentNode.childNodes.length; i++) {
      const node = parentNode.childNodes[i] as Element;

      if (this.isEmptyTextNode(node)) {
        continue;
      }

      if (!nodes.hasOwnProperty(node.tagName)) {
        nodes[node.tagName] = [];
      }

      nodes[node.tagName].push(this.buildTree(node, elt));
    }
    elt.children = Object.values(nodes);
    this.computeArrayProperties(elt);
    return elt;
  }

  private getElt(n: Node): Elt {
    const elt = new Elt();
    elt.name = n.nodeName;
    if (this.isTextNode(n)) {
      elt.isText = true;
      elt.text = n.textContent;
      elt.shortText = elt.text;
      if (elt.text.length > 200) {
        elt.shortText = elt.text.substring(0, 200) + '…';
      }
    }
    return elt;
  }

  private computeArrayProperties(parent: Elt) {
    const elements: Elt[][] = parent.children;
    for (const arr of elements) {
      const attributes = new Set();
      const children = new Set();

      for (const elt of arr) {
        if (elt.attributes) {
          for (let i = 0; i < elt.attributes.length; i++) {
            attributes.add(elt.attributes[i].name);
          }
        }
        if (elt.children) {
          for (let i = 0; i < elt.children.length; i++) {
            const childNode = elt.children[i];
            if (childNode[0]) {
              children.add(childNode[0].name);
            }
          }
        }
      }
      arr[0].attributeNames = attributes;
      arr[0].childrenNames = children;
    }
  }

  private isTextNode(node: Node): boolean {
    return (node.childNodes
      && node.childNodes.length === 1
      && node.childNodes[0] instanceof Text);
  }

  private isEmptyTextNode(node: Node): boolean {
    return (node instanceof Text && node.textContent.trim() === '');
  }

  constructor() { }

  ngOnInit() {
  }
}
