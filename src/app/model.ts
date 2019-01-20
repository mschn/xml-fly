export class XmlFile {
    name: string;
    selected: boolean;
    xmlFileContent: string;
    selectedNode: Node;
}

export class Selection {
    type: 'Node' | 'Attr';
    path: string[];
    value: string;
}
