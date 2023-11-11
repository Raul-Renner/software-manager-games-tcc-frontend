import { TestBed } from '@angular/core/testing';

import { ActivityDependentService } from './activity-dependent.service';

describe('ActivityDependentService', () => {
  let service: ActivityDependentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityDependentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
