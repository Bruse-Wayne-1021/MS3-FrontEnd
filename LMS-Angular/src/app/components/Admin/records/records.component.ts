import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../Service/request.service';
import { state } from '../../../Service/book-lend.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
})
export class RecordsComponent implements OnInit{

  records:any[]=[];

  constructor(private requestService:RequestService){ }

  ngOnInit(): void {
    this.getAllRecords();
  }

  getAllRecords():void{
    this.requestService.getAllRequests(state.Borrowed).subscribe({
      next : (data) => {
        this.records=data?.$values;
        console.log(this.records);
      },
      error : (error) => {
        console.log(error);
      }
    })
  }
}
