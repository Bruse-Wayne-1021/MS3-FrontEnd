import { UserService } from './../../../Service/user.service';
import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../Service/request.service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.css'
})
export class UserProfilComponent implements OnInit{

  userData:any;
  userid!:string;
  memberId!:string;

  constructor(private requestService:RequestService,private userservie:UserService){

  }
  ngOnInit(): void {
    const userdata = localStorage.getItem('User');
    if (!userdata) {
      alert('User not logged in!');
      return;
    }
    const parsedata = JSON.parse(userdata);
    const member = parsedata['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.userid=member;
    console.log(this.userid);

    this.requestService.getMemeberBtid(this.userid).subscribe({
      next: (response:any) => {
        console.log(response);
        this.memberId=response?.memberID;
        console.log(this.memberId);
        this.getmemberdetails(this.memberId);

      },
      error: (error:any) =>
      {
        console.error(error);
      }
    });


  }

  getmemberdetails(memberID:string):void{
    this.userservie.getMemberdetails(memberID).subscribe({
      next:response=>{

        this.userData=response
        console.log(this.userData);

      },
      error: (error:any) =>{
        console.log(error);

      }
    })
  };









}
