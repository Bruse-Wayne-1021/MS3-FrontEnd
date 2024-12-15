import { state } from './../../../Service/book-lend.service';
import { Component, OnInit } from '@angular/core';
import { MembersideService } from '../../../Service/memberside.service';
import { RequestService } from '../../../Service/request.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bookfavorite',
  templateUrl: './bookfavorite.component.html',
  styleUrl: './bookfavorite.component.css'
})
export class BookfavoriteComponent implements OnInit{

  userid!:string;
  memberId!:string;
  borrowedBook:any[]=[];

  constructor(private memberService:MembersideService
    ,private requestService:RequestService,
  private router:Router){

  }
  ngOnInit(): void {
    const userdata = localStorage.getItem('User');
    if (!userdata) {
      alert('User not logged in!');
      return;
    }
    const parsedata = JSON.parse(userdata);
    const member = parsedata['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.userid=member;
    console.log(this.userid);
    this.requestService.getMemeberBtid(this.userid).subscribe({
     next:data=>{
      console.log(data);
      this.memberId=data.memberID;

      this.getBorrowedBooks();
     },
     error:error=>{
      console.log(error);
     }
    })
  }

  viewbook(bookid:number){
    this.router.navigate(['/member/book-gallery/viewbook', bookid]);
  }

  getBorrowedBooks():void{
      this.memberService.getWaitingBook(this.memberId,state.Favaurite).subscribe({
        next:data=>{
          console.log(data);
          this.borrowedBook=data?.$values;
          console.log(this.borrowedBook);
        },
        error:er=>{
          console.log(er);
        }
      });
    }



}

