import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDashBoardComponent } from './member-dash-board.component';

describe('MemberDashBoardComponent', () => {
  let component: MemberDashBoardComponent;
  let fixture: ComponentFixture<MemberDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberDashBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
