import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignBedComponent } from './assign-bed.component';

describe('AssignBedComponent', () => {
  let component: AssignBedComponent;
  let fixture: ComponentFixture<AssignBedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignBedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignBedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
