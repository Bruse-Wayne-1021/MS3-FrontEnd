import { AfterViewInit, Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrl: './admin-dash-board.component.css'
})
export class AdminDashBoardComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.renderCharts();
  }

  private renderCharts(): void {
    // Daily Sales Chart
    const dailySalesCtx = document.getElementById('dailySalesChart') as HTMLCanvasElement;
    new Chart(dailySalesCtx, {
      type: 'line',
      data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [
          {
            label: 'Books',
            data: [10, 20, 15, 30, 25, 35, 50],
            borderColor: '#007bff',
            tension: 0.4,
            fill: true,
          },
        ],
      },
    });


    // Email Subscriptions Chart
    const emailSubscriptionsCtx = document.getElementById('emailSubscriptionsChart') as HTMLCanvasElement;
    new Chart(emailSubscriptionsCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Daily Update',
            data: [5, 10, 15, 20, 25, 30],
            backgroundColor: '#28a745',
          },
        ],
      },
    });
  }
  constructor() { }

  ngOnInit(): void {

  }

}
