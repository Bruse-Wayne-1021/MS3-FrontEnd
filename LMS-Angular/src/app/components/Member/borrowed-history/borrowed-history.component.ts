import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-borrowed-history',
  templateUrl: './borrowed-history.component.html',
  styleUrl: './borrowed-history.component.css'
})
export class BorrowedHistoryComponent implements OnInit {
  borrowedHistory = [
    {bookTitle:  'The Catcher in the Rye', author: 'J.D. Salinger', borrowedDate: new Date('2024-10-01'), returnDate: new Date('2024-10-15')},
    { bookTitle: '1984', author: 'George Orwell', borrowedDate: new Date('2024-09-20'), returnDate: new Date('2024-10-05') },
  ];

  constructor () {}

  ngOnInit(): void {
    
  }

}
