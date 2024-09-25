import { TestBed } from '@angular/core/testing';

import { SharedCategoryService } from './shared-category.service';

describe('SharedCategoryService', () => {
  let service: SharedCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
