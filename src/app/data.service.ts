import { Injectable } from '@angular/core';
import { XmlFile, Selection, Elt, SearchResult } from './model';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { AbstractNodeComponent } from './xml-view/abstract-node/abstract-node.component';
import { XmlService } from './xml.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  files: Array<XmlFile>;
  selectedFile: XmlFile;

  selection: Selection;

  searchVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  searchResults: BehaviorSubject<SearchResult[]> = new BehaviorSubject<SearchResult[]>(null);

  constructor(
    private readonly xmlService: XmlService
  ) {
    this.files = new Array<XmlFile>();
    this.selection = new Selection();
  }

  getSearchVisible(): Observable<boolean> {
    return this.searchVisible.asObservable();
  }
  setSearchVisible(visible: boolean) {
    this.searchVisible.next(visible);
  }

  getSearchResults(): Observable<SearchResult[]> {
    return this.searchResults.asObservable();
  }
  setSearchResults(res: SearchResult[]) {
    this.searchResults.next(res);
  }

  getFiles(): Observable<XmlFile[]> {
    return of(this.files);
  }

  getSelection(): Observable<Selection> {
    return of(this.selection);
  }

  openFile(file: File): Promise<{}> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const f = new XmlFile();
        f.name = file.name;
        f.selected = true;
        f.xmlFileContent = reader.result.toString();
        f.tree = this.xmlService.parseFile(f.xmlFileContent);

        const existingFile = this.findFile(f);
        if (existingFile) {
          this.selectFile(existingFile);
        } else {
          this.selectFile(f);
          this.files.push(f);
        }
        resolve();
      };
    });
  }

  selectFile(file: XmlFile): void {
    if (this.selectedFile) {
      this.selectedFile.selected = false;
    }
    file.selected = true;
    this.selection.type = null;
    this.selectedFile = file;
  }

  selectNode(node: Elt, source: AbstractNodeComponent): void {
    if (this.selection && this.selection.node) {
      this.selection.node.selected = false;
    }
    this.selection.type = 'Node';
    this.selection.path = this.getNodePath(node);
    this.selection.value = node.text;
    this.selection.element = node;
    this.selection.node = source;
    this.selection.node.selected = true;
    this.selection.node.selectedAttr = null;

    source.nodeRef.nativeElement.scrollIntoView();
  }

  selectAttr(attr: Attr, node: Elt, source: AbstractNodeComponent): void {
    if (this.selection && this.selection.node) {
      this.selection.node.selected = false;
    }
    this.selection.type = 'Attr';
    this.selection.path = this.getNodePath(node);
    this.selection.path.push(attr.name);
    this.selection.value = attr.value;
    this.selection.node = source;
    this.selection.element = node;
    this.selection.node.selected = true;
    this.selection.node.selectedAttr = attr;
  }

  closeFile(file?: XmlFile): void {
    if (!file) {
      file = this.selectedFile;
    }

    const idx = this.files.indexOf(file);
    if (idx > -1) {
      this.files.splice(idx, 1);
    }
    if (this.files.length > 0) {
      this.selectFile(this.files[0]);
    }
  }

  expandAll () {
    this.toggleAll(this.selectedFile.tree, false);
  }

  collapseAll () {
    this.toggleAll(this.selectedFile.tree, true);
  }

  toggleAll(node: Elt, state: boolean) {
    if (!node) {
      return;
    }
    node.collapsed = state;
    if (!node.children) {
      return;
    }
    for (let i = 0; i < node.children.length; i++) {
      for (let j = 0; j < node.children[i].length; j++) {
        this.toggleAll(node.children[i][j], state);
      }
    }
  }


  private getNodePath(node: Elt): string[] {
    const paths = [];
    let curNode = node;
    while (curNode.parent) {
      paths.push(curNode.name);
      curNode = curNode.parent;
    }
    return paths.reverse();
  }

  private findFile(file: XmlFile): XmlFile {
    for (const f of this.files) {
      if (file.xmlFileContent === f.xmlFileContent) {
        return f;
      }
    }
    return null;
  }
}
