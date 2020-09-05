import { Elt } from './elt';
import { AbstractNodeComponent } from '../xml-view/abstract-node/abstract-node.component';

export class Selection {
  type: 'Node' | 'Attr';
  path: string[];
  value: string;
  element: Elt;
  attr: Attr;

  getPath(separator = '/'): string {
    return this.element.getPath().join(separator);
  }

  selectNode(node: Elt): void {
    this.type = 'Node';
    this.path = node.getPath();
    this.value = node.text;
    this.element = node;
    this.attr = null;
  }

  selectAttr(attr: Attr, node: Elt): void {
    this.type = 'Attr';
    this.path = node.getPath();
    this.path.push(attr.name);
    this.value = attr.value;
    this.element = node;
    this.attr = attr;
  }

  deselect(): void {
    if (this.element) {
      this.element.selection = null;
      this.element.selected = false;
    }
  }

  clear() {
    this.type = null;
    this.path = null;
    this.value = null;
    this.element = null;
    this.attr = null;
  }
}
