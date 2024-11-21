import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit{

  addBookForm!: FormGroup;


  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.addBookForm = this.fb.group({
      title:['',Validators.required],
      author:['',Validators.required],
      genre:['',Validators.required],
      year:['',[Validators.required,Validators.pattern('^[0-9]{4}$')]]
    })
  }

  OnSubmit(): void{
    if (this.addBookForm.valid){
      console.log('Book Added Success', this.addBookForm.value);
    }
  }

}
