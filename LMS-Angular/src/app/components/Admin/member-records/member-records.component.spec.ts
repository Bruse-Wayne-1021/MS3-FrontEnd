import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRecordsComponent } from './member-records.component';

describe('MemberRecordsComponent', () => {
  let component: MemberRecordsComponent;
  let fixture: ComponentFixture<MemberRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberRecordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
