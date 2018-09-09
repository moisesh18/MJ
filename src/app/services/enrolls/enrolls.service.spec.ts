import { TestBed, inject } from '@angular/core/testing';

import { EnrollsService } from './enrolls.service';

describe('EnrollsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnrollsService]
    });
  });

  it('should be created', inject([EnrollsService], (service: EnrollsService) => {
    expect(service).toBeTruthy();
  }));
});
