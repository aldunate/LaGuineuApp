import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubNuevoComponent } from './club-nuevo.component';

describe('ClubNuevoComponent', () => {
  let component: ClubNuevoComponent;
  let fixture: ComponentFixture<ClubNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
