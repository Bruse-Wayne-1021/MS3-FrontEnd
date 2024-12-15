import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookfavoriteComponent } from './bookfavorite.component';

describe('BookfavoriteComponent', () => {
  let component: BookfavoriteComponent;
  let fixture: ComponentFixture<BookfavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookfavoriteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookfavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
