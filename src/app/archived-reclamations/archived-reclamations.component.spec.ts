import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedReclamationsComponent } from './archived-reclamations.component';

describe('ArchivedReclamationsComponent', () => {
  let component: ArchivedReclamationsComponent;
  let fixture: ComponentFixture<ArchivedReclamationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivedReclamationsComponent]
    });
    fixture = TestBed.createComponent(ArchivedReclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
