import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorPersonalComponent } from './monitor-personal.component';

describe('MonitorPersonalComponent', () => {
  let component: MonitorPersonalComponent;
  let fixture: ComponentFixture<MonitorPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
