import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookGalleryComponent } from './book-gallery.component';

describe('BookGalleryComponent', () => {
  let component: BookGalleryComponent;
  let fixture: ComponentFixture<BookGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
