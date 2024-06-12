import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchStatisticsComponent } from './match-statistics.component';

describe('MatchStatisticsComponent', () => {
  let component: MatchStatisticsComponent;
  let fixture: ComponentFixture<MatchStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchStatisticsComponent]
    });
    fixture = TestBed.createComponent(MatchStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
