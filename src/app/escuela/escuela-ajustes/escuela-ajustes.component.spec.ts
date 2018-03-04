import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscuelaAjustesComponent } from './escuela-ajustes.component';

describe('EscuelaAjustesComponent', () => {
  let component: EscuelaAjustesComponent;
  let fixture: ComponentFixture<EscuelaAjustesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscuelaAjustesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscuelaAjustesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
