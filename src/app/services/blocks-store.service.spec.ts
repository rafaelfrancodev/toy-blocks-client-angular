import { TestBed } from '@angular/core/testing';

import { BlocksStoreService } from './blocks-store.service';

describe('BlocksStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlocksStoreService = TestBed.get(BlocksStoreService);
    expect(service).toBeTruthy();
  });
});
