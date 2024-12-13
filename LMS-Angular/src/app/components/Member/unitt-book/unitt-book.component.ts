import { Rating } from './../../../Service/book.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class UnittBookComponent implements OnInit, OnDestroy {

  currentId!: string;
  books: any;
  memberId!: string;
  userid!: string;
  similarBooks: any[] = [];
  genere!: string;
  private refreceInterval: any;
  averageRating: number = 0;
  starDistribution: number[] = [];
  rating: number = 0;
  maxStarCount: number = 0;
  ratings: number = 0;
  feedback: string = '';
  stars: boolean[] = [false, false, false, false, false];
  mId!: string;
  str!: number;
  membersRating:any[]=[];
  ex:string="2ED730AC-53F6-4DBD-82BD-B5B9C13B796D"

  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookservice: BookService,
    private booklend: BookLendService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const tid = this.route.snapshot.paramMap.get('id');
    if (!tid) {
      alert('Book ID not found!');
      return;
    }
    this.currentId = String(tid);
    const userdata = localStorage.getItem('User');
    if (!userdata) {
      alert('User not logged in!');
      return;
    }
    const parsedata = JSON.parse(userdata);
    const member = parsedata['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.userid = member;
    this.fetchBookDetails();
    this.getrating(this.currentId);
    this.getMemberRating(this.ex)
  }

  ngOnDestroy(): void {
    if (this.refreceInterval) {
      clearInterval(this.refreceInterval);
    }
    this.subscription.unsubscribe();
  }


  rate(starCount: number): void {
    this.rating = starCount;
    this.stars = this.stars.map((_, index) => index < starCount);
    console.log('Selected rating:', this.rating);
  }

  submitRating(): void {

    if (this.rating === 0 || !this.feedback) {
      alert('Please provide a rating and feedback!');
      return;
    }

    const ratingData: Rating = {
      starCount: this.rating,
      feedBack: this.feedback,
      memebID: "FE7BEEA4-F624-4241-F2FE-08DD191E0C4A",
      bookid: this.currentId
    };
    console.log(ratingData);

    this.bookservice.postStarRating(ratingData).subscribe(response => {
      console.log(response);

    });
  }

  fetchBookDetails(): void {
    this.subscription.add(
      this.bookservice.getBookByid(this.currentId).subscribe({
        next: (data) => {
          console.log('Book data:', data);
          this.books = data;
          this.genere = data.genre.bookGenre;
          this.fetchSimilarBooks(this.genere);
        },
        error: (err) => console.error('Error fetching book:', err)
      })
    );
  }

  fetchSimilarBooks(genre: string): void {
    this.bookservice.filterBook(genre).subscribe({
      next: (data) => {
        this.similarBooks = data?.$values || [];
        console.log('Similar books:', this.similarBooks);
      },
      error: (err) => {
        console.error('Error fetching similar books:', err);
      }
    });
  }

  getrating(bid: string): void {
    this.bookservice.getStarSummery(bid).subscribe({
      next: (data: any) => {
        console.log('Rating summary:', data);
        this.averageRating = data.averageRating || 0;
        this.starDistribution = data.starDistribution || [];
        this.maxStarCount = Math.max(...this.starDistribution);
      },
      error: (err) => {
        console.error('Error fetching ratings:', err);
      }
    });
  }

  BookRequest(): void {
    this.subscription.add(
      this.userService.getMemeberBtid(this.userid).pipe(
        tap((userIdData) => {
          if (!userIdData || !userIdData.memberID) {
            throw new Error('Member ID not found.');
          }
          this.memberId = userIdData.memberID;
        }),
        switchMap(() => {
          const requestPayload: IBookRequest = {
            bookId: this.currentId,
            memebID: this.memberId,
            state: state.Request
          };
          return this.booklend.postBookRequest(requestPayload);
        })
      ).subscribe({
        next: () => {
          alert('Book request sent successfully!');
        },
        error: (err) => {
          console.error('Error sending book request:', err);
          alert(`Error: ${err.message}`);
        }
      })
    );
  }

  getMemberRating(memberId: string): void {
    this.bookservice.getMembersRating(memberId).subscribe({
      next: (data) => {
        if (data?.$values && Array.isArray(data.$values)) {
          this.membersRating = data.$values
            .filter((item: any) => item.member)
            .map((item: any) => ({
              starCount: item.starCount,
              feedback: item.feedBack,
              memberName: `${item.member.firstName} ${item.member.lastName}`,
              memberImage: item.member.imageUrl || 'default-image-url',
            }));

        } else {

          this.membersRating = [];
        }
      },
      error: (err) => {
        console.error('Error fetching member ratings:', err);
        this.membersRating = [];
      },
      complete: () => {
        console.log('Member ratings fetching completed.');
      },
    });
  }

  viewAuthorBooks(authorId: string): void {
    this.router.navigate(['/member/book-gallery/authorBooks', authorId]);
  }

  viewbook(bookid: string): void {
    this.router.navigate(['/member/book-gallery/viewbook', bookid]);
  }



}
