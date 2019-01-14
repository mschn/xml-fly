import { Component, OnInit, Input } from '@angular/core';
import { AbstractNodeComponent } from '../abstract-node/abstract-node.component';

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss']
})
export class ArrayComponent extends AbstractNodeComponent implements OnInit  {

  @Input() nodes: Node[];

  constructor() {
    super();
   }

  ngOnInit() {
    super.ngOnInit();
  }

}
