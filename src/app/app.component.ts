import { Component, OnInit } from '@angular/core';
import { XmlFile } from './model';
import { DataService } from './data.service';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  files: Array<XmlFile>;

  loading = false;

  searchVisible = false;
  searchText = '';

  constructor(private dataService: DataService, private hotkeysService: HotkeysService) {}

  ngOnInit() {
    this.dataService.getFiles().subscribe((files) => (this.files = files));

    this.hotkeysService.add(
      new Hotkey('ctrl+w', (event: KeyboardEvent): boolean => {
        this.closeFile();
        return false;
      })
    );
    this.hotkeysService.add(
      new Hotkey('ctrl+o', (event: KeyboardEvent): boolean => {
        const btn = document.querySelector('#open-file') as HTMLElement;
        btn.click();
        return false;
      })
    );
    this.dataService.isLoading.subscribe(loading => this.loading = loading);
  }

  dragFalse() {
    return false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files) {
      this.dataService.isLoading.next(true);
      const file = event.dataTransfer.files[0];
      setTimeout(() => {
        this.dataService.openFile(file).then(() => {
          this.dataService.isLoading.next(false);
        });
      });
    }
    return false;
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
