import { TestBed } from '@angular/core/testing';

import { XmlService } from './xml.service';

describe('XmlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XmlService = TestBed.inject(XmlService);
    expect(service).toBeTruthy();
  });
});
