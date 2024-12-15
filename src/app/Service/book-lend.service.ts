import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookLendService {
  private readonly baseUrl = "http://localhost:5255/api/Booklend/borrow";

  constructor(private http: HttpClient) { }

  postBookRequest(request: IBookRequest) {
    return this.http.post(`http://localhost:5255/api/Booklend/borrow`, request).pipe(
      catchError((error) => {
        console.error('Error in Book Request:', error);
        return throwError(() => new Error('Failed to send book request.'));
      })
    );
  }

}

export interface IBookRequest {
  bookId: string;
  memebID: string;
  state:state
}


export enum state{
  Favaurite=0,
  Request,
  Accept,
  Decline,
  Waiting,
  Borrowed
}
