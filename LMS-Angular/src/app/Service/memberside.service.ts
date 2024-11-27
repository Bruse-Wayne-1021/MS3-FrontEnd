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
}

export interface ReservedBook{
  MemberID:string,
  state:state
}
