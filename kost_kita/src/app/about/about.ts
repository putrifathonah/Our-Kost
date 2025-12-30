import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
})
export class About {
  isLoading = true;
  errorMessage: string | null = null;

  goBack() {
    window.history.back();
  }
}
