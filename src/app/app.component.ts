import { Component, OnInit } from '@angular/core';
import { XmlFile } from './model';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  files: Array<XmlFile>;

  loading = false;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getFiles().subscribe(files => this.files = files);
  }

  openFile(event: Event) {
    this.loading = true;
    this.dataService.openFile(event).then(_ => this.loading = false);
  }

  selectFile(file: XmlFile) {
    this.dataService.selectFile(file);
  }

}
