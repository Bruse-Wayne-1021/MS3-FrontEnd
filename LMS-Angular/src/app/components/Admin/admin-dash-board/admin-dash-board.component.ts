import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import { BookService } from '../../../Service/book.service';
import { SubcriptionService } from '../../../Service/subcription.service';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css']
})
export class AdminDashBoardComponent implements OnInit{
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
    this.renderExpenseChart();
    this.Subscriptions();
  }

  getMembersCount(): void {
    this.userService.getAllMembers().subscribe({
      next: (response) => {
        if (response && response.$values) {
          this.allMembers = response.$values;
          this.memberCount = this.allMembers.length;
          console.log(this.memberCount);
          this.AllMemberReportChart();
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
          this.AllMemberReportChart();
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

  Subscriptions() {
    new Chart('subscriptionchart', {
      type: 'line',
      data: {
        labels: ['allsubs'],
        datasets: [{
          label: 'Income',
          data: [this.allsubs],
          borderColor: '#7b6ef6',
          backgroundColor: 'rgba(123, 110, 246, 0.2)',
          fill: true
        }]
      }
    });
  }

  AllMemberReportChart() {
    
    new Chart('weeklyReportChart', {
      type: 'bar',
      data: {
        labels: ['Members Count','Book Count'],
        datasets: [{
          label: 'Count',
          data: [this.memberCount,this.bookCount],
          backgroundColor: '#f5317f'
        }]
      }
    });
  }

  renderExpenseChart() {
    new Chart('subscription', {
      type: 'doughnut',
      data: {
        labels: ['Monthly', 'Annual'],
        datasets: [{
          data: [this.MonthlySub, this.yearlySub],
          backgroundColor: ['#7b6ef6', '#f5317f']
        }]
      }
    });
  }

  selectedDate: Date = new Date(); 
}
