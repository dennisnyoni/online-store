import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestDashBoardComponent } from './guest-dash-board.component';

describe('GuestDashBoardComponent', () => {
  let component: GuestDashBoardComponent;
  let fixture: ComponentFixture<GuestDashBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestDashBoardComponent]
    });
    fixture = TestBed.createComponent(GuestDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
