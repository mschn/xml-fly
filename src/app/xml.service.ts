import { Injectable } from '@angular/core';
import { Elt, Attr } from './model';

@Injectable({
  providedIn: 'root'
})
export class XmlService {

  constructor() { }

  buildTree (parentNode: Node, parentElt: Elt = null): Elt {
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
      if (!(parentNode.childNodes[i] instanceof Element)) {
        continue;
      }

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
      const attributes = new Set<string>();
      const children = new Set<string>();

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

}
