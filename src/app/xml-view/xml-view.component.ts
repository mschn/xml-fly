import { Component, OnInit, Input } from '@angular/core';
import { Elt, Attr } from '../model';
import { XmlService } from '../xml.service';

@Component({
  selector: 'app-xml-view',
  templateUrl: './xml-view.component.html',
  styleUrls: ['./xml-view.component.css']
})
export class XmlViewComponent implements OnInit {

  elt: Elt;

  parserError: string;

  @Input() set xmlString (value: string) {
    const parser = new DOMParser();
    const document = parser.parseFromString(value, 'application/xml');
    const parsererror = document.querySelector('html body parsererror div');
    if (parsererror) {
      this.parserError = parsererror.textContent;
    } else {
      this.parserError =  null;
    }
    this.elt = this.xmlService.buildTree(document);
  }

  constructor(private xmlService: XmlService) { }

  ngOnInit() {
  }
}
