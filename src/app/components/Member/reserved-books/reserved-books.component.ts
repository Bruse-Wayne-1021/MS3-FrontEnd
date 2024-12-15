import { ApproveDate } from './../../../Service/request.service';
import { ReservedBook } from './../../../Service/memberside.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import { RequestService } from '../../../Service/request.service';
import { state } from '../../../Service/book-lend.service';
import { MembersideService } from '../../../Service/memberside.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../../Service/book.service';
import { ToastrService } from 'ngx-toastr';

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
  Notofication:any[]=[];
  bookId!:string;
  Copies!:number
  bookData:any[]=[];

  constructor(private userServoce:UserService,
    private requestService:RequestService,
    private memberSide:MembersideService,
    private bookService:BookService,
    private toster :ToastrService,

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
        this.memberid=response?.memberID;
        this.memberSide.getNotification(this.memberid).subscribe({
           next: response=>{
            console.log(response);
            this.Notofication=response;
            console.log(this.Notofication);
           },
           error:err=>{
            console.log(err);
           }
        })
        const Request={
          MemberID:this.memberid,
          state:state.Accept
        }
        this.getBorrowedBooks(this.memberid);
        console.log(this.memberid);
        this.memberSide.getReservedBooks(Request).subscribe({
          next: (response) => {
            console.log('Full Response:', response);
            this.books = response?.$values || [];
            this.bookId = this.books.length > 0 ? this.books[0].bookId : undefined;
            this.getBOokbyID(this.bookId)

            this.bookService.getBookByid(this.bookId).subscribe({
              next:data=>{
                console.log(data);

              }
            })

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

  collectBook(lendId: string, bookId: string): void {
    this.IDofLend = lendId;


    this.requestService.approveRequest(this.IDofLend, state.Waiting).subscribe({
      next: () => {
        const Request = {
          MemberID: this.IDofLend,
          Datetype: this.dateType,
        };
        this.toster.success('Book Collected SuccessFUlly')
        this.bookService.getBookByid(bookId).subscribe({
          next: (data) => {
            const currentQuantity = data?.quantity;
            if (currentQuantity > 0) {

              this.bookService.updateCopies(bookId, currentQuantity -1).subscribe({
                next: (updateResponse) => {
                  // alert('Copies updated successfully:');
                  this.updateCollectDate(Request);
                },
                error: (updateError) => {
                  console.error('Error updating copies:', updateError);
                },
              });
            } else {
              alert('No copies available to lend.');
            }
          },
          error: (fetchError) => {
            console.error('Error fetching book details:', fetchError);
          },
        });

      },
      error: (error) => {
        console.error('Error approving request:', error);
      },
    });
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

  getBOokbyID(bookid:string):void{

  };



}
