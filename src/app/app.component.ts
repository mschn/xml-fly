import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { FileService } from './services/file.service';
import { XmlFile } from './data/xml-file';
import { SelectionService } from './services/selection.service';
import { EncodeService } from './services/encode.service';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
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
  error: string;

  icons = { faWindowClose };

  constructor(
    private readonly dataService: DataService,
    private readonly selectionService: SelectionService,
    private readonly fileService: FileService,
    private readonly encodeService: EncodeService
  ) { }

  ngOnInit() {
    this.dataService.files.subscribe((files) => (this.files = files));
    this.dataService.isLoading.subscribe((loading) => (this.loading = loading));
    this.dataService.selectedFile.subscribe((selectedFile) => (this.selectedFile = selectedFile));

    this.loadUrlFile();
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

  dismissError() {
    this.error = null;
  }

  loadUrlFile() {
    if (window.location.search.length > 1) {
      const params = new URL(document.location.toString()).searchParams;
      if (params.has('f')) {
        this.encodeService
          .decode(params.get('f'))
          .then((f) => {
            f.name = '#URL';
            this.fileService.doOpen(f);
          })
          .catch((err) => {
            this.error = `Failed to load file from URL parameter: ${err}`;
          });
      }
    }
  }
}
