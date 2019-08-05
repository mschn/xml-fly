import { AbstractNodeComponent } from './xml-view/abstract-node/abstract-node.component';

export class XmlFile {
    name: string;
    selected: boolean;
    xmlFileContent: string;
    selectedNode: Elt;
    tree: Elt;
}

export class Selection {
    type: 'Node' | 'Attr';
    path: string[];
    value: string;
    element: Elt;
    node: AbstractNodeComponent;
}

export class Elt {
    /** parent in XML tree */
    parent: Elt;
    /** XML tag name */
    name: string;
    /** XML attributes */
    attributes: Attr[];
    /** Children in XML tree, grouped by tag name */
    children: Elt[][];
    /** Unique tag names of children in XML tree */
    childrenNames: Set<string>;
    /** Unique attribute names */
    attributeNames: Set<string>;
    /** Full text content if text node */
    text: string;
    /** Shortened text content if text node */
    shortText: string;
    /** True if text node */
    isText: boolean;
    /** True if node should be collapsed */
    collapsed: boolean;
    /** Reference to the view component displaying this node */
    viewRef: any;
}

export class Attr {
    name: string;
    value: string;
}

export class SearchResult {
    elt: Elt;
    attr?: Attr;
}
