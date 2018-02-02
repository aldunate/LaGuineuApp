import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEscuelaComponent } from './gestion-escuela.component';

describe('GestionEscuelaComponent', () => {
  let component: GestionEscuelaComponent;
  let fixture: ComponentFixture<GestionEscuelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionEscuelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionEscuelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
