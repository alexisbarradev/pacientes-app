import { TestBed } from '@angular/core/testing';

import { HospitalizationListService } from './hospitalization-list.service';

describe('HospitalizationListService', () => {
  let service: HospitalizationListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HospitalizationListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
