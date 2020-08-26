import { TestBed } from '@angular/core/testing';

import { EncodeService } from './encode.service';
import { uneven_xml2 } from '../mock/uneven.xml';
import { XmlFile } from '../data/xml-file';

describe('EncodeService', () => {
  let service: EncodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncodeService);
  });

  it('should be created', (done) => {
    const file = new XmlFile();
    file.xmlFileContent = uneven_xml2;

    service.encode(file).then((encoded) => {
      service.decode(encoded).then((decoded) => {
        expect(decoded.xmlFileContent.trim()).toEqual(uneven_xml2.trim());
        done();
      });
    });
  });
});
