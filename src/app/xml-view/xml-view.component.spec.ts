import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlViewComponent } from './xml-view.component';
import { XmlFile } from '../data/xml-file';
import { NodeComponent } from './node/node.component';
import { ArrayComponent } from './array/array.component';
import { SelectionComponent } from '../selection/selection.component';
import { Elt } from '../data/elt';

describe('XmlViewComponent', () => {
  let component: XmlViewComponent;
  let fixture: ComponentFixture<XmlViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [XmlViewComponent, NodeComponent, ArrayComponent, SelectionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XmlViewComponent);
    component = fixture.componentInstance;
    component.file = new XmlFile();
    component.file.tree = new Elt();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
