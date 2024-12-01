import { IBookRequest, state } from './../../../Service/book-lend.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BookService } from '../../../Service/book.service';
import { tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BookLendService } from '../../../Service/book-lend.service';
import { RequestService } from '../../../Service/request.service';


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
  userid!:string;
  memberid!:string;
  bookid!:string;



  constructor (
    private fb:FormBuilder,
    private bookService:BookService,
    private router:Router,
    private booklendService:BookLendService,
    private requestservice:RequestService
  ) {}

  ngOnInit(): void {
    this.loadBook();
    this.loadGenres();
    this.loadLanguages();
    const userdata = localStorage.getItem('User');
    if (!userdata) {
      alert('User not logged in!');
      return;
    }
    const parsedata = JSON.parse(userdata);
    const member = parsedata['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.userid=member;
    console.log(this.userid);

    this.requestservice.getMemeberBtid(this.userid).subscribe({
      next:(response)=>{
        this.memberid=response.memberID;
        console.log(this.memberid);
        console.log(response);
      },
      error:error=>{
        console.log(error);
      }
    })
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

  toggleFavorite(bookId: string, event: MouseEvent): void {
    event.stopPropagation();
    const payload:IBookRequest={
      bookId,
      memebID:this.memberid,
      state:state.Favaurite
    }
    this.booklendService.postBookRequest(payload).subscribe({
      next: (response) => {
        alert(response)
      },
      error:error=>{
        console.log(error);
      }
    });
    console.log(`Favorite toggled for book ID: ${bookId}`);
  }
}


