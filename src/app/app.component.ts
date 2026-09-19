import { Component, HostListener, OnInit, computed, signal } from '@angular/core';
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

  // guarded for SSR where `window` does not exist
  private readonly innerWidth = signal(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  isLoading = true;
  isHidden = false;

  // ---- sidebar state -------------------------------------------------
  // Below this width the rail becomes an overlay (tablet + mobile) so it
  // never compresses the page content / causes text overflow.
  readonly isMobile = computed(() => this.innerWidth() < 992);

  readonly sidebarOpen = signal(true);

  // keep mobile state in sync when the window is resized across the breakpoint
  @HostListener('window:resize')
  onResize(): void {
    this.innerWidth.set(window.innerWidth);
    this.sidebarOpen.set(!this.isMobile());
  }

  onSidebarToggle(): void {
    this.sidebarOpen.update((open) => !open);
  }

  onSidebarNavigate(): void {
    if (this.isMobile()) {
      this.sidebarOpen.set(false);
    }
  }

  ngOnInit(): void {
    this.sidebarOpen.set(!this.isMobile());

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

  // Escape closes the sidebar on mobile
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isMobile() && this.sidebarOpen()) {
      this.sidebarOpen.set(false);
    }
  }
}
