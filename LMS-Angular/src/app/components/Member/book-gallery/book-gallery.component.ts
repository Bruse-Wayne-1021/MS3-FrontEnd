import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BookService } from '../../../Service/book.service';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-book-gallery',
  templateUrl: './book-gallery.component.html',
  styleUrl: './book-gallery.component.css'
})
export class BookGalleryComponent implements OnInit {

  books:any[]=[];


  constructor (private fb:FormBuilder,private bookService:BookService) {}

  ngOnInit(): void {
    this.loadBook();
  }

  loadBook():void{
    this.bookService.getAllBooks().subscribe({
      next:(response)=>{
        this.books=response?.$values ||[];
      },
      error:(error)=>{
       console.log(this.books);
      }
    });
  }





}
