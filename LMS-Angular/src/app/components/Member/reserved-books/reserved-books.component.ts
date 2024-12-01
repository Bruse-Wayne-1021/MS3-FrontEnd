import { ApproveDate } from './../../../Service/request.service';
import { ReservedBook } from './../../../Service/memberside.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import { RequestService } from '../../../Service/request.service';
import { state } from '../../../Service/book-lend.service';
import { MembersideService } from '../../../Service/memberside.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reserved-books',
  templateUrl: './reserved-books.component.html',
  styleUrl: './reserved-books.component.css'
})
export class ReservedBooksComponent implements OnInit {

  memberid!:any;
  UserID!:string;
  books:any[]=[];
  data!:string;
  selectedBook:any=null;
  IDofLend!:string;
  dateType:string="collect";
  waitingBooks:any[]=[];
  AddRatingForm!:FormGroup


  constructor(private userServoce:UserService,
    private requestService:RequestService,
    private memberSide:MembersideService,
    private fb:FormBuilder) {
      this.AddRatingForm=this.fb.group({
        starCount:['', Validators.required],
        feedBack:['', Validators.required],
        // memebID:['', Validators.required],
        // bookid:['', Validators.required]
      });
     }


  ngOnInit(): void {
    const userdata = localStorage.getItem('User');
    if (!userdata) {
      alert('User not logged in!');
      return;
    }
    const parsedata = JSON.parse(userdata);
    const member = parsedata['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.UserID=member;
    this.userServoce.getMemeberBtid(this.UserID).subscribe({
      next: (response) => {
        this.memberid=response?.memberID        ;
        const Request={
          MemberID:this.memberid,
          state:state.Accept
        }
        this.getBorrowedBooks(this.memberid);
        console.log(this.memberid);
        this.memberSide.getReservedBooks(Request).subscribe({
          next: (response) => {
            this.books=response?.$values;
          },
          error:(err: any)=>{
            console.log(err);
          }
        })
      },
      error:(err: any)=>{
        console.log(err);
      }
    })

  }

  collectBook(lendId:string):void{
    this.IDofLend=lendId
    this.requestService.approveRequest(this.IDofLend,state.Waiting).subscribe({
      next: (response) => {
        const Request={
          MemberID:this.IDofLend,
          Datetype:this.dateType
        }
        this.updateCollectDate(Request)
      },
      error:error=>{
        console.log(error);

      }
    })
  }

  updateCollectDate(details:ApproveDate):void{
    this.requestService.approveDate(details).subscribe({
      next: (response:any) => {
        console.log(response);
      },
      error:error=>{
        console.log(error);
      }
    })
  }

  getBorrowedBooks(id:string):void{
    this.memberSide.getWaitingBook(id,state.Waiting).subscribe({
      next: (response:any) => {
        console.log(response);
        this.waitingBooks=response?.$values;
        console.log(this.waitingBooks);
      },
      error:error=>{
        console.log(error);

      }
    })
  }

  PostRating(memberID:string,bookid:string):void{
    if(this.AddRatingForm.invalid){
      alert(" Rating Form is Invalid");
      return;
    }
    

  }

}
