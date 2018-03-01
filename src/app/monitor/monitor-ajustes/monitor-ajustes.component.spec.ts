import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorAjustesComponent } from './monitor-ajustes.component';

describe('MonitorAjustesComponent', () => {
  let component: MonitorAjustesComponent;
  let fixture: ComponentFixture<MonitorAjustesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorAjustesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorAjustesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
