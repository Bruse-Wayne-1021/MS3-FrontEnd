import { Component } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private userservice:UserService,private router:Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login Data:', this.loginForm.value);
    }
  }

  login(){
    console.log(this.loginForm.value);
    this.userservice.login(this.loginForm.value).subscribe(data=>{
      console.log(data);
      localStorage.setItem('token',data.token);
      if(data){
        const decoded :any =jwtDecode(data.token);
        localStorage.setItem('User',JSON.stringify(  decoded));

        const userRole=decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        if(userRole=="Member"){
          this.router.navigate(['/member/book-gallery']);

        }
        else if(userRole =="Admin"){
          this.router.navigate(['/admin'])
        }
        else{
          console.log("unknown user role", userRole);

        }

      }

    })

  }

}
