import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchManagementComponent } from './match-management.component';

describe('MatchManagementComponent', () => {
  let component: MatchManagementComponent;
  let fixture: ComponentFixture<MatchManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchManagementComponent]
    });
    fixture = TestBed.createComponent(MatchManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
