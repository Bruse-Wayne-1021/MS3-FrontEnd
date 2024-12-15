import { ApproveDate } from './../../../Service/request.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReturnService } from '../../../Service/return.service';
import { state } from '../../../Service/book-lend.service';
import { RequestService } from '../../../Service/request.service';
import { BookService } from '../../../Service/book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrl: './return.component.css'
})
export class ReturnComponent implements OnInit{

  waitingBook:any[]=[];
  private refreceintervel:any;
  IdOfLend!:string;
  dateType:string="return";


  constructor(private returnservice:ReturnService,private requestService:RequestService,
    private bookService:BookService,private toster:ToastrService
  ){ }

  ngOnInit(): void {
    this.loaddata();

  }
  loaddata():void{
    this.returnservice.getAllwaitingBooks(state.Waiting).subscribe({
      next: (data:any) => {
        this.waitingBook=data?.$values;
        // console.log(this.waitingBook);
      },
      error:error=>{
        console.log(error);
      }
    });
  }
  returnBook(lendId:string,bookId:string):void{
    this.IdOfLend=lendId
    this.requestService.approveRequest(lendId,state.Borrowed).subscribe({
      next: (data:any) => {
        const payload:ApproveDate={
          MemberID:this.IdOfLend,
          Datetype:this.dateType
        }
        this.updateReturnDate(payload)
        // console.log(data);
        this.toster.success('Return Success','suceess');
        this.bookService.getBookByid(bookId).subscribe({
          next:data=>{
            const currentQuantity = data?.quantity;
            if (currentQuantity > 0) {
              this.bookService.updateCopies(bookId, currentQuantity -1).subscribe({
                next: (updateResponse) => {
                  // alert('Copies updated successfully:');
                },
                error: (updateError) => {
                  console.error('Error updating copies:', updateError);
                },
              });
            } else {
              // alert('No copies available to lend.');
              this.toster.warning('No Copies Available')
            }
          }
        })
      },
      error:error=>{
        console.log(error);
      }
    });
  }


  updateReturnDate(details:ApproveDate):void{
    this.requestService.approveDate(details).subscribe({
      next: (data:any) => {
        console.log(data);
      },
      error:error=>{
        alert(error);
        this.toster.error('Error In Update Return Date')
      }
    })
  }

}
