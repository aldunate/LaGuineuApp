import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaEscuelaComponent } from './nueva-escuela.component';

describe('NuevaEscuelaComponent', () => {
  let component: NuevaEscuelaComponent;
  let fixture: ComponentFixture<NuevaEscuelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaEscuelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaEscuelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
