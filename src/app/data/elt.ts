import { Attr } from './attr';
import { Highlights } from './highlights';
import { Selection } from './selection';
import { AbstractNodeComponent } from '../xml-view/abstract-node/abstract-node.component';

export class Elt {
  /** parent in XML tree */
  parent: Elt;
  /** XML tag name */
  name: string;
  /** XML attributes */
  attributes: { [key: string]: Attr };
  attributeNames: Set<string>;
  /** Children in XML tree, grouped by tag name */
  children: { [key: string]: Elt[] };
  childrenNames: Set<string>;
  /** Full text content if text node */
  text: string;
  /** Shortened text content if text node */
  shortText: string;
  /** True if text node */
  isText: boolean;
  /** True if node should be collapsed */
  collapsed: boolean;
  /** Reference to the view component displaying this node */
  viewRef: AbstractNodeComponent;
  highlights: Highlights = new Highlights();
  selection: Selection;
  selected = false;

  getPath(): string[] {
    const paths = [];
    let curNode: Elt = this;
    while (curNode.parent) {
      let pathElt = curNode.name;
      if (curNode.parent.children[curNode.name].length > 1) {
        const idx = curNode.parent.children[curNode.name].indexOf(curNode);
        pathElt = (`${pathElt}[${idx}]`);
      }
      paths.push(pathElt);
      curNode = curNode.parent;
    }
    return paths.reverse();
  }

  expandParent() {
    if (this.parent && this.parent.collapsed) {
      this.parent.collapsed = false;
      this.parent.expandParent();
    }
  }

  toggleAll(state: boolean) {
    this.collapsed = state;
    if (!this.children) {
      return;
    }
    Object.values(this.children).forEach((childArr) => {
      childArr.forEach((child) => {
        child.toggleAll(state);
      });
    });
    this.viewRef.cdr.detectChanges();
  }

  toXmlString(): string {
    const str: string[] = [];
    str.push(`<${this.name}`);
    if (this.attributes) {
      Object.values(this.attributes).forEach(attr => {
        const val = this.encodeXml(attr.value);
        str.push(` ${attr.name}="${val}"`);
      });
    }
    if (this.highlights?.node) {
      str.push(` __HL="${this.encodeXml(this.highlights.node)}"`);
    }
    const attrHl = Object.entries(this.highlights.attrs);
    if (attrHl.length > 0) {
      attrHl.forEach(hl => {
        str.push(` __HL_${hl[0]}="${this.encodeXml(hl[1])}"`);
      });
    }

    str.push(`>`);

    if (this.children) {
      Object.values(this.children).forEach(chArr => {
        chArr.forEach(child => str.push(child.toXmlString()));
      });
    }
    if (this.text) {
      str.push(this.encodeXml(this.text));
    }

    str.push(`</${this.name}>`);
    return str.join('');
  }

  private encodeXml(str: string): string {
    return str.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}
