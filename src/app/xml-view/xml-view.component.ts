import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { XmlFile } from '../data/xml-file';

@Component({
  selector: 'app-xml-view',
  templateUrl: './xml-view.component.html',
  styleUrls: ['./xml-view.component.css']
})
export class XmlViewComponent implements OnInit {

  @Input() file: XmlFile;

  constructor() { }

  ngOnInit() {
  }

}
