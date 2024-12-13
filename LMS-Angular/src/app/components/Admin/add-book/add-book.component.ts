import { Subscription } from 'rxjs';
import { Component, numberAttribute, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../../Service/book.service';
import { ActivatedRoute } from '@angular/router';
import { data, error } from 'jquery';
import { ToastrService } from 'ngx-toastr';

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
  base64Image: string = '';
  backgrounImage:string='';
  previewImage: string | ArrayBuffer | null = null;
  CurrentId!:string;
  IsEditMode:boolean=false;
  Ebook:string='';

  addNewAuthorForm!: FormGroup;
  addNewPublisherForm!: FormGroup;
  private  subcription:Subscription=new Subscription();

  constructor(private fb: FormBuilder,
    private bookService: BookService,
    private route:ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.CurrentId=this.route.snapshot.paramMap.get("id")||'';
    if(this.CurrentId){
      this.IsEditMode=true
    }

    this.addBookForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', [Validators.maxLength(1000)]],
      isbn: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{10}$/)]],
      pageCount: [1, [Validators.required, Validators.min(1)]],
      isAvailable: [true],
      bookType:[''],
      quantity: [1, [Validators.required, Validators.min(1)]],
      authorId: ['', Validators.required],
      publisherId: ['', Validators.required],
      languageId: ['', Validators.required],
      genreId: ['', Validators.required],
      image2Path: ['', Validators.required],
      publishDate: ['', Validators.required],
      filepath:['']
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
    if(this.IsEditMode==true){
      this.GetDetailsToDetails();
    }

  }


  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.base64Image = (e.target as FileReader).result as string;
        this.previewImage = this.base64Image;
        this.addBookForm.patchValue({ image2Path: this.base64Image });
      };
      reader.readAsDataURL(file);
    }
  }

  onFileChangeToeBook(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.Ebook = (e.target as FileReader).result as string;
        this.addBookForm.patchValue({ filepath: this.Ebook });
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmit(): void {
    const bookData = this.addBookForm.value;
    bookData.bookType = parseInt(bookData.bookType);
    bookData.isAvailable = !!bookData.isAvailable;
    if (this.IsEditMode == false) {
      if (this.addBookForm.invalid) {
        console.error('Form is invalid!');
        return;
      }
      this.bookService.createNewBook(bookData).subscribe({
        next: (data) => {
          alert("Success");
          this.toastr.success('Book added successfully', 'Success');
          this.addBookForm.reset();

        },
        error: (error) => {
          this.toastr.error('Book Added Failed', 'Error');
        }
      });
    } else if(this.IsEditMode==true) {
      if (this.addBookForm.invalid) {
        console.error('Form is invalid!');
        return;
      }

      this.bookService.UpdateBook(this.CurrentId, bookData).subscribe({
        next: (data) => {
          this.toastr.success('Book updated successfully', 'Success');
        },
        error: (err) => {
          this.toastr.error('Update Failed', 'Error');;
        }
      });
    }
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
        this.languages = response?.$values || [];
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


  GetDetailsToDetails(){
    if(this.CurrentId!==null){
      this.subcription.add(
        this.bookService.getBookByid(this.CurrentId).subscribe(
          data=>this.addBookForm.patchValue(data),
          error=>console.error("Error Fetchin Data")
        )
      );
    }
  }



}
