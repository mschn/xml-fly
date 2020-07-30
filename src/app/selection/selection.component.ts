import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { XmlFile } from '../data/xml-file';
import { Selection } from '../data/selection';
import { SelectionService } from '../services/selection.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss'],
})
export class SelectionComponent implements OnInit {
  @Input() node: XmlFile;

  selection: Selection;

  constructor(private readonly dataService: DataService,
    private readonly selectionService: SelectionService) {}

  ngOnInit() {
    this.selection = this.node.selection;
  }

  selectNode(index: number) {
    let n = this.selection.element;
    let len = this.selection.path.length - 1 - index;
    if (len === 0) {
      return;
    }
    if (this.selection.type === 'Attr') {
      len -= 1;
    }
    for (let i = 0; i < len; i++) {
      n = n.parent;
    }
    this.selectionService.selectNode(n, n.viewRef);
  }

  close() {
    this.selectionService.clearSelection();
  }
}
