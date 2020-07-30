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
}
