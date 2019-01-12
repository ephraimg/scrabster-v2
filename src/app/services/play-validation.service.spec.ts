import { TestBed } from '@angular/core/testing';

import { PlayValidationService } from './play-validation.service';

describe('PlayValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayValidationService = TestBed.get(PlayValidationService);
    expect(service).toBeTruthy();
  });
});
