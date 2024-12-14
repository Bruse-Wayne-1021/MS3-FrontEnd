import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../Service/book.service';
import { Router } from '@angular/router';
import { data } from 'jquery';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrl: './book-table.component.css'
})
export class BookTableComponent implements OnInit{
  Books:any[]=[];

  constructor(private bookService:BookService,
    private router:Router
  ){ }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe({
      next:data=>{
        console.log(data);
        this.Books=data?.$values;
      },
      error:err=>{
        console.log(err);

      }
    })
  }

  EditBook(bookid:string):void{
    this.router.navigate(['/admin/book/addBook',bookid]);
  }

  DeleteBook(bookid:string):void{
  
  this.bookService.DeleteBook(bookid).subscribe({
      next:data=>{
        console.log(data);
      },
      error:err=>{
        console.log(err);
      }
    })
  }



}
