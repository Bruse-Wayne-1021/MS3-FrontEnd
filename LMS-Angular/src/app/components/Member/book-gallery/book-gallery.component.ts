import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BookService } from '../../../Service/book.service';
import { tick } from '@angular/core/testing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-gallery',
  templateUrl: './book-gallery.component.html',
  styleUrl: './book-gallery.component.css'
})
export class BookGalleryComponent implements OnInit {

  books:any[]=[];
  book:[]=[];
  genres:any[]=[];
  selectedGenre!:string;
  filterBooks:any[]=[];
  language:any[]=[];
  selectedLanguage!:string;


  constructor (private fb:FormBuilder,private bookService:BookService,private router:Router) {}

  ngOnInit(): void {
    this.loadBook();
    this.loadGenres();
    this.loadLanguages();
  }

  loadBook():void{
    this.bookService.getAllBooks().subscribe({
      next:(response)=>{
        this.books=response?.$values ||[];
        this.filterBooks=[...this.books]

      },
      error:(error)=>{
       console.log(error);

      }
    });
  }


  viewbook(bookid:number){
    this.router.navigate(['/member/book-gallery/viewbook', bookid]);
  }

  filterBook():void{
    if( this.selectedGenre){
      this.bookService.filterBook(this.selectedGenre).subscribe({
        next:data=>{
          this.filterBooks=data?.$values||[];
        },
        error:error=>{

          console.log(error);
        }
      });

    }
    else{
        this.filterBooks=[...this.books]
    }
  }

  filterBookBylanguage():void{
    if(this.selectedLanguage){
      this.bookService.filterByLanguage(this.selectedLanguage).subscribe({
        next:data=>{
          this.filterBooks=data?.$values||[];
        },
        error:error=>{
          console.log(error);

        }
      })
    }
    this.filterBooks=[...this.books]
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

        this.language = response?.$values ||[];
        console.log(this.language);

      },
      error: (error) => {
        console.error('Error fetching languages:', error);
      }
    });
  }









}
