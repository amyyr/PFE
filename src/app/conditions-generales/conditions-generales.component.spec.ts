import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsGeneralesComponent } from './conditions-generales.component';

describe('ConditionsGeneralesComponent', () => {
  let component: ConditionsGeneralesComponent;
  let fixture: ComponentFixture<ConditionsGeneralesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConditionsGeneralesComponent]
    });
    fixture = TestBed.createComponent(ConditionsGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
