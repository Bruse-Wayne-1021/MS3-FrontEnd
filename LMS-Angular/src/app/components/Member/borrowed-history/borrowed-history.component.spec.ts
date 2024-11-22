import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedHistoryComponent } from './borrowed-history.component';

describe('BorrowedHistoryComponent', () => {
  let component: BorrowedHistoryComponent;
  let fixture: ComponentFixture<BorrowedHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BorrowedHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowedHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
