import { TestBed } from '@angular/core/testing';

import { ServproductsService } from './servproducts.service';

describe('ServproductsService', () => {
  let service: ServproductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServproductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
