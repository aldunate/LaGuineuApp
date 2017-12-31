import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaMonitorComponent } from './crea-monitor.component';

describe('CreaMonitorComponent', () => {
  let component: CreaMonitorComponent;
  let fixture: ComponentFixture<CreaMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
