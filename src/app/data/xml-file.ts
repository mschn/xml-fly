import { Elt } from './elt';
import { Selection } from './selection';
import { AbstractNodeComponent } from '../xml-view/abstract-node/abstract-node.component';

export class XmlFile {
  name: string;
  selected: boolean;
  xmlFileContent: string;
  selection: Selection;
  tree: Elt;

  select() {
    if (!this.selection) {
      this.selection = new Selection();
    }
    this.selected = true;
  }

  deselect() {
    this.selected = false;
  }

  selectNode(node: Elt, source: AbstractNodeComponent): void {
    if (this.selection && this.selection.node) {
      this.selection.node.selected = false;
    }
    this.selection.type = 'Node';
    this.selection.path = node.getPath();
    this.selection.value = node.text;
    this.selection.element = node;
    this.selection.node = source;
    this.selection.node.selected = true;
    this.selection.node.selectedAttr = null;
  }

  selectAttr(attr: Attr, node: Elt, source: AbstractNodeComponent): void {
    if (this.selection && this.selection.node) {
      this.selection.node.selected = false;
    }
    this.selection.type = 'Attr';
    this.selection.path = node.getPath();
    this.selection.path.push(attr.name);
    this.selection.value = attr.value;
    this.selection.node = source;
    this.selection.element = node;
    this.selection.node.selected = true;
    this.selection.node.selectedAttr = attr;
  }

  clearSelection() {
    if (this.selection && this.selection.node) {
      this.selection.node.selected = false;
    }
    this.selection.type = null;
    this.selection.path = null;
    this.selection.value = null;
    this.selection.element = null;
    this.selection.node = null;
  }

}
