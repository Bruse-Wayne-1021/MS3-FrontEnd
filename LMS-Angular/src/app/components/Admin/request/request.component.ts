import { state } from './../../../Service/book-lend.service';
import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../Service/request.service';

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
    console.log('Member ID:', this.memberId);

    const todayDate = new Date().toISOString();
    console.log('Today\'s Date:', todayDate);

    this.getUserIdByMemberId();
  }

  getAllRequests(): void {
    this.requestService.getAllRequests(state.Request).subscribe({
      next: (response: any) => {
        this.request = response?.$values || [];
        console.log('Requests:', this.request);
      },
      error: (err) => {
        console.error('Error fetching requests:', err);
        alert('Failed to load requests.');
      },
    });
  }

  approveRequest(lendId: string): void {
    console.log('Lend ID to Approve:', lendId);
    this.lendID = lendId;

    this.requestService.approveRequest(this.lendID, state.Accept).subscribe({
      next: (response: any) => {
        console.log('Approve Response:', response);
        alert('Request Approved Successfully');
        this.updateApproveDate(this.userId);
      },
      error: (err) => {
        console.error('Error approving request:', err);
        alert('Failed to approve request.');
      },
    });
  }

  declineRequest(rejectId: string): void {
    console.log('Lend ID to Decline:', rejectId);
    this.lendID = rejectId;

    this.requestService.approveRequest(this.lendID, state.Decline).subscribe({
      next: (response: any) => {
        console.log('Decline Response:', response);
        alert('Request Rejected Successfully');
      },
      error: (err) => {
        console.error('Error declining request:', err);
        alert('Failed to decline request.');
      },
    });
  }

  getUserIdByMemberId(): void {
    this.requestService.getMemeberBtid(this.memberId).subscribe({
      next: (response: any) => {
        console.log('Member Response:', response);
        this.userId = response?.memberID;
        console.log('User ID:', this.userId);
      },
      error: (err) => {
        console.error('Error fetching member by ID:', err);
        alert('Failed to retrieve user information.');
      },
    });
  }

  updateApproveDate(id: string): void {
    console.log('Updating Approval Date for ID:', id);
    this.requestService.approveDate(id, this.dateType).subscribe({
      next: (response: any) => {
        console.log('Date Update Response:', response);
      },
      error: (err) => {
        console.error('Error updating approval date:', err);
        alert('Failed to update approval date.');
      },
    });
  }
}
