import { TestBed, inject } from '@angular/core/testing';

import { ClaseService } from './clase.service';

describe('ClaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClaseService]
    });
  });

  it('should be created', inject([ClaseService], (service: ClaseService) => {
    expect(service).toBeTruthy();
  }));
});
