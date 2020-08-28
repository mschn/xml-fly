import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FileService } from '../services/file.service';
import { SelectionService } from '../services/selection.service';
import { XmlFile } from '../data/xml-file';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShareComponent } from '../share/share.component';
import { faFolderPlus, faShareAlt, faSearch, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  loading = false;
  selectedFile: XmlFile;

  icons = { faFolderPlus, faShareAlt, faSearch, faPlusSquare, faMinusSquare };

  constructor(
    private readonly dataService: DataService,
    private readonly selectionService: SelectionService,
    private readonly fileService: FileService,
    private readonly modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.dataService.isLoading.subscribe((loading) => (this.loading = loading));
    this.dataService.selectedFile.subscribe((selectedFile) => (this.selectedFile = selectedFile));
  }

  openFile(event: Event) {
    this.fileService.openFileInput(event);
  }

  share() {
    this.modalService.open(ShareComponent);
  }

  showSearch(enable: boolean) {
    this.dataService.setSearchVisible(enable);
  }

  goHome() {
    this.selectionService.deselectFile();
  }

  expandAll() {
    this.selectedFile.tree.toggleAll(false);
  }

  collapseAll() {
    this.selectedFile.tree.toggleAll(true);
  }
}
