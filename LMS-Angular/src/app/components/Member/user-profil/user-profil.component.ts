import { UserService } from './../../../Service/user.service';
import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../Service/request.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.css'
})
export class UserProfilComponent implements OnInit{

  userData:any;
  userid!:string;
  memberId!:string;
  userForm!:FormGroup;
  isEditMode:boolean =false;

  constructor(private requestService:RequestService
    ,private userservie:UserService,private fb:FormBuilder,
    private router:Router,
    private toastr: ToastrService
  ){
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
    this.userForm=this.fb.group({
      email:this.userData.email,
      firstName:this.userData.firstName,
      lastName:this.userData.lastName,
      imageUrl:this.userData.imageUrl,
      phoneNumber:this.userData.phoneNumber
    });

  }


  getmemberdetails(memberID:string):void{
    this.userservie.getMemberdetails(memberID).subscribe({
      next:response=>{
        this.userData=response
        console.log(this.userData);

        this.userForm.patchValue({
          email:this.userData.email,
          firstName:this.userData.firstName,
          lastName:this.userData.lastName,
          imageUrl:this.userData.imageUrl,
          phoneNumber:this.userData.phoneNumber

        })
      },
      error: (error:any) =>{
        console.log(error);
      }
    })
  };

  enableEdit():void{
    this.isEditMode=true;
    this.userForm.enable();
  }


  saveDetails():void{
    if(this.userForm.valid){
      const updatedata=this.userForm.value;
      console.log(updatedata);
      this.userservie.updateMemberDetails(this.memberId,updatedata).subscribe({
        next:()=>{
          this.toastr.success('Edit Profile Successfully', 'Success');
          this.router.navigate(['/login']);
        },
        error:err=>{
          console.log(err);
        }
      })
    }
    else{
      alert("Form IS Invalid")
    }
  }





}
