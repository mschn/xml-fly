import { Elt } from './elt';
import { Selection } from './selection';

export class XmlFile {
  name: string;
  selected: boolean;
  xmlFileContent: string;
  selection: Selection = new Selection();
  tree: Elt;

  select() {
    this.selected = true;
  }

  deselect() {
    this.selected = false;
  }

}
