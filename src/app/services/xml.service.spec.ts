import { TestBed } from '@angular/core/testing';

import { XmlService } from './xml.service';
import { uneven_xml } from '../mock/uneven.xml';

describe('XmlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('handles uneven array', () => {
    const service: XmlService = TestBed.inject(XmlService);
    const xmlFile = uneven_xml;
    const elt = service.parseFile(xmlFile);

    expect(elt.name).toEqual('array');
    expect(elt.children.length).toEqual(1);
    expect(elt.children[0].length).toEqual(4);
    expect(elt.childrenNames).toEqual(new Set(['entry']));

    expect(elt.children[0][0].childrenNames).toEqual(new Set(['aaa','bbb','ccc']));
  });
});
