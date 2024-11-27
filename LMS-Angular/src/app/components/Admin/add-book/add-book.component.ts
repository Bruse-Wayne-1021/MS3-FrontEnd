import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../../Service/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'] 
})
export class AddBookComponent implements OnInit {

  addBookForm!: FormGroup;
  genres: any[] = [];
  languages: any[] = [];
  authors: any[] = [];
  publishers: any[] = [];

  addNewAuthorForm!: FormGroup;
  addNewPublisherForm!: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookService) {

    this.addBookForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', [Validators.maxLength(1000)]],
      isbn: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{10}$/)]],
      pageCount: [1, [Validators.required, Validators.min(1)]],
      isAvailable: [true],
      quantity: [1, [Validators.required, Validators.min(1)]],
      authorId: ['', Validators.required],
      publisherId: ['', Validators.required],
      languageId: ['', Validators.required],
      genreId: ['', Validators.required],
      image2Path: ['', Validators.required],
      publishDate: ['', Validators.required]
    });


    this.addNewAuthorForm = this.fb.group({
      authorName: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      bio: ['', [Validators.required]],
    });


    this.addNewPublisherForm = this.fb.group({
      publisherName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      details: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadGenres();
    this.loadLanguages();
    this.loadAuthors();
    this.loadPublishers();
  }


  onSubmit(): void {
    if (this.addBookForm.invalid) {
      console.error('Form is invalid!');
      return;
    }

    const bookData = this.addBookForm.value;
    this.bookService.createNewBook(bookData).subscribe({
      next: (data) => {
        console.log('Book added successfully:', data);

        this.addBookForm.reset();
      },
      error: (error) => {
        console.error('Error adding book:', error);
      }
    });
  }


  addNewAuthor(): void {
    if (this.addNewAuthorForm.invalid) {
      console.error('Author form is invalid!');
      return;
    }

    const authorData = this.addNewAuthorForm.value;
    this.bookService.postnewAuthor(authorData).subscribe({
      next: (data) => {
        console.log('Author added successfully:', data);
        this.loadAuthors();
        this.addNewAuthorForm.reset();
      },
      error: (error) => {
        console.error('Error adding author:', error);
      }
    });
  }


  addNewPublisher(): void {
    if (this.addNewPublisherForm.invalid) {
      console.error('Publisher form is invalid!');
      return;
    }

    const publisherData = this.addNewPublisherForm.value;
    this.bookService.postNewPublisher(publisherData).subscribe({
      next: (data) => {
        console.log('Publisher added successfully:', data);
        this.loadPublishers();
        this.addNewPublisherForm.reset();
      },
      error: (error) => {
        console.error('Error adding publisher:', error);
      }
    });
  }


  loadGenres(): void {
    this.bookService.getAllGenres().subscribe({
      next: (response) => {
        this.genres = response?.data?.$values || [];
        console.log(this.genres);

      },
      error: (error) => {
        console.error('Error fetching genres:', error);
      }
    });
  }


  loadLanguages(): void {
    this.bookService.getAllLanguage().subscribe({
      next: (response) => {
        console.log(response.$values);

        this.languages = response?.$values ||[];
        console.log(this.languages);

      },
      error: (error) => {
        console.error('Error fetching languages:', error);
      }
    });
  }


  loadAuthors(): void {
    this.bookService.getallAuthors().subscribe({
      next: (response) => {
        this.authors = response?.$values || [];
        console.log(this.authors);

      },
      error: (error) => {
        console.error('Error fetching authors:', error);
      }
    });
  }


  loadPublishers(): void {
    this.bookService.getAllPublisher().subscribe({
      next: (response) => {
        this.publishers = response?.$values || [];
        console.log(this.publishers);

      },
      error: (error) => {
        console.error('Error fetching publishers:', error);
      }
    });
  }
}
