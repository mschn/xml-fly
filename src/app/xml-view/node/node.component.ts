import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractNodeComponent } from '../abstract-node/abstract-node.component';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']

})
export class NodeComponent extends AbstractNodeComponent implements OnInit {

  @Input() node: Node;

  @Input() noTagName = false;

  @Input() arrayInParent = false;

  constructor(dataService: DataService) {
    super(dataService);
   }

  ngOnInit() {
    if (this.arrayInParent) {
      this.collapsed = true;
    }
  }

  isTextNode(): boolean {
    return super.isTextNode(this.node);
  }

  onNodeClick(event: Event) {
    event.stopPropagation();
    if (this.isTextNode()) {
      this.dataService.selectNode(this.node);
    }
  }

  onAttrClick(event: Event, attr: Attr) {
    event.stopPropagation();
    this.dataService.selectAttr(attr, this.node);
  }

}
