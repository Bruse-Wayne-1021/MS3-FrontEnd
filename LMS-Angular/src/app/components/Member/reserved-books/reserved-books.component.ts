import { ReservedBook } from './../../../Service/memberside.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import { RequestService } from '../../../Service/request.service';
import { state } from '../../../Service/book-lend.service';
import { MembersideService } from '../../../Service/memberside.service';

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


  constructor(private userServoce:UserService,private requestService:RequestService,private memberSide:MembersideService) { }

  ngOnInit(): void {


    const userdata = localStorage.getItem('User');
    if (!userdata) {
      alert('User not logged in!');
      return;
    }
    const parsedata = JSON.parse(userdata);
    const member = parsedata['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.UserID=member;
    console.log(this.UserID);
    this.userServoce.getMemeberBtid(this.UserID).subscribe({
      next: (response) => {
        console.log(response);
        this.memberid=response?.memberID        ;
        console.log(this.memberid);
        const Request={
          MemberID:this.memberid,
          state:state.Accept
        }
        console.log(this.memberid);
        this.memberSide.getReservedBooks(Request).subscribe({
          next: (response) => {
            console.log(response);
            this.books=response?.$values;
            console.log(this.books);
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

    console.log(this.memberid);


  }

  // getMemberByID():void{
  //   this.userServoce.getMemeberBtid(this.UserID).subscribe({
  //     next: (response) => {
  //       console.log(response);
  //       this.memberid=response?.memberID;
  //       console.log(this.memberid);

  //     },
  //     error:(err: any)=>{
  //       console.log(err);
  //     }
  //   })
  // }


  getBook():void{

  }




}
