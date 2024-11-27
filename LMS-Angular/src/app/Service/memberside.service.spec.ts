import { TestBed } from '@angular/core/testing';

import { MembersideService } from './memberside.service';

describe('MembersideService', () => {
  let service: MembersideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembersideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
