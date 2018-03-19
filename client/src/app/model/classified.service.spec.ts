import { TestBed, inject } from '@angular/core/testing';

import { Classified } from './classified.service';

describe('ClassifiedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Classified]
    });
  });

  it('should be created', inject([Classified], (service: Classified) => {
    expect(service).toBeTruthy();
  }));
});
