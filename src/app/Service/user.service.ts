import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LToken } from '../Models/Token';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {

   }
   login(user :any) {
    return this.http.post<LToken>("http://localhost:5255/api/Login/login", user);
  }

  IsLoggedIn(){
    if(localStorage.getItem('Token')){
      const token=localStorage.getItem('token');
      if(token){
        const decoded:any=jwtDecode(token);
        localStorage.setItem('user',JSON.stringify(decoded))
      }
      return true;
    }
    return false;
  }

  getMemberdetails(memberid:string){
    return this.http.get<any>("http://localhost:5255/api/Member/Get Member by id?memberid="+memberid)
  }

  Register(user:any){
    return this .http.post("http://localhost:5255/api/Member/new-member",user)
  }

  getMemeberBtid(userid:string){
    return this.http.get<any>("http://localhost:5255/api/User/"+userid)
  }

  VerifyMember(details:VerifyDetails){
    return this.http.put(`http://localhost:5255/api/Member/update isverify?MemberId=${details.MemberId}&isverify=${details.isverify}`,null)
  }

  getNotification(memberID:string){
    return this.http.get<any>(`http://localhost:5255/api/Notification/SentNotifi?MemberID=${memberID}`)
  }

  updateMemberDetails(memberid:string,userDetails:any){
    return this.http.put(`http://localhost:5255/api/Member?id=${memberid}`,userDetails)
  }

  getAllMembers(){
    return this.http.get<any>("http://localhost:5255/api/Member/Get all members")
  }

  verifyOtp(otpDetails:optDetails){
    return this.http.post("http://localhost:5255/api/OTP/verify-otp",otpDetails)
  }

  SubcriptionISActivre(memberID:string){
    return this.http.get<any>("http://localhost:5255/api/Subcription/IsActive/"+memberID)
  }


}

export interface VerifyDetails{
  MemberId:string,
  isverify:boolean
}

export interface optDetails{
  userId:string,
  otpCode:string
}
