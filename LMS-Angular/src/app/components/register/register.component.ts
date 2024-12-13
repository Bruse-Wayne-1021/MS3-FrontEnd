import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { optDetails, UserService } from '../../Service/user.service';

declare var bootstrap: any; // Declare for Bootstrap's JS functionality

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  userDetails: any;
  userid!: string;
  otpCode: string[] = ['', '', '', '', '', '']; // Array to hold OTP digits

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

  ngOnInit(): void {}

  RegUser() {
    if (this.signupForm.valid) {
      const formData = {
        ...this.signupForm.value,
        userGender: this.signupForm.value.userGender === 'Male' ? 1 : 0,
      };

      this.userService.Register(formData).subscribe(
        (data) => {
          console.log('Registration Successful:', data);
          window.alert('Registration successful!');
          this.signupForm.reset();

          // Save user details and ID
          this.userDetails = data;
          this.userid = this.userDetails.userId;
          console.log(this.userid);
          console.log(this.userDetails);

          // Show OTP modal
          const otpModal = new bootstrap.Modal(
            document.getElementById('otpModal')
          );
          otpModal.show();
        },
        (error) => {
          console.error('Registration Failed:', error);
          window.alert('Registration failed. Please try again.');
        }
      );
    } else {
      console.log('Form is invalid');
      window.alert('Please fill in all required fields correctly.');
    }
  }

  // Convert the otpCode array into a string for the backend
  get otpCodeString(): string {
    return this.otpCode.join('');
  }

  verifyOtp() {
    const payload: optDetails = {
      userId: this.userid,
      otpCode: this.otpCodeString, // Send the concatenated OTP code as a string
    };

    this.userService.verifyOtp(payload).subscribe({
      next: (data) => {
        console.log('OTP Verification Successful:', data);
        window.alert('OTP verified! Redirecting to login page.');
        const otpModal = bootstrap.Modal.getInstance(
          document.getElementById('otpModal')
        );
        otpModal.hide(); // Hide the modal after successful verification
        this.router.navigate(['/login']); // Navigate to login page
      },
      error: (err) => {
        console.error('OTP Verification Failed:', err);
        window.alert('Invalid OTP. Please try again.');
      },
    });
  }
}
