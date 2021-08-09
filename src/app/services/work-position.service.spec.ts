import { TestBed } from '@angular/core/testing';

import { WorkPositionService } from './work-position.service';

describe('WorkPositionService', () => {
  let service: WorkPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
