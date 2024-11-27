import { state } from './book-lend.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, IterableDiffers } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {
  }

  getAllRequests(state:state){
    return this.http.get<any>("http://localhost:5255/api/Booklend/Booklend/Status/"+state)
  }

  approveRequest(MemberId: string, state: number) {
    return this.http.put(
      `http://localhost:5255/api/Booklend?id=${MemberId}&state=${state}`,
      null
    );
  }

  approveDate(approveDate: ApproveDate){
    const todaydate=new Date().toISOString();
  return this.http.put(`http://localhost:5255/api/Booklend/updateDate?MemberID=${approveDate.MemberID}&Date=${todaydate}&Datetype=${approveDate.Datetype}`,null)
  }

   getMemeberBtid(userid:string){
    return this.http.get<any>("http://localhost:5255/api/User/"+userid)
  }
}


export interface ApproveDate{
  MemberID: string;
  Datetype: string;

}

