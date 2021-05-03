import { TestBed } from '@angular/core/testing';

import { NotifyAPIService } from './notify-api.service';

describe('NotifyAPIService', () => {
  let service: NotifyAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifyAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
