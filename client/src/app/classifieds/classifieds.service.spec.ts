import { TestBed, inject } from '@angular/core/testing';

import { ClassifiedsService } from './classifieds.service';

describe('ClassifiedsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassifiedsService]
    });
  });

  it('should be created', inject([ClassifiedsService], (service: ClassifiedsService) => {
    expect(service).toBeTruthy();
  }));
});
