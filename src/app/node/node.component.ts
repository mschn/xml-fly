import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractNodeComponent } from '../abstract-node/abstract-node.component';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']

})
export class NodeComponent extends AbstractNodeComponent implements OnInit {

  @Input() node: Node;

  @Input() noTagName = false;

  @Input() arrayInParent = false;

  ngOnInit() {
    if (this.arrayInParent) {
      this.collapsed = true;
    }
  }

  isTextNode(): boolean {
    return super.isTextNode(this.node);
  }
}
