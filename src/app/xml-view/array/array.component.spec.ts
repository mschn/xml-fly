import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { ArrayComponent } from './array.component';
import { Elt } from 'src/app/data/elt';
import { NodeComponent } from '../node/node.component';
import { XmlService } from '../../services/xml.service';
import { uneven_xml, uneven_xml2 } from '../../mock/uneven.xml';

describe('ArrayComponent', () => {
  let component: ArrayComponent;
  let fixture: ComponentFixture<ArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArrayComponent, NodeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayComponent);
    component = fixture.componentInstance;
    component.nodes = [new Elt()];
    component.nodes[0].childrenNames = new Set();
    fixture.detectChanges();
  });

  it('displays uneven xml array', async () => {
    const service: XmlService = TestBed.inject(XmlService);
    await service.parseFile(uneven_xml).then((elt) => {
      component.nodes = Object.values(elt.children)[0];
    });

    fixture.detectChanges();

    const arr = document.querySelectorAll('[data-array=entry]');
    expect(arr.length).toEqual(1);
    expect(arr[0]).toBeDefined();
    expect(arr[0].querySelector('.array-len').textContent.trim()).toEqual('(4)');

    const ths = arr[0].querySelectorAll('th');
    expect(ths.length).toEqual(4);
    expect(ths[0].textContent).toEqual('');
    expect(ths[1].textContent).toEqual('<aaa>');
    expect(ths[2].textContent).toEqual('<bbb>');
    expect(ths[3].textContent).toEqual('<ccc>');

    const trs = arr[0].querySelectorAll('tr');
    expect(trs.length).toEqual(5);

    const td0 = trs[1].querySelectorAll('td');
    expect(td0.length).toEqual(4);
    expect(td0[0].textContent.trim()).toEqual('0.');
    expect(td0[1].textContent.trim()).toEqual('<aaa>');
    expect(td0[2].textContent.trim()).toEqual('');
    expect(td0[3].textContent.trim()).toEqual('');

    const td1 = trs[2].querySelectorAll('td');
    expect(td1.length).toEqual(4);
    expect(td1[0].textContent.trim()).toEqual('1.');
    expect(td1[1].textContent.trim()).toEqual('');
    expect(td1[2].textContent.trim()).toEqual('<bbb>');
    expect(td1[3].textContent.trim()).toEqual('');

    const td2 = trs[3].querySelectorAll('td');
    expect(td2.length).toEqual(4);
    expect(td2[0].textContent.trim()).toEqual('2.');
    expect(td2[1].textContent.trim()).toEqual('<aaa>');
    expect(td2[2].textContent.trim()).toEqual('<bbb>');
    expect(td2[3].textContent.trim()).toEqual('');

    const td3 = trs[4].querySelectorAll('td');
    expect(td3.length).toEqual(4);
    expect(td3[0].textContent.trim()).toEqual('3.');
    expect(td3[1].textContent.trim()).toEqual('');
    expect(td3[2].textContent.trim()).toEqual('');
    expect(td3[3].textContent.trim()).toEqual('<ccc>');
  });

  it('displays uneven xml attributes', async () => {
    const service: XmlService = TestBed.inject(XmlService);
    await service.parseFile(uneven_xml2).then((elt) => {
      component.nodes = Object.values(elt.children)[0];
    });
    fixture.detectChanges();

    const arr = document.querySelectorAll('[data-array=Actor]');
    expect(arr.length).toEqual(1);
    expect(arr[0]).toBeDefined();
    expect(arr[0].querySelector('.array-len').textContent.trim()).toEqual('(3)');

    const ths = arr[0].querySelectorAll('th');
    expect(ths.length).toEqual(9);
    expect(ths[0].textContent.trim()).toEqual('');
    expect(ths[1].textContent.trim()).toEqual('DateOfBirth');
    expect(ths[2].textContent.trim()).toEqual('ID');
    expect(ths[3].textContent.trim()).toEqual('internal');
    expect(ths[4].textContent.trim()).toEqual('type');
    expect(ths[5].textContent.trim()).toEqual('roles');
    expect(ths[6].textContent.trim()).toEqual('ref');
    expect(ths[7].textContent.trim()).toContain('<Name>');
    expect(ths[8].textContent.trim()).toContain('<Contact>');

    const trs = arr[0].querySelectorAll('tr');
    expect(trs.length).toEqual(4);

    const td0 = trs[1].querySelectorAll('td');
    expect(td0.length).toEqual(9);
    expect(td0[0].textContent.trim()).toEqual('0.');
    expect(td0[1].textContent.trim()).toEqual('1970-03-10');
    expect(td0[2].textContent.trim()).toEqual('1');
    expect(td0[3].textContent.trim()).toEqual('zzz:1');
    expect(td0[4].textContent.trim()).toEqual('adult');
    expect(td0[5].textContent.trim()).toEqual('person');
    expect(td0[6].textContent.trim()).toEqual('');
    expect(td0[7].textContent.trim()).toContain('<Name>');
    expect(td0[8].textContent.trim()).toEqual('');

    const td1 = trs[2].querySelectorAll('td');
    expect(td1.length).toEqual(9);
    expect(td1[0].textContent.trim()).toEqual('1.');
    expect(td1[1].textContent.trim()).toEqual('2019-03-10');
    expect(td1[2].textContent.trim()).toEqual('2');
    expect(td1[3].textContent.trim()).toEqual('');
    expect(td1[4].textContent.trim()).toEqual('child');
    expect(td1[5].textContent.trim()).toEqual('');
    expect(td1[6].textContent.trim()).toEqual('1');
    expect(td1[7].textContent.trim()).toContain('<Name>');
    expect(td1[8].textContent.trim()).toContain('<Contact>');
  });
});
