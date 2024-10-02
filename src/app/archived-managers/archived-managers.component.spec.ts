import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedManagersComponent } from './archived-managers.component';

describe('ArchivedManagersComponent', () => {
  let component: ArchivedManagersComponent;
  let fixture: ComponentFixture<ArchivedManagersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivedManagersComponent]
    });
    fixture = TestBed.createComponent(ArchivedManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
