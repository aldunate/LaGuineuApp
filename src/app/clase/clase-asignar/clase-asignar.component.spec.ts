import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaseAsignarComponent } from './clase-asignar.component';

describe('ClaseAsignarComponent', () => {
  let component: ClaseAsignarComponent;
  let fixture: ComponentFixture<ClaseAsignarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaseAsignarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaseAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
