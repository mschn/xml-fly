import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { XmlFile, Selection } from '../model';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {

  selection: Selection;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getSelection().subscribe(selection => {
      this.selection = selection;
    });
  }
}
