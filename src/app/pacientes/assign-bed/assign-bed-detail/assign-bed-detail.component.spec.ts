import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignBedDetailComponent } from './assign-bed-detail.component';

describe('AssignBedDetailComponent', () => {
  let component: AssignBedDetailComponent;
  let fixture: ComponentFixture<AssignBedDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignBedDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignBedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
