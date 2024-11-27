import { ApproveDate, RequestService } from './../../../Service/request.service';
import { state } from './../../../Service/book-lend.service';
import { Component, OnInit } from '@angular/core';
;

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  request: any[] = [];
  memberId!: string;
  lendID!: string;
  dateType: string = "approve";
  userId!: string;
  todaayDate!:Date;

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.getAllRequests();
    const userData = localStorage.getItem('User');
    if (!userData) {
      alert('User not logged in!');
      return;
    }

    const parsedData = JSON.parse(userData);
    this.memberId = parsedData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    console.log( this.memberId);

    const todayDate = new Date().toISOString();
    console.log( todayDate);

    this.getUserIdByMemberId();
  }

  getAllRequests(): void {
    this.requestService.getAllRequests(state.Request).subscribe({
      next: (response: any) => {
        this.request = response?.$values || [];
        console.log( this.request);
      },
      error: (err) => {
        console.error( err);
        alert('Failed to load requests.');
      },
    });
  }

  approveRequest(lendId: string): void {
    console.log( lendId);
    this.lendID = lendId;

    this.requestService.approveRequest(this.lendID, state.Accept).subscribe({
      next: (response: any) => {
        console.log( response);
        alert('Request Approved Successfully');
        const date=new Date().toISOString();

        const payload={
          MemberID:this.lendID,
          Datetype:this.dateType
        }


        this.updateApproveDate(payload);
      },
      error: (err) => {
        console.error( err);
        alert('Failed to approve request.');
      },
    });
  }

  declineRequest(rejectId: string): void {
    console.log( rejectId);
    this.lendID = rejectId;

    this.requestService.approveRequest(this.lendID, state.Decline).subscribe({
      next: (response: any) => {
        console.log( response);
        alert('Request Rejected Successfully');
      },
      error: (err) => {
        console.error( err);
        alert('Failed to decline request.');
      },
    });
  }

  getUserIdByMemberId(): void {
    this.requestService.getMemeberBtid(this.memberId).subscribe({
      next: (response: any) => {
        console.log( response);
        this.userId = response?.memberID;
        console.log('User ID:', this.userId);
      },
      error: (err) => {
        console.error( err);
        alert('Failed to retrieve user information.');
      },
    });
  }

  updateApproveDate(details:ApproveDate): void {

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


