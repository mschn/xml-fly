import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { FileService } from './services/file.service';
import { XmlFile } from './data/xml-file';
import { SelectionService } from './services/selection.service';

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
    private readonly dataService: DataService,
    private readonly selectionService: SelectionService,
    private readonly fileService: FileService
  ) {}

  ngOnInit() {
    this.dataService.files.subscribe((files) => (this.files = files));
    this.dataService.isLoading.subscribe((loading) => (this.loading = loading));
    this.dataService.selectedFile.subscribe((selectedFile) => (this.selectedFile = selectedFile));
  }

  dragFalse() {
    return false;
  }

  onDrop(event: DragEvent) {
    this.fileService.openFileDrop(event);
  }

  selectFile(file: XmlFile) {
    this.selectionService.selectFile(file);
  }

  closeFile(file?: XmlFile) {
    this.selectionService.closeFile(file);
  }

  hasFile(): boolean {
    return this.files && this.files.length > 0;
  }
}
