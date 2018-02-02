import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAdolfoComponent } from './table-adolfo.component';

describe('TableAdolfoComponent', () => {
  let component: TableAdolfoComponent;
  let fixture: ComponentFixture<TableAdolfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAdolfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAdolfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
