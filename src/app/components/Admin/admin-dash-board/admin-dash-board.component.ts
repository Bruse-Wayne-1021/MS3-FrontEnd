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
export class AdminDashBoardComponent implements OnInit {
  memberCount: number | null = null;
  bookCount: number | null = null;
  allMembers: any[] = [];
  allBooks: any[] = [];
  allsubs: any[] = [];
  MonthlySub: number | null = null;
  yearlySub: number | null = null;
  ActiveSubsCount: number | null = null;
  ebookCount: number | null = null;
  paperBook: number | null = null;
  subsCount: number | null = null;
  selectedDate!:Date

  constructor(
    private userService: UserService,
    private bookService: BookService,
    private subcriptionService: SubcriptionService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Fetch all data in parallel
    Promise.all([
      this.getMembersCount(),
      this.getAllBooks(),
      this.GetSubscription()
    ]).then(() => {
      this.renderCharts(); // Render charts after data is fetched
    });
  }

  getMembersCount(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.userService.getAllMembers().subscribe({
        next: (response) => {
          if (response && response.$values) {
            this.allMembers = response.$values;
            this.memberCount = this.allMembers.length;
          }
          resolve();
        },
        error: (err) => {
          console.error('Error fetching members:', err);
          reject(err);
        }
      });
    });
  }

  getAllBooks(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.bookService.getAllBooks().subscribe({
        next: (response) => {
          if (response && response.$values) {
            this.allBooks = response.$values;
            this.ebookCount = this.allBooks.filter((book) => book.bookType === 1).length;
            this.paperBook = this.allBooks.filter((book) => book.bookType === 0).length;
            this.bookCount = this.allBooks.length;
          }
          resolve();
        },
        error: (err) => {
          console.error('Error fetching books:', err);
          reject(err);
        }
      });
    });
  }

  GetSubscription(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.subcriptionService.getAllSubscription().subscribe({
        next: (response) => {
          if (response && response.$values) {
            this.allsubs = response.$values;
            this.subsCount = this.allsubs.length;
            this.MonthlySub = this.allsubs.filter((sub) => sub.subType === 0).length;
            this.yearlySub = this.allsubs.filter((sub) => sub.subType === 1).length;
            this.ActiveSubsCount = this.allsubs.filter((sub) => sub.isActive === true).length;
          }
          resolve();
        },
        error: (err) => {
          console.error('Error fetching subscriptions:', err);
          reject(err);
        }
      });
    });
  }

  renderCharts(): void {
    this.renderSubscriptionChart();
    this.renderMemberBookChart();
    this.renderExpenseChart();
  }

  renderSubscriptionChart(): void {
    new Chart('subscriptionchart', {
      type: 'line',
      data: {
        labels: ['Monthly Subscriptions', 'Yearly Subscriptions'],
        datasets: [{
          label: 'Subscriptions',
          data: [this.MonthlySub, this.yearlySub],
          borderColor: '#7b6ef6',
          backgroundColor: 'rgba(123, 110, 246, 0.2)',
          fill: true
        }]
      }
    });
  }

  renderMemberBookChart(): void {
    new Chart('weeklyReportChart', {
      type: 'bar',
      data: {
        labels: ['Members Count', 'Book Count'],
        datasets: [{
          label: 'Count',
          data: [this.memberCount, this.bookCount],
          backgroundColor: '#f5317f'
        }]
      }
    });
  }

  renderExpenseChart(): void {
    new Chart('subscription', {
      type: 'doughnut',
      data: {
        labels: ['Monthly Subscriptions', 'Yearly Subscriptions'],
        datasets: [{
          data: [this.MonthlySub, this.yearlySub],
          backgroundColor: ['#7b6ef6', '#f5317f']
        }]
      }
    });
  }
}
