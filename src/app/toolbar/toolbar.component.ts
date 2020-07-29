import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  loading = false;

  constructor(private readonly dataService: DataService, private readonly fileService: FileService) {}

  ngOnInit(): void {
    this.dataService.isLoading.subscribe((loading) => (this.loading = loading));
  }

  openFile(event: Event) {
    this.fileService.openFileInput(event);
  }

  showSearch(enable: boolean) {
    this.dataService.setSearchVisible(enable);
  }

  goHome() {
    this.dataService.deselectFile();
  }

  expandAll() {
    this.dataService.expandAll();
  }

  collapseAll() {
    this.dataService.collapseAll();
  }
}
