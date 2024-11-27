import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReturnService } from '../../../Service/return.service';
import { state } from '../../../Service/book-lend.service';
import { RequestService } from '../../../Service/request.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrl: './return.component.css'
})
export class ReturnComponent implements OnInit,OnDestroy{

  waitingBook:any[]=[];
  private refreceintervel:any;

  constructor(private returnservice:ReturnService,private requestService:RequestService){ }
  ngOnDestroy(): void {
    if(this.refreceintervel){
      clearInterval(this.refreceintervel)
    }
  }

  ngOnInit(): void {
    this.loaddata();
    this.refreceintervel=setInterval(()=>{
      this.loaddata();
    },1000);
  }

  loaddata():void{
    this.returnservice.getAllwaitingBooks(state.Waiting).subscribe({
      next: (data:any) => {
        this.waitingBook=data?.$values;
        console.log(this.waitingBook);
      },
      error:error=>{
        console.log(error);
      }
    });
  }

  returnBook(lendId:string):void{
    this.requestService.approveRequest(lendId,state.Borrowed).subscribe({
      next: (data:any) => {
        console.log(data);
      },
      error:error=>{
        console.log(error);
      }
    });
    
  }

}
