import { TestBed } from '@angular/core/testing';

import { DataMutationsService } from './data-mutations.service';

describe('DataMutationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataMutationsService = TestBed.get(DataMutationsService);
    expect(service).toBeTruthy();
  });
});
