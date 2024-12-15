import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReturnService {

  constructor(private http:HttpClient) { }

  getAllwaitingBooks(state:number){
    return this.http.get<any>("http://localhost:5255/api/Booklend/Booklend/Status/"+state)
  }
}
