import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-book-gallery',
  templateUrl: './book-gallery.component.html',
  styleUrl: './book-gallery.component.css'
})
export class BookGalleryComponent implements OnInit {
  books = [
    {title:'', author: '', image: ''},
    {title: '1984', author: 'George Orwell'},
    {title:'Harry Potter', image: 'https://th.bing.com/th/id/OIP.eWN9yy7Y337FdsArsLrkqgHaLH?w=118&h=180&c=7&r=0&o=5&pid=1.7'}
  ];

  constructor () {}

  ngOnInit(): void {
    
  }

}
