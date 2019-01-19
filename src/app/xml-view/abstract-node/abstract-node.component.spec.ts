import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractNodeComponent } from './abstract-node.component';

describe('AbstractNodeComponent', () => {
  let component: AbstractNodeComponent;
  let fixture: ComponentFixture<AbstractNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbstractNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
