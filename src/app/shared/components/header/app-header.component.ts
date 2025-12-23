import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class HeaderComponent {
  isActive = false;

  @ViewChild('navbar', { static: false }) navbar!: ElementRef;

  toggleMenu(event: Event): void {
    event.stopPropagation(); // prevents immediate close
    this.isActive = !this.isActive;
  }

  // 🔹 Close on click outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (
      this.isActive &&
      this.navbar &&
      !this.navbar.nativeElement.contains(event.target)
    ) {
      this.isActive = false;
    }
  }

  // 🔹 Close on scroll
  @HostListener('window:scroll')
  onScroll(): void {
    if (this.isActive) {
      this.isActive = false;
    }
  }
}

