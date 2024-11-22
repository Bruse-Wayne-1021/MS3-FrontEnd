import { Component } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login Data:', this.loginForm.value);
    }
  }
}
