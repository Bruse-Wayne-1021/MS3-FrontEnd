import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrl: './book-table.component.css'
})
export class BookTableComponent implements OnInit{

  books = [
    { id: 'B001', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction' },
    { id: 'B002', title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction' },
    { id: 'B003', title: '1984', author: 'George Orwell', genre: 'Dystopian' },
    { id: 'B004', title: 'Moby Dick', author: 'Herman Melville', genre: 'Adventure' },
 ];

 pages = [1, 2, 3, 4, 5];

  constructor(){ }

  ngOnInit(): void {
    
  }

}
