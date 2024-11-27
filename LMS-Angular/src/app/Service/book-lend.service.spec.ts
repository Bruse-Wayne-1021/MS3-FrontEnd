import { TestBed } from '@angular/core/testing';

import { BookLendService } from './book-lend.service';

describe('BookLendService', () => {
  let service: BookLendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookLendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
