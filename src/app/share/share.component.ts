import { Component, OnInit } from '@angular/core';
import { EncodeService } from '../services/encode.service';
import { XmlFile } from '../data/xml-file';
import { DataService } from '../services/data.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css'],
})
export class ShareComponent implements OnInit {
  selectedFile: XmlFile;

  encodedUrl: string;

  constructor(
    private readonly encodeService: EncodeService,
    private readonly dataService: DataService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.dataService.selectedFile.subscribe((selectedFile) => (this.selectedFile = selectedFile));
    this.encodeService.encode(this.selectedFile).then((encoded) => {
      this.encodedUrl = `${window.location.origin}/?f=${encoded}`;
    });
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 B';
    }
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
