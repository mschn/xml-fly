import { Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Elt } from '../../data/elt';
import { SelectionService } from '../../services/selection.service';

@Component({
  selector: 'app-abstract-node',
  template: '',
})
export class AbstractNodeComponent {
  @ViewChild('anchor') nodeRef: ElementRef;

  constructor(
    protected dataService: DataService,
    protected selectionService: SelectionService,
    readonly cdr: ChangeDetectorRef
  ) {}

  onAttrClick(event: Event, attr: Attr, node: Elt) {
    event.stopPropagation();
    this.selectionService?.selectedFile?.selection?.element?.viewRef?.cdr?.markForCheck();
    this.selectionService.selectAttr(attr, node, this);
    this.cdr.markForCheck();
  }

  scrollIfNeeded() {
    // TODO dont scroll when already in view

    const elt = this.nodeRef.nativeElement;
    const rect = elt.getBoundingClientRect();
    if (rect.bottom > window.innerHeight) {
      elt.scrollIntoView();
    }
    if (rect.top < 0) {
      elt.scrollIntoView();
    }
  }

  hasNodeHighlight(node: Elt): boolean {
    return node.highlights && node.highlights.node != null;
  }

  hasAttrHighlight(node: Elt, attr: Attr): boolean {
    return node.highlights && node.highlights.attrs[attr.name] != null;
  }

  highlightFocusOut(event, node: Elt) {
    node.highlights.node = event.target.innerText;
  }

  highlightFocusAttrOut(event, node: Elt, attr: Attr) {
    node.highlights.attrs[attr.name] = event.target.innerText;
  }
}
