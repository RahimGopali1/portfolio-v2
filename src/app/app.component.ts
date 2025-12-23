import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/app-header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'my-portfolio';
  isLoading = true;
  isHidden = false;

  ngOnInit(): void {
    this.showLoadingScreen();
  }

  showLoadingScreen(): void {
    setTimeout(() => {
      this.isHidden = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    }, 3000);
  }
}
