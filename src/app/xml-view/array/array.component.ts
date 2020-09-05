import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AbstractNodeComponent } from '../abstract-node/abstract-node.component';
import { DataService } from '../../services/data.service';
import { Elt } from '../../data/elt';
import { SelectionService } from '../../services/selection.service';
import { Attr } from '../../data/attr';
import { faPlusSquare, faMinusSquare, faSlash, faTimesCircle, faHighlighter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrayComponent extends AbstractNodeComponent implements OnInit {
  @Input() nodes: Elt[];

  icons = { faPlusSquare, faMinusSquare, faSlash, faTimesCircle, faHighlighter };

  constructor(dataService: DataService, selectionService: SelectionService, readonly cdr: ChangeDetectorRef) {
    super(dataService, selectionService, cdr);
  }

  ngOnInit() {
    this.nodes.forEach((n: any) => {
      n.viewRef = this;
    });
  }

  getNodeName(): string {
    if (!this.nodes) {
      return null;
    }
    return this.nodes[0].name;
  }

  getNodeLen(): number {
    if (!this.nodes) {
      return 0;
    }
    return this.nodes.length;
  }

  isCollapsed(): boolean {
    if (!this.nodes) {
      return false;
    }
    return this.nodes[0].collapsed;
  }

  isText(): boolean {
    if (!this.nodes) {
      return false;
    }
    return this.nodes[0].isText;
  }

  getAttributeNames(): Set<String> {
    if (!this.nodes) {
      return new Set();
    }
    return this.nodes[0].attributeNames;
  }

  getChildrenNames(): Set<String> {
    if (!this.nodes) {
      return new Set();
    }
    return this.nodes[0].childrenNames;
  }

  onNodeClick(event: Event) {
    event.stopPropagation();
    return false;
  }

  onSubNodeClick(event: Event, node: Elt) {
    event.stopPropagation();
    this.selectionService?.selectedFile?.selection?.element?.viewRef?.cdr?.markForCheck();
    this.selectionService.selectNode(node, this);
    this.cdr.markForCheck();
  }

  show(event: Event) {
    this.nodes[0].collapsed = false;
  }

  hide(event: Event) {
    this.nodes[0].collapsed = true;
  }

  getAttrList(node: Elt): Attr[] {
    const attrNames = this.nodes[0].attributeNames;
    if (!attrNames) {
      return [];
    }
    return Array.from(attrNames).map((attrName) => {
      return Object.values(node.attributes).find((attr) => attr.name === attrName);
    });
  }

  getChildNodes(node: Elt): Elt[][] {
    const tagNames = this.nodes[0].childrenNames;
    let ret: Elt[][] = [];
    tagNames.forEach((tagName) => {
      ret = ret.concat([this.getChildNodesByTagname(node, tagName)]);
    });
    return ret;
  }

  getChildNodesByTagname(node: Elt, tagName: string): Elt[] {
    const children = Object.values(node.children);
    for (let i = 0; i < children.length; i++) {
      const arr = children[i];
      if (arr[0].name === tagName) {
        return arr;
      }
    }
  }
}
