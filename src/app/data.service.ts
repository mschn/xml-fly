import { Injectable } from '@angular/core';
import { XmlFile, Selection, Elt, SearchResult } from './model';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { AbstractNodeComponent } from './xml-view/abstract-node/abstract-node.component';
import { XmlService } from './xml.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  files: Array<XmlFile> = new Array<XmlFile>();
  selectedFile: XmlFile;

  selection: Selection = new Selection();

  searchVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  searchText: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  searchResults: BehaviorSubject<SearchResult[]> = new BehaviorSubject<SearchResult[]>(null);

  constructor(
    private readonly xmlService: XmlService
  ) {}

  getSearchVisible(): Observable<boolean> {
    return this.searchVisible.asObservable();
  }
  setSearchVisible(visible: boolean) {
    this.searchVisible.next(visible);
  }

  setSearchText(text: string) {
    this.searchText.next(text);
  }
  getSearchTextValue(): string {
    return this.searchText.value;
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

    this.expandParent(node);
    this.scrollIfNeeded(source);
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

  clearSelection() {
    if (this.selection && this.selection.node) {
      this.selection.node.selected = false;
    }
    this.selection.type = null;
    this.selection.path = null;
    this.selection.value = null;
    this.selection.element = null;
    this.selection.node = null;
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

    this.selection.node = null;
    this.selection.type = null;
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

  private expandParent(node: Elt) {
    if (node.parent) {
      node.parent.collapsed = false;
      this.expandParent(node.parent);
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

  private scrollIfNeeded(node: AbstractNodeComponent) {
    const elt = node.nodeRef.nativeElement;

    var rect = elt.getBoundingClientRect();
    if (rect.bottom > window.innerHeight) {
      elt.scrollIntoView();
    }
    if (rect.top < 0) {
      elt.scrollIntoView();
    } 
  }
}
