import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaseNuevaComponent } from './clase-nueva.component';

describe('ClaseNuevaComponent', () => {
  let component: ClaseNuevaComponent;
  let fixture: ComponentFixture<ClaseNuevaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaseNuevaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaseNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
