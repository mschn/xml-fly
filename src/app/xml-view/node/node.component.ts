import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractNodeComponent } from '../abstract-node/abstract-node.component';
import { DataService } from 'src/app/data.service';
import { Elt } from 'src/app/model';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']

})
export class NodeComponent extends AbstractNodeComponent implements OnInit {

  @Input() node: Elt;

  @Input() noTagName = false;

  @Input() arrayInParent = false;

  constructor(dataService: DataService) {
    super(dataService);
   }


  show(event: Event) {
    (this.node as any).collapsed = false;
  }

  hide(event: Event) {
    (this.node as any).collapsed = true;
  }


  ngOnInit() {
    if (this.arrayInParent) {
      (this.node as any).collapsed = true;
    }
  }

  onNodeClick(event: Event) {
    event.stopPropagation();
    if (this.node.isText) {
      this.dataService.selectNode(this.node, this);
    }
  }

}
