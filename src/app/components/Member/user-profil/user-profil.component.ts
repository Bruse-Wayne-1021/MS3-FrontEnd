import { UserService } from './../../../Service/user.service';
import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../Service/request.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.css'
})
export class UserProfilComponent  implements OnInit {
  userData: any;
  userid!: string;
  memberId!: string;
  userForm!: FormGroup;
  isEditMode: boolean = false; // Tracks if the form is in edit mode
  isSubmitting: boolean = false; // Tracks if a save operation is in progress
  base64Image!:string;


  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private toster:ToastrService

  ) {}

  ngOnInit(): void {
    const userdata = localStorage.getItem('User');
    if (!userdata) {
      alert('User not logged in!');
      return;
    }

    const parsedata = JSON.parse(userdata);
    const member = parsedata['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.userid = member;
    console.log(this.userid);

    this.userService.getMemeberBtid(this.userid).subscribe({
      next: (response: any) => {
        this.memberId = response?.memberID;
        this.getMemberDetails(this.memberId);
      },
      error: (error: any) => {
        console.error(error);
      }
    });

    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      nic:['',[Validators.required]],
      imageUrl:['',[Validators.required]]
    });
    this.userForm.disable(); // Initially disable form controls
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.base64Image = (e.target as FileReader).result as string;

        this.userForm.patchValue({ imageUrl: this.base64Image });
      };
      reader.readAsDataURL(file);
    }
  }

  getMemberDetails(memberID: string): void {
    this.userService.getMemberdetails(memberID).subscribe({
      next: (response) => {
        this.userData = response;
        this.userForm.patchValue({
          email: this.userData.email,
          firstName: this.userData.firstName,
          lastName: this.userData.lastName,
          phoneNumber: this.userData.phoneNumber,
          nic:this.userData.nic,
          imageUrl:this.userData.imageUrl
        });
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  enableEdit(): void {
    this.isEditMode = true;
    this.userForm.enable(); // Enable form controls for editing
  }

  saveDetails(): void {
    if (this.userForm.valid) {
      this.isSubmitting = true; // Disable save button during submission

      const updatedData = this.userForm.value;
      this.userService.updateMemberDetails(this.memberId, updatedData).subscribe({
        next: () => {
          // alert('Details updated successfully!');
          this.toster.success("Details updated successfully!")
          this.isEditMode = false;
          this.userForm.disable(); // Disable form controls after saving
          this.isSubmitting = false; // Re-enable save button
        },
        error: (err) => {
          console.error(err);
          // alert('Failed to update details.');
          this.toster.error("Failed to update details.")
          this.isSubmitting = false; // Re-enable save button
        }
      });
    } else {
      alert('Form is invalid. Please fill out all required fields correctly.');
    }
  }
}
