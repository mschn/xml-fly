import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { AbstractNodeComponent } from '../abstract-node/abstract-node.component';
import { DataService } from 'src/app/data.service';
import { Elt } from 'src/app/model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']

})
export class NodeComponent extends AbstractNodeComponent implements OnInit {
  
  @Input() node: Elt;

  @Input() noTagName = false;

  @Input() arrayInParent = false;

  subs: Subscription[] = [];

  constructor(dataService: DataService) {
    super(dataService);
  }

  show(event: Event) {
    this.node.collapsed = false;
  }

  hide(event: Event) {
    this.node.collapsed = true;
  }

  ngOnInit() {
    this.node.viewRef = this;
    if (this.arrayInParent) {
      this.node.collapsed = true;
    }
  }

  onNodeClick(event: Event) {
    event.stopPropagation();
    this.dataService.selectNode(this.node, this);
  }

}
