import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { XmlFile } from '../model';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {

  file: XmlFile;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getSelectedFile().subscribe(file => {
      this.file = file;
    });
  }

  getNodePath(node: Node): Node[] {
    const ret = [];
    if (!node) {
      return ret;
    }
    let curNode = node;
    while (curNode.parentNode) {
      ret.push((curNode as Element).tagName);
      curNode = curNode.parentNode;
    }
    return ret.reverse();
  }

}
