import { AbstractNodeComponent } from './xml-view/abstract-node/abstract-node.component';

export class XmlFile {
    name: string;
    selected: boolean;
    xmlFileContent: string;
    selectedNode: Elt;
}

export class Selection {
    type: 'Node' | 'Attr';
    path: string[];
    value: string;
    node: AbstractNodeComponent;
}

export class Elt {
    parent: Elt;
    name: string;
    attributes: Attr[];
    children: Elt[][];
    childrenNames: Set<string>;
    attributeNames: Set<string>;
    text: string;
    shortText: string;
    isText: boolean;
}

export class Attr {
    name: string;
    value: string;
}
