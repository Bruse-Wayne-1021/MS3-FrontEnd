import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { optDetails, UserService } from '../../Service/user.service';
import { ToastrService } from 'ngx-toastr';

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
  base64Image!:string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
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

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.base64Image = (e.target as FileReader).result as string;

        this.signupForm.patchValue({ imageUrl: this.base64Image });
      };
      reader.readAsDataURL(file);
    }
  }

  RegUser() {
    if (this.signupForm.valid) {
      // Get today's date in ISO format (or any format your backend expects)
      const currentDate = new Date().toISOString(); // This will give you the format "YYYY-MM-DDTHH:mm:ss.sssZ"

      // Construct form data and add the registration date
      const formData = {
        ...this.signupForm.value,
        userGender: this.signupForm.value.userGender === 'Male' ? 1 : 0,
        registerDate: currentDate, // Add registration date here
      };

      this.userService.Register(formData).subscribe(
        (data) => {
          this.toastr.success('Registration Successful!', 'Success');
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
          this.toastr.error('Registration Failed!', 'Error');
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
