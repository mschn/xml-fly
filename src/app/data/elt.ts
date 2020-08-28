import { Attr } from './attr';

export class Elt {
  /** parent in XML tree */
  parent: Elt;
  /** XML tag name */
  name: string;
  /** XML attributes */
  attributes: Attr[];
  /** Children in XML tree, grouped by tag name */
  children: Elt[][];
  /** Unique tag names of children in XML tree */
  childrenNames: Set<string>;
  /** Unique attribute names */
  attributeNames: Set<string>;
  /** Full text content if text node */
  text: string;
  /** Shortened text content if text node */
  shortText: string;
  /** True if text node */
  isText: boolean;
  /** True if node should be collapsed */
  collapsed: boolean;
  /** Reference to the view component displaying this node */
  viewRef: any;

  getPath(): string[] {
    const paths = [];
    let curNode: Elt = this;
    while (curNode.parent) {
      paths.push(curNode.name);
      curNode = curNode.parent;
    }
    return paths.reverse();
  }

  expandParent() {
    if (this.parent) {
      this.parent.collapsed = false;
      this.parent.expandParent();
    }
  }

  toggleAll(state: boolean) {
    this.collapsed = state;
    if (!this.children) {
      return;
    }
    this.children.forEach((childArr) => {
      childArr.forEach((child) => {
        child.toggleAll(state);
      });
    });
  }

  toXmlString(): string {
    const str: string[] = [];
    str.push(`<${this.name}`);
    if (this.attributes) {
      this.attributes.forEach(attr => {
        const val = this.encodeXml(attr.value);
        str.push(` ${attr.name}="${val}"`);
      });
    }
    str.push(`>`)

    if (this.children) {
      this.children.forEach(chArr => {
        chArr.forEach(child => str.push(child.toXmlString()));
      });
    }
    if (this.text) {
      str.push(this.encodeXml(this.text));
    }

    str.push(`</${this.name}>`)
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
