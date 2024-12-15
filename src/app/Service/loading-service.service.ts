import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private requestCount = 0;

  constructor(private spinner: NgxSpinnerService) {}

  show(): void {
    this.requestCount++;
    if (this.requestCount === 1) {
      this.spinner.show();
    }
  }

  hide(): void {
    this.requestCount--;
    if (this.requestCount === 0) {
      this.spinner.hide();
    }
  }

}
