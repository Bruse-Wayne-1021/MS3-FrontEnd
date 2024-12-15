import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BookService, Ibook } from '../../Service/book.service';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: [
    './blank-layout.component.css',
  ]
})
export class BlankLayoutComponent {
[x: string]: any;
quote = '---A room without books is like a body without a soul---.';
author = 'Marcus Tullius Cicero';
books:Ibook[] = [
  {
    image: 'Features/Book.jpg', title: 'The Winter Duchess', description: 'As cold winds howl outside the manor, inside of it a duke’s heart is finally starting to melt as he finds himself falling for the one woman.',
    name: '',
    isbn: '',
    pageCount: 0,
    isAvailable: false,
    bookType: 0,
    quantity: 0,
    authorId: '',
    publisherId: '',
    languageId: '',
    genreId: '',
    image2Path: '',
    publishDate: undefined,
    filePath: ''
  },
  {
    image: 'Features/Book2.jpg', title: 'Oliver Twist', description: 'Oliver Twist is one the most famous and influential work of Dickens: it was the first novel in English to have one of the first examples of the social novel.',
    name: '',
    isbn: '',
    pageCount: 0,
    isAvailable: false,
    bookType: 0,
    quantity: 0,
    authorId: '',
    publisherId: '',
    languageId: '',
    genreId: '',
    image2Path: '',
    publishDate: undefined,
    filePath: ''
  },
  {
    image: 'Features/book3.jpg', title: 'Harry Potter', description: 'The Harry Potter series follows the adventures of a young wizard, Harry Potter, as he navigates his way through life at Hogwarts School',
    name: '',
    isbn: '',
    pageCount: 0,
    isAvailable: false,
    bookType: 0,
    quantity: 0,
    authorId: '',
    publisherId: '',
    languageId: '',
    genreId: '',
    image2Path: '',
    publishDate: undefined,
    filePath: ''
  },
  {
    image: 'Features/Book4.jpg', title: 'Title Book', description: 'A book description is a brief overview of the plot, main characters, and themes of the story. It’s an important tool that helps in book promotion .',
    name: '',
    isbn: '',
    pageCount: 0,
    isAvailable: false,
    bookType: 0,
    quantity: 0,
    authorId: '',
    publisherId: '',
    languageId: '',
    genreId: '',
    image2Path: '',
    publishDate: undefined,
    filePath: ''
  },
  {
    image: 'Features/Book1.jpg', title: 'Soul', description: 'The book explores the profound spiritual journey of the soul as it undergoes a period of deep inner turmoil and purification',
    name: '',
    isbn: '',
    pageCount: 0,
    isAvailable: false,
    bookType: 0,
    quantity: 0,
    authorId: '',
    publisherId: '',
    languageId: '',
    genreId: '',
    image2Path: '',
    publishDate: undefined,
    filePath: ''
  },
  {
    image: 'Features/Book6.jpg', title: 'Falling', description: 'Falling (2021) is the debut novel by T. J. Newman. The novel premiered at the number two spot on the New York Times bestseller list.',
    name: '',
    isbn: '',
    pageCount: 0,
    isAvailable: false,
    bookType: 0,
    quantity: 0,
    authorId: '',
    publisherId: '',
    languageId: '',
    genreId: '',
    image2Path: '',
    publishDate: undefined,
    filePath: ''
  },

];
groupedBooks: any[] = [];

  BookService = inject(BookService)
  private router = inject(Router)

  showModal: boolean = false;
  searchQuery:string='';


  private chunkArray(arr: any[], chunkSize: number) {
    const groups = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
  }



  ngOnInit(): void {
    this.LoadBooks();
    this.UserData();
    this.groupedBooks = this.chunkArray(this.books, 3); // 3 items per slide
  }

  LoadBooks() {
    this.BookService.getAllBooks().subscribe({
      next:(res:Ibook[])=>{
        this.books = res
      }
    })
  }

  trackByBookId(index: number, book: any): number {
    return book.bookId;
  }

  NonLoggedUser() {
    console.log('Non Logged user show Modal window');
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  LoginNavigation(){
    this.router.navigateByUrl('User-Login')
  }

  getStarArray(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return [
      ...Array(fullStars).fill('full'),
      ...Array(halfStars).fill('half'),
      ...Array(emptyStars).fill('empty'),
    ];
  }

  BookDetails(bookId:number) {
    this.router.navigateByUrl(`/BookDetails/${bookId}`)
  }

  UserData() {
    const User = localStorage.getItem('LoggedUser')
    if (!User) return
    const UserToken = JSON.parse(User);
    const decoded: any = jwtDecode(UserToken.token);

  }



}
