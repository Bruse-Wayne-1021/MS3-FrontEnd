import { Component } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  LoginForm:FormGroup;
  hidePassword:boolean = true;
  
  constructor(private Userservice:UserService,private fb:FormBuilder){
    this.LoginForm=this.fb.group({
      email:[""],
      password:[""]
    });
  }

  Login(){
    console.log(this.LoginForm.value);
    this.Userservice.login(this.LoginForm.value).subscribe(data=>{
     console.log(data);

    })
  }
}
