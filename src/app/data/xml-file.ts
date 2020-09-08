import { Elt } from './elt';
import { Selection } from './selection';
import { SearchResult } from './search-result';

export class XmlFile {
  name: string;
  selected: boolean;
  xmlFileContent: string;
  selection: Selection = new Selection();
  tree: Elt;

  searchVisible = false;
  searchText: string;
  searchResults: SearchResult[];
}
