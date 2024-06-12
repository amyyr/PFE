import { TestBed } from '@angular/core/testing';

import { VideoAIService } from './video-ai.service';

describe('VideoAIService', () => {
  let service: VideoAIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoAIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
