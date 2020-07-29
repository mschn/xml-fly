import { Component, OnInit, Input } from '@angular/core';
import { Elt } from '../data/elt';
import { XmlFile } from '../data/xml-file';

@Component({
  selector: 'app-xml-view',
  templateUrl: './xml-view.component.html',
  styleUrls: ['./xml-view.component.css']
})
export class XmlViewComponent implements OnInit {

  elt: Elt;

  parserError: string;

  @Input() file: XmlFile;

  constructor() { }

  ngOnInit() {
  }

}
