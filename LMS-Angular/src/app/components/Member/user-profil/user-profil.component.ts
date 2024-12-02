import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.css'
})
export class UserProfilComponent implements OnInit{

  userData:any[]=[];

  constructor(){

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  
}
