import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { BookService } from '../../Service/book.service';
import { SubcriptionService } from '../../Service/subcription.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit  {
  isCollapsed = false;

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

memberCount: number | null = null;
  allMembers: any[] = [];
  bookCount: number | null = null;
  allBooks: any[] = [];
  ebookCount: number | null = null;
  paperBook:number|null=null;
  allsubs: any[] = [];
  MonthlySub:number | null = null;
  yearlySub:number | null = null;
  subsCount: number | null = null;
  ActiveSubsCount:number | null = null;

  constructor(
    private userService: UserService,
    private bookService: BookService,
    private subcriptionServie:SubcriptionService
  ) {}

  ngOnInit(): void {
    this.getMembersCount();
    this.getAllBooks();
    this.GetSubcription();
  }

  getMembersCount(): void {
    this.userService.getAllMembers().subscribe({
      next: (response) => {
        if (response && response.$values) {
          this.allMembers = response.$values;
          this.memberCount = this.allMembers.length;
          console.log(this.memberCount);
        } else {
          console.error('Unexpected data format:', response);
        }
      },
      error: (err) => {
        console.error('Error fetching members:', err);
      }

    });
  }

  getAllBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (response) => {
        if (response && response.$values) {
          this.allBooks = response.$values;
          this.ebookCount = this.allBooks.filter((book) => book.bookType === 1).length;
          this.paperBook=this.allBooks.filter((book)=>book.bookType===0).length;
          this.bookCount = this.allBooks.length;
          console.log('Total Book Count:', this.bookCount);
        } else {
          console.error('Unexpected data format:', response);
        }
      },
      error: (err) => {
        console.error('Error fetching books:', err);
      }
    });
  }

  GetSubcription():void{
    this.subcriptionServie.getAllSubscription().subscribe({
      next:data=>{
        console.log(data);
        if(data&&data.$values){
          this.allsubs=data.$values;
          this.subsCount=this.allsubs.length;
          this.MonthlySub=this.allsubs.filter((d)=>d.subType===0).length;
          this.yearlySub=this.allsubs.filter((f)=>f.subType===0).length;
          this.ActiveSubsCount=this.allsubs.filter((s)=>s.isActive===true).length;
        }else{
          console.error();
        }
      },
      error:err=>{
        console.log(err);
      }
    })
  }
}
