import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Selection, XmlFile } from '../model';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

  @Input() node: XmlFile;

  selection: Selection;

  constructor(private dataService: DataService) { }

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
    this.dataService.selectNode(n, n.viewRef);
  }

  close() {
    this.dataService.clearSelection();
  }
}
