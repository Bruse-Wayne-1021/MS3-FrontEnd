import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reserved-books',
  templateUrl: './reserved-books.component.html',
  styleUrl: './reserved-books.component.css'
})
export class ReservedBooksComponent implements OnInit {
  reservedBooks = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', reservedDate: new Date('2024-11-01'), status: 'Pending' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', reservedDate: new Date('2024-11-05'), status: 'Reserved' },
    
  ];

  constructor() { }

  ngOnInit(): void {
    
  }

}
