import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { FileService } from './services/file.service';
import { XmlFile } from './data/xml-file';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  files: Array<XmlFile>;

  loading = false;
  selectedFile: XmlFile;
  searchVisible = false;
  searchText = '';

  constructor(
    private dataService: DataService,
    private readonly fileService: FileService
  ) {}

  ngOnInit() {
    this.dataService.getFiles().subscribe((files) => this.files = files);
    this.dataService.isLoading.subscribe((loading) => this.loading = loading);
    this.dataService.getSelectedFile().subscribe((selectedFile) => this.selectedFile = selectedFile);
  }

  dragFalse() {
    return false;
  }

  onDrop(event: DragEvent) {
    this.fileService.openFileDrop(event);
  }

  selectFile(file: XmlFile) {
    this.dataService.selectFile(file);
  }

  closeFile(file?: XmlFile) {
    this.dataService.closeFile(file);
  }

  hasFile(): boolean {
    return this.files && this.files.length > 0;
  }
}
