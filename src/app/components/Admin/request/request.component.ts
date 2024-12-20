import { VerifyDetails } from './../../../Service/user.service';
import { ApproveDate, RequestService } from './../../../Service/request.service';
import { state } from './../../../Service/book-lend.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import { BookService } from '../../../Service/book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  request: any[] = [];
  memberId!: string;
  lendID!: string;
  dateType: string = 'approve';
  userId!: string;
  todaayDate!: Date;
  isverify: boolean =true;
  memberdetails!: boolean;
  MemId!:string;
  Copies!:number;



  constructor(
    private requestService: RequestService,
    private UserService: UserService,
    private bookService:BookService,
    private toster:ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllRequests();
    const userData = localStorage.getItem('User');
    if (!userData) {
      alert('User not logged in!');
      return;
    }
    const parsedData = JSON.parse(userData);
    this.memberId =
      parsedData[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ];
    console.log( this.memberId);
    const todayDate = new Date().toISOString();
    console.log( todayDate);
    this.getUserIdByMemberId();
    console.log(this.memberdetails);
    this.requestService.getMemeberBtid(this.memberId).subscribe({
      next: (response: any) => {
        console.log( response);
        this.userId = response?.memberID;
        console.log( this.userId);


        // this.getMemberDetAILS(this.userId);
        // this.UserService.getMemberdetails(this.userId).subscribe({
        //   next: (data) => {
        //     console.log( data);
        //     this.memberdetails = data.isVerify;
        //     console.log(this.memberdetails);
        //     // const patload={
        //     //   MemberId:id,
        //     //   isverify:this.memberdetails
        //     // }
        //     // this.verifyUser(patload)
        //   },
        //   error: (err) => {
        //     console.error('Error fetching member details:', err);
        //   },
        // });
      },
      error: (err) => {
        console.error( err);
        // alert('Failed to retrieve user information.');
        this.toster.warning("Failed to retrieve user information.")
      },
    });
  }

  getAllRequests(): void {
    this.requestService.getAllRequests(state.Request).subscribe({
      next: (response: any) => {
        this.request = response?.$values ;
      this.MemId=response?.memberId;
      // this.getMemberDetAILS(this.MemId);
      console.log(this.MemId);
        console.log('Requests:', this.request);

      },
      error: (err) => {
        console.error( err);
        this.toster.error("Failed To fetch")
      },
    });
  }


  approveRequest(lendId: string, isVerify: boolean,bookID:string): void {
    if (!isVerify) {
      // alert("Member is not verified. Approval denied.");
      this.toster.warning("Member is not verified. Approval denied.")
      return;
    }

    console.log('Approve Lend ID:', lendId);
    this.lendID = lendId;
    this.requestService.approveRequest(this.lendID, state.Accept).subscribe({
      next: (response: any) => {
        console.log(response);
        // alert('Request approved successfully.');
        this.toster.success("Request Approved","Success")
        this.getAllRequests();
        const payload={
          MemberID:lendId,
          Datetype:this.dateType
        };

        this.updateApproveDate(payload);

      },
      error: (err) => {
        console.error(err);
        // alert('Failed to approve request.');
        this.toster.error("Failed to approve request")
      },
    });
  }

  declineRequest(rejectId: string): void {
    console.log( rejectId);
    this.lendID = rejectId;
    this.requestService.approveRequest(this.lendID, state.Decline).subscribe({
      next: (response: any) => {
        console.log( response);
        // alert('Request Rejected Successfully');
        this.toster.success("Request Rejected SuccessFully","Success")
      },
      error: (err) => {
        console.error( err);
        // alert('Failed to decline request.');
        this.toster.error("Failed To Decline ")
      },
    });
  }

  getUserIdByMemberId(): void {

  }

  // getMemberDetAILS(id: string): void {
  //   this.UserService.getMemberdetails(id).subscribe({
  //     next: (data) => {
  //       console.log( data);
  //       this.memberdetails = data.isVerify;
  //       console.log(this.memberdetails);
  //       // const patload={
  //       //   MemberId:id,
  //       //   isverify:this.memberdetails
  //       // }
  //       // this.verifyUser(patload)
  //     },
  //     error: (err) => {
  //       console.error('Error fetching member details:', err);
  //     },
  //   });
  // }


  verifyUser(MemberId:string):void{
    const payload={
      MemberId:MemberId,
      isverify:this.isverify
    }
    this.UserService.VerifyMember(payload).subscribe({
      next:data=>{
        // console.log(data);
        this.toster.success("Member SuccessFully Verifyed")
      },
      error:err=>{
        // console.log(err);
        this.toster.error("Member Not Verifyed")
      }
    });
  };


  updateApproveDate(details: ApproveDate): void {
    this.requestService.approveDate(details).subscribe({
      next: (response: any) => {
        console.log( response);
      },
      error: (err) => {
        console.error( err);
      },
    });
  }


}
