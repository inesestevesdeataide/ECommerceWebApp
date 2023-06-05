import { TestBed } from '@angular/core/testing';

import { ServusersService } from './servusers.service';

describe('ServusersService', () => {
  let service: ServusersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServusersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
