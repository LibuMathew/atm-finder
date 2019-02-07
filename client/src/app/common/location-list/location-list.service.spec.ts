import { TestBed } from '@angular/core/testing';

import { LocationListService } from './location-list.service';

describe('LocationListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationListService = TestBed.get(LocationListService);
    expect(service).toBeTruthy();
  });
});
