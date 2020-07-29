import { Elt } from './elt';
import { AbstractNodeComponent } from '../xml-view/abstract-node/abstract-node.component';

export class Selection {
  type: 'Node' | 'Attr';
  path: string[];
  value: string;
  element: Elt;
  node: AbstractNodeComponent;
}
