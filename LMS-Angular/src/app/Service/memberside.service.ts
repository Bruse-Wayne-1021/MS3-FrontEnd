import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { state } from './book-lend.service';

@Injectable({
  providedIn: 'root'
})
export class MembersideService {

  constructor(private http:HttpClient) { }

  getReservedBooks(details:ReservedBook){
    return this.http.get<any>(`http://localhost:5255/api/Booklend/GetRecervedBook?MemberID=${details.MemberID}&state=${details.state}`)
  }

  getWaitingBook(memberid:string,state:number){
    return this.http.get<any>(`http://localhost:5255/api/Booklend/GetRecervedBook?MemberID=${memberid}&state=${state}`)
  }

  postRating(details:Rating){
    return this.http.post<any>("http://localhost:5255/api/Rating",details)
  }

  getNotification(memberID:string){
    return this.http.get<any>(`http://localhost:5255/api/Notification/SentNotifi?MemberID=${memberID}`)
  }


}




export interface ReservedBook{
  MemberID:string,
  state:state
}

export interface Rating{
  starCount:number,
  feedBack:string,
  memebID:string,
  bookid:string

}
