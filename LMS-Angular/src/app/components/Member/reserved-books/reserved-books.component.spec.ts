import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedBooksComponent } from './reserved-books.component';

describe('ReservedBooksComponent', () => {
  let component: ReservedBooksComponent;
  let fixture: ComponentFixture<ReservedBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservedBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
