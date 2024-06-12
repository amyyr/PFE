import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateManagerComponent } from './update-manager.component';

describe('UpdateManagerComponent', () => {
  let component: UpdateManagerComponent;
  let fixture: ComponentFixture<UpdateManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateManagerComponent]
    });
    fixture = TestBed.createComponent(UpdateManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
