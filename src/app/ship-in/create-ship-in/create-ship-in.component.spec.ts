import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShipInComponent } from './create-ship-in.component';

describe('CreateShipInComponent', () => {
  let component: CreateShipInComponent;
  let fixture: ComponentFixture<CreateShipInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateShipInComponent]
    });
    fixture = TestBed.createComponent(CreateShipInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
