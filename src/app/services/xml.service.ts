import { Injectable } from '@angular/core';
import { Elt } from '../data/elt';
import { Attr } from '../data/attr';
import xml2js from 'xml2js';

@Injectable({
  providedIn: 'root',
})
export class XmlService {
  constructor() {}

  parseFile(value: string): Promise<Elt> {
    return new Promise<Elt>((resolve, reject) => {
      xml2js.parseString(value, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const tree = this.buildTree(result, '#ROOT');
          const children = Object.values(tree.children);
          if (tree && children.length === 1 && children[0].length === 1) {
            resolve(children[0][0]);
          }
          resolve(tree);
        }
      });
    });
  }

  buildTree(parentNode: any, nodeName: string, parentElt: Elt = null): Elt {
    const elt = this.getElt(parentNode, nodeName);
    if (parentElt) {
      elt.parent = parentElt;
    }

    if (this.isTextNode(parentNode)) {
      return elt;
    }

    if (parentNode.hasOwnProperty('$')) {
      elt.attributes = {};
      const attrs: any[] = Object.keys(parentNode['$']);
      for (let i = 0; i < attrs.length; i++) {
        const attr = new Attr();
        attr.name = attrs[i];
        attr.value = parentNode['$'][attrs[i]];
        elt.attributes[attr.name] = attr;
      }
    }

    const nodes: { [s: string]: Elt[] } = {};
    Object.keys(parentNode)
      .filter((key) => key !== '$')
      .forEach((childNodeName) => {
        const obj: any = parentNode[childNodeName];

        if (!nodes.hasOwnProperty(childNodeName)) {
          nodes[childNodeName] = [];
        }

        if (typeof obj !== 'string' && Array.isArray(obj)) {
          Object.values(obj).forEach((node) => {
            nodes[childNodeName].push(this.buildTree(node, childNodeName, elt));
          });
        } else {
          nodes[childNodeName].push(this.buildTree(obj, childNodeName, elt));

        }

        // if (typeof obj === 'string') {
        // } else if (Array.isArray(obj)) {
          // Object.values(obj).forEach((node) => {
            // nodes[childNodeName].push(this.buildTree(node, childNodeName, elt));
          // });
        // } else {
          // Object.keys(obj).forEach((node) => {
            // nodes[childNodeName].push(this.buildTree(obj[node], childNodeName, elt));
          // });
        // }
      });

    elt.children = nodes;
    this.computeArrayProperties(elt);
    return elt;
  }

  private getElt(n: any, name: string): Elt {
    const elt = new Elt();
    elt.name = name;
    if (typeof n === 'string') {
      elt.isText = true;
      elt.collapsed = false;
      elt.text = n;
      elt.shortText = elt.text;
      if (elt.text.length > 200) {
        elt.shortText = elt.text.substring(0, 200) + '…';
      }
    }
    return elt;
  }

  private computeArrayProperties(parent: Elt) {
    const elements = parent.children;
    for (const arr of Object.values(elements)) {
      const attributes = new Set<string>();
      const children = new Set<string>();

      for (const elt of arr) {
        if (elt.attributes) {
          Object.keys(elt.attributes).forEach((attr) => attributes.add(attr));
        }
        if (elt.children) {
          Object.keys(elt.children).forEach((child) => children.add(child));
        }
      }
      arr[0].attributeNames = attributes;
      arr[0].childrenNames = children;
    }
  }

  private isTextNode(node: any): boolean {
    return typeof node === 'string';
  }

  private isEmptyTextNode(node: any): boolean {
    return node === '';
  }
}
