import { TestBed } from '@angular/core/testing';

import { WorkPositionService } from './work-position.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Test WorkPositionService: ', () => {
  let service: WorkPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }).compileComponents();
    service = TestBed.inject(WorkPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
