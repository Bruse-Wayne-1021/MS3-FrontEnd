import { Component, OnInit } from '@angular/core';
import { BookService, Booktype } from '../../../Service/book.service';
import { UserService } from '../../../Service/user.service';
import { Router } from '@angular/router';
import { Subcription, SubcriptionService } from '../../../Service/subcription.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ebook',
  templateUrl: './ebook.component.html',
  styleUrls: ['./ebook.component.css']
})
export class EbookComponent implements OnInit {
  Ebook: any[] = [];
  userid!: string;
  memberId!: string;
  isSubscriptionActive: boolean = false;

  // Modal variables
  modalVisible: boolean = false;
  subscriptionDetails: any = {
    subType: 0, // Default to monthly
    paymentType: 0, // Default to Credit Card
    paymentAmount: 0 // Default to 0, update dynamically
  };

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private subcriptionService: SubcriptionService,
    private router: Router,
    private toster:ToastrService
  ) {}

  ngOnInit(): void {
    const userdata = localStorage.getItem('User');
    if (!userdata) {
      alert('User not logged in!');
      return;
    }

    const parsedata = JSON.parse(userdata);
    const member = parsedata['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.userid = member;

    this.userService.getMemeberBtid(this.userid).subscribe({
      next: (response: any) => {
        this.memberId = response?.memberID;
        this.checkSubscriptionStatus();
      },
      error: (error: any) => {
        console.error(error);
      }
    });

    this.GetEbook();
  }

  checkSubscriptionStatus(): void {
    this.userService.SubcriptionISActivre(this.memberId).subscribe({
      next: (response: boolean) => {
        this.isSubscriptionActive = response;
      },
      error: (error) => {
        console.error('Error checking subscription status:', error);
        this.isSubscriptionActive = false;
      }
    });
  }

  GetEbook(): void {
    this.bookService.getEbook(Booktype.EBook).subscribe({
      next: (data) => {
        this.Ebook = data?.$values || [];
      },
      error: (error) => {
        console.error('Error fetching eBooks:', error);
      }
    });
  }

  printEbook(book: any): void {
    if (!this.isSubscriptionActive) {
      this.openSubscriptionModal();
      return;
    }

    if (!book.filePath) {
      console.error('No eBook content available.');
      return;
    }

    let base64Pdf = book.filePath;
    if (base64Pdf.startsWith('data:application/pdf;base64,')) {
      base64Pdf = base64Pdf.replace('data:application/pdf;base64,', '');
    }

    try {
      const binaryString = atob(base64Pdf);
      const byteArray = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${book.name || 'ebook'}_Details.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error decoding base64 PDF:', error);
    }
  }

  openSubscriptionModal(): void {
    this.modalVisible = true;
  }

  closeSubscriptionModal(): void {
    this.modalVisible = false;
  }

  confirmSubscription(): void {
    const subscriptionData: Subcription = {
      memebID: this.memberId,
      subType: this.subscriptionDetails.subType,
      isActive: true,
      paymentType: this.subscriptionDetails.paymentType,
      paymentAmount: this.subscriptionDetails.paymentAmount
    };

    this.subcriptionService.postSubcriptiob(subscriptionData).subscribe({
      next: () => {
        // alert('Subscription added successfully!');
        this.isSubscriptionActive = true;
        this.toster.success('Subcription Success')
        this.closeSubscriptionModal();

      },
      error: (error) => {
        console.error('Error adding subscription:', error);
        // alert('Failed to add subscription. Please try again.');
        this.toster.error('Subcription Fail')
      }
    });
  }
}
