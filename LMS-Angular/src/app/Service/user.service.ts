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
}
