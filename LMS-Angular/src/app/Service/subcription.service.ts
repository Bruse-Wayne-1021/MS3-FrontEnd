import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubcriptionService {

  constructor(private http:HttpClient) { }

  getAllSubscription(){
    return this.http.get<any>("http://localhost:5255/api/Subcription/allSubscription")
  }
}
