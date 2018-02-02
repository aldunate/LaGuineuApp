import { TestBed, inject } from '@angular/core/testing';

import { EstacionService } from './estacion.service';

describe('EstacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstacionService]
    });
  });

  it('should be created', inject([EstacionService], (service: EstacionService) => {
    expect(service).toBeTruthy();
  }));
});
