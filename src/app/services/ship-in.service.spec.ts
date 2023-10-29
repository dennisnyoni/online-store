import { TestBed } from '@angular/core/testing';

import { ShipInService } from './ship-in.service';

describe('ShipInService', () => {
  let service: ShipInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
