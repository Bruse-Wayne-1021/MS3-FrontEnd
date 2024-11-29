import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorBooksComponent } from './author-books.component';

describe('AuthorBooksComponent', () => {
  let component: AuthorBooksComponent;
  let fixture: ComponentFixture<AuthorBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
