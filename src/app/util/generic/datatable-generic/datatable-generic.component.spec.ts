import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableGenericComponent } from './datatable-generic.component';

describe('DatatableGenericComponent', () => {
  let component: DatatableGenericComponent;
  let fixture: ComponentFixture<DatatableGenericComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableGenericComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
