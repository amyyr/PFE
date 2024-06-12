import { TestBed } from '@angular/core/testing';

import { LiveScoreService } from './live-score.service';

describe('LiveScoreService', () => {
  let service: LiveScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
