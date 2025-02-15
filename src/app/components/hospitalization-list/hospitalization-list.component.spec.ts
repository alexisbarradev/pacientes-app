import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalizationListComponent } from './hospitalization-list.component';

describe('HospitalizationListComponent', () => {
  let component: HospitalizationListComponent;
  let fixture: ComponentFixture<HospitalizationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalizationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalizationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
