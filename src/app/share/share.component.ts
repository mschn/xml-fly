import { Component, OnInit, OnDestroy } from '@angular/core';
import { EncodeService } from '../services/encode.service';
import { XmlFile } from '../data/xml-file';
import { DataService } from '../services/data.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faShareAlt, faExternalLinkAlt, faCopy } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css'],
})
export class ShareComponent implements OnInit, OnDestroy {
  selectedFile: XmlFile;
  selectionXml: string;
  radioModel: 'all' | 'selection' = 'all';
  fileName: string;
  encodedUrl: string;
  loading = false;
  icons = { faShareAlt, faExternalLinkAlt, faCopy };

  private subs = new Subscription();

  constructor(
    private readonly encodeService: EncodeService,
    private readonly dataService: DataService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.dataService.selectedFile.subscribe((selectedFile) => {
        this.selectedFile = selectedFile;
        if (selectedFile) {
          this.fileName = selectedFile.name;
          if (this.hasSelection()) {
            this.selectionXml = selectedFile.selection.element.toXmlString();
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  hasSelection(): boolean {
    if (!this.selectedFile) {
      return false;
    }
    if (this.selectedFile.selection.element === this.selectedFile.tree) {
      return false;
    }
    return this.selectedFile.selection.path != null;
  }

  getDocLen(): number {
    return this.selectedFile?.xmlFileContent?.length;
  }

  getSelectionPath(): string {
    return this.selectedFile?.selection?.path?.join('/');
  }

  getSelectionLen(): number {
    return this.selectionXml?.length;
  }

  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) {
      return '0 B';
    }
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  createLink() {
    this.loading = true;
    const file = new XmlFile();
    if (this.radioModel === 'all') {
      file.xmlFileContent = this.selectedFile.tree.toXmlString();
    } else {
      file.xmlFileContent = this.selectionXml;
    }
    file.name = this.fileName;

    this.encodeService.encode(file).then((encoded) => {
      this.encodedUrl = `${window.location.origin}/?f=${encoded}`;
      this.loading = false;
    });
  }

  copyUrl() {
    navigator?.clipboard.writeText(this.encodedUrl).then((_) => {});
  }
}
