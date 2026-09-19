import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  RESUME_PDF_FILENAME,
  RESUME_PDF_PATH,
} from '../../data/career.data';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
})
export class HeaderComponent {
  /** Whether the sidebar is expanded (owned by the app shell). */
  @Input() open = true;

  /** Extra host classes driven by the app shell (e.g. mobile detection). */
  @HostBinding('class') hostClass = '';

  /** Resume download target (single source: shared/data/career.data.ts). */
  readonly resumePath = RESUME_PDF_PATH;
  readonly resumeFileName = RESUME_PDF_FILENAME;

  /** Emitted when the user clicks the toggle button. */
  @Output() toggle = new EventEmitter<void>();

  /** Emitted when the user clicks a nav link (used to close on mobile). */
  @Output() navigate = new EventEmitter<void>();

  onToggle(event: Event): void {
    event.stopPropagation();
    this.toggle.emit();
  }

  onNavigate(): void {
    this.navigate.emit();
  }
}
