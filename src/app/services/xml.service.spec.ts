import { TestBed } from '@angular/core/testing';

import { XmlService } from './xml.service';
import { uneven_xml } from '../mock/uneven.xml';

describe('XmlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('handles uneven array', (done) => {
    const service: XmlService = TestBed.inject(XmlService);
    const xmlFile = uneven_xml;
    service.parseFile(xmlFile).then((elt) => {
      const children = Object.values(elt.children);

      expect(elt.name).toEqual('array');
      expect(Object.values(elt.children).length).toEqual(1);
      expect(children[0].length).toEqual(4);
      expect(elt.childrenNames).toEqual(new Set(['entry']));
      expect(children[0][0].childrenNames).toEqual(new Set(['aaa', 'bbb', 'ccc']));
      done();
    });
  });
});
