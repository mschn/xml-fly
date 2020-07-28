import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  loading = false;

  constructor(private dataService: DataService, private hotkeysService: HotkeysService) {}

  ngOnInit(): void {
    this.hotkeysService.add(
      new Hotkey('ctrl+f', (event: KeyboardEvent): boolean => {
        this.showSearch(true);
        return false;
      })
    );
    this.dataService.isLoading.subscribe(loading => this.loading = loading);
  }

  openFile(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.dataService.isLoading.next(true);

      const file = target.files[0];
      setTimeout(() => {
        this.dataService.openFile(file).then(() => {
          this.dataService.isLoading.next(false);
        });
      });
    }
  }

  showSearch(enable: boolean) {
    this.dataService.setSearchVisible(enable);
  }

  expandAll() {
    this.dataService.expandAll();
  }

  collapseAll() {
    this.dataService.collapseAll();
  }
}
