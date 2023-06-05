import { TestBed } from '@angular/core/testing';

import { ServutilsService } from './servutils.service';

describe('ServutilsService', () => {
  let service: ServutilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServutilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
