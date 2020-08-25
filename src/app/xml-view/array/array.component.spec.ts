import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayComponent } from './array.component';
import { Elt } from 'src/app/data/elt';

describe('ArrayComponent', () => {
  let component: ArrayComponent;
  let fixture: ComponentFixture<ArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArrayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayComponent);
    component = fixture.componentInstance;
    component.nodes = [new Elt()];
    component.nodes[0].childrenNames = new Set();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
