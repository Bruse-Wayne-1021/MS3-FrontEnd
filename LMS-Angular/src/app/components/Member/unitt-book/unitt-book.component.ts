import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { BookService } from '../../../Service/book.service';
import { BookLendService, IBookRequest, state } from '../../../Service/book-lend.service';
import { UserService } from '../../../Service/user.service';

@Component({
  selector: 'app-unitt-book',
  templateUrl: './unitt-book.component.html',
  styleUrls: ['./unitt-book.component.css']
})
export class UnittBookComponent implements OnInit {

  currentId!: string;
  books: any;
  memberId!: string;
  userid!:string;

  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookservice: BookService,
    private booklend: BookLendService,
    private userService: UserService
  ) {
    const tid = this.route.snapshot.paramMap.get("id");
    this.currentId = String(tid);
  }

  ngOnInit(): void {
    if (this.currentId) {
      this.subscription.add(
        this.bookservice.getBookByid(this.currentId).subscribe({
          next: (data) => {
            console.log('Book data:', data);
            this.books = data;
          },
          error: (err) => console.error('Error fetching book:', err)
        })
      );
    }
    const userdata = localStorage.getItem('User');
    if (!userdata) {
      alert('User not logged in!');
      return;
    }
    const parsedata = JSON.parse(userdata);
    const member = parsedata['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.userid=member;
    console.log(this.userid);

  }

  BookRequest() {
    this.subscription.add(
      this.userService.getMemeberBtid(this.userid).pipe(
        tap((userIdData) => {
          if (!userIdData || !userIdData.memberID) {
            throw new Error('Member ID not found.');
          }
          console.log(userIdData);

          this.memberId = userIdData.memberID;

          console.log(this.memberId);
          console.log(this.books.bookid);
        }),
        switchMap(() => {
          const requestPayload: IBookRequest = {
            bookId: this.currentId,
            memebID: this.memberId,
            state:state.Request
          };
          return this.booklend.postBookRequest(requestPayload);
        })
      ).subscribe({
        next: (response) => {
          alert('Book request sent successfully!');
        },
        error: (err) => {
          alert(`Error: ${err.message}`);
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}






