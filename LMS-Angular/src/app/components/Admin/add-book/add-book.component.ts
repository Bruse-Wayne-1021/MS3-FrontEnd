import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit {

  addBookForm!: FormGroup;

  genres: string[] = ['Fiction', 'Non-Fiction', 'Science', 'Fantasy', 'Biography']

  trendingBooks = [
    { title: '', author: '', genre: '', year: '' },


  ]


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addBookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())]]

    });
  }

  OnSubmit(): void {
    if (this.addBookForm.valid) {
      console.log('Book Added Success', this.addBookForm.value);
    }
  }

  onSubmit():void{
    if(this.addBookForm.valid){
      console.log('Book Added:', this.addBookForm.value);
      this.addBookForm.reset();
    }
  }


}
