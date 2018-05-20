import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscuelaPersonalComponent } from './escuela-personal.component';

describe('EscuelaPersonalComponent', () => {
  let component: EscuelaPersonalComponent;
  let fixture: ComponentFixture<EscuelaPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscuelaPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscuelaPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
