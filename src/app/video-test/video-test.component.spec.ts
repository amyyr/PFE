import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTestComponent } from './video-test.component';

describe('VideoTestComponent', () => {
  let component: VideoTestComponent;
  let fixture: ComponentFixture<VideoTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoTestComponent]
    });
    fixture = TestBed.createComponent(VideoTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
