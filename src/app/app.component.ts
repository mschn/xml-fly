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

  dragFalse() {
    return false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files) {
      this.loading = true;
      const file = event.dataTransfer.files[0];
      setTimeout(() => {
        this.dataService.openFile(file).then(() => this.loading = false);
      });
    }
    return false;
  }

  openFile(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.loading = true;
      const file = target.files[0];
      setTimeout(() => {
        this.dataService.openFile(file).then(() => this.loading = false);
      });
    }
  }

  selectFile(file: XmlFile) {
    this.dataService.selectFile(file);
  }

  closeFile(file: XmlFile) {
    this.dataService.closeFile(file);
  }
}
