import { Component, OnInit, Input } from '@angular/core';
import { Elt } from '../model';
import { XmlFile } from 'out/xml-fly-win32-ia32/resources/app/src/app/model';

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
