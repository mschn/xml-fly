import { Component, OnInit } from '@angular/core';
import { XmlFile } from './model';
import { DataService } from './data.service';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  files: Array<XmlFile>;

  loading = false;

  searchVisible = false;
  searchText = '';

  constructor(
    private dataService: DataService,
    private hotkeysService: HotkeysService
  ) {}

  ngOnInit() {
    this.dataService.getFiles().subscribe(files => this.files = files);

    this.hotkeysService.add(new Hotkey('ctrl+w', (event: KeyboardEvent): boolean => {
      this.closeFile();
      return false;
    }));
    this.hotkeysService.add(new Hotkey('ctrl+o', (event: KeyboardEvent): boolean => {
      const btn = document.querySelector('#open-file') as HTMLElement;
      btn.click();
      return false;
    }));
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

  closeFile(file?: XmlFile) {
    this.dataService.closeFile(file);
  }

  showSearch(enable: boolean) {
    this.dataService.setSearchVisible(true);
  }

  expandAll() {
    this.dataService.expandAll();
  }

  collapseAll() {
    this.dataService.collapseAll();
  }

  hasFile(): boolean {
    return this.files && this.files.length > 0;
  }
}
