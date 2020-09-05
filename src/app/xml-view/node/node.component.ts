import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AbstractNodeComponent } from '../abstract-node/abstract-node.component';
import { DataService } from '../../services/data.service';
import { Elt } from '../../data/elt';
import { SelectionService } from '../../services/selection.service';
import { faPlusSquare, faMinusSquare, faHighlighter } from '@fortawesome/free-solid-svg-icons';
import { Attr } from '../../data/attr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeComponent extends AbstractNodeComponent implements OnInit, OnDestroy {

  @Input() node: Elt;
  @Input() noTagName = false;
  @Input() arrayInParent = false;

  searchText: string;

  icons = { faPlusSquare, faMinusSquare, faHighlighter };

  private subscriptions = new Subscription();

  constructor(readonly dataService: DataService, readonly selectionService: SelectionService, readonly cdr: ChangeDetectorRef) {
    super(dataService, selectionService, cdr);
    this.subscriptions.add(this.dataService.searchText.subscribe((searchText) => this.searchText = searchText));
  }

  ngOnInit() {
    this.node.viewRef = this;
    if (this.arrayInParent) {
      this.node.collapsed = true;
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getAttributes(): Attr[] {
    if (!this.node.attributes) {
      return [];
    }
    return Object.values(this.node.attributes);
  }

  getChildren(): Elt[][] {
    if (!this.node.children) {
      return [];
    }
    return Object.values(this.node.children);
  }

  show(event: Event) {
    this.node.collapsed = false;
  }

  hide(event: Event) {
    this.node.collapsed = true;
  }

  onNodeClick(event: Event): void {
    event.stopPropagation();
    this.selectionService?.selectedFile?.selection?.element?.viewRef?.cdr?.markForCheck();
    this.selectionService.selectNode(this.node, this);
    this.cdr.markForCheck();
  }

  getValue(value: string): string {
    return value.replace(this.searchText, `<span class="search-result">${this.searchText}</span>`);
  }
}
