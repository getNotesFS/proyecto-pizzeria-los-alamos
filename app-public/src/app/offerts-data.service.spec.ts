import { TestBed } from '@angular/core/testing';
import { OffertsDataService } from './offerts-data.service';

describe('OffertsDataService', () => {
  let service: OffertsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffertsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
