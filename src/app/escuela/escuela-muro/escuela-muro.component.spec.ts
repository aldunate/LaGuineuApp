import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscuelaMuroComponent } from './escuela-muro.component';

describe('EscuelaMuroComponent', () => {
  let component: EscuelaMuroComponent;
  let fixture: ComponentFixture<EscuelaMuroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscuelaMuroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscuelaMuroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
