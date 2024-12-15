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

  getAllMemberDetails(){
    return this.http.get<any>("http://localhost:5255/api/Member/Get all members")
  }

  DeteteMemberByID(id:string){
    return this.http.delete("http://localhost:5255/api/Member?id="+id)
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
