import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      nic: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      userGender: [''],
      imageUrl: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {

  }

  RegUser() {
    if (this.signupForm.valid) {
      const formData = {
        ...this.signupForm.value,
        userGender: this.signupForm.value.userGender === 'Male' ? 1 : 0,
      };

      this.userService.Register(formData).subscribe(
        (data) => {
          console.log('Registration Successful:', data);
          this.router.navigate(['/'])

        },
        (error) => {
          console.error('Registration Failed:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
