import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipInListComponent } from './ship-in-list.component';

describe('ShipInListComponent', () => {
  let component: ShipInListComponent;
  let fixture: ComponentFixture<ShipInListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShipInListComponent]
    });
    fixture = TestBed.createComponent(ShipInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
