import { TestBed } from '@angular/core/testing';

import { BeCallsService } from './be-calls.service';

describe('BeCallsService', () => {
  let service: BeCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
