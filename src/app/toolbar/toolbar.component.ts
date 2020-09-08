import { Component, Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { FileService } from '../services/file.service';
import { SelectionService } from '../services/selection.service';
import { XmlFile } from '../data/xml-file';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShareComponent } from '../share/share.component';
import { faFolderPlus, faShareAlt, faSearch, faPlusSquare, faMinusSquare, faHighlighter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() loading = false;
  @Input() selectedFile: XmlFile;

  icons = { faFolderPlus, faShareAlt, faSearch, faPlusSquare, faMinusSquare, faHighlighter };

  constructor(
    private readonly dataService: DataService,
    private readonly selectionService: SelectionService,
    private readonly fileService: FileService,
    private readonly modalService: NgbModal
  ) { }

  openFile(event: Event) {
    this.fileService.openFileInput(event);
  }

  share() {
    this.modalService.open(ShareComponent);
  }

  showSearch(enable: boolean) {
    this.selectionService.showSearch();
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

  highlight() {
    this.selectionService.highlightSelection();
  }
}
