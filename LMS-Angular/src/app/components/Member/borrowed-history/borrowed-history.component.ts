import { state } from './../../../Service/book-lend.service';
import { Component, OnInit } from '@angular/core';
import { MembersideService } from '../../../Service/memberside.service';
import { RequestService } from '../../../Service/request.service';


@Component({
  selector: 'app-borrowed-history',
  templateUrl: './borrowed-history.component.html',
  styleUrl: './borrowed-history.component.css'
})
export class BorrowedHistoryComponent implements OnInit {

  userid!:string;
  memberId!:string;
  borrowedBook:any[]=[];

  constructor (private memberside:MembersideService,
    private requestService:RequestService
  ) {}

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
      console.log(this.memberId);
      this.getBorrowedBooks();

     },
     error:error=>{
      console.log(error);
     }
    })
  }

  getBorrowedBooks():void{
    this.memberside.getWaitingBook(this.memberId,state.Borrowed).subscribe({
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
