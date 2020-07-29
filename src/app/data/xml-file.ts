import { Elt } from './elt';
import { Selection } from './selection';

export class XmlFile {
  name: string;
  selected: boolean;
  xmlFileContent: string;
  selection: Selection;
  tree: Elt;
}
