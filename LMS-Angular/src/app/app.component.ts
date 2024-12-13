import { Component } from '@angular/core';
import { LoadingService } from './Service/loading-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LMS-Angular';
  isLoading = false;

  constructor(private loadingService: LoadingService) {
    this.loadingService.loading$.subscribe(
      (loading) => (this.isLoading = loading)
    );
  }
}
