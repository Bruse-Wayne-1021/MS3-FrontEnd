import { Component } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private userservice:UserService,private router:Router,private toastr: ToastrService) {
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
    this.userservice.login(this.loginForm.value).subscribe({
      next: (data:any) => {
        console.log(data);

        if (data && data.token) {
          this.toastr.success('Login Successful!', 'Success');
          
          localStorage.setItem('token', data.token);

          const decoded: any = jwtDecode(data.token);
          localStorage.setItem('User', JSON.stringify(decoded));

          const userRole = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

          if (userRole === 'Member') {
            this.router.navigate(['/member/book-gallery']);
          } else if (userRole === 'Admin') {
            this.router.navigate(['/admin']);
          } else {
            this.toastr.error('Unknown user role', 'Error');
            console.log('Unknown user role', userRole);
          }
        } else {
          this.toastr.error('Login failed, please try again', 'Error');
        }
      },
      error: (error:any) => {
        console.error('Login Error:', error.error);
        this.toastr.error('Login failed, please try again', 'Error');
      }
    });

  }

}
