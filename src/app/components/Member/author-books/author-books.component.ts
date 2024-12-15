import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../Service/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-author-books',
  templateUrl: './author-books.component.html',
  styleUrl: './author-books.component.css'
})
export class AuthorBooksComponent  implements OnInit{

  AuthorsBooks:any[]=[];
  authorID!:string;

  constructor(private bookservice :BookService,private router:Router,private route:ActivatedRoute) {
    const tid=this.route.snapshot.paramMap.get("id");
    this.authorID=String(tid);
  }
  ngOnInit(): void {
    this.bookservice.getBookByAuthorId(this.authorID).subscribe({
      next:(data:any)=>{
        console.log(data);
        this.AuthorsBooks=data?.$values;
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  viewbook(bookid:string){
    this.router.navigate(['/member/book-gallery/viewbook', bookid]);
  }



}
