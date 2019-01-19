import { Component, OnInit, Input } from '@angular/core';
import { AbstractNodeComponent } from '../abstract-node/abstract-node.component';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss']
})
export class ArrayComponent extends AbstractNodeComponent implements OnInit  {

  @Input() nodes: Node[];

  constructor(dataService: DataService) {
    super(dataService);
   }

  ngOnInit() {
    super.ngOnInit();
  }

}
