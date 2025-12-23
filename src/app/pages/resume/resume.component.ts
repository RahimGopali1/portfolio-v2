import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';

@Component({
  selector: 'resume',
  imports: [
    CommonModule,
    MatTabsModule,
    MatProgressBarModule,
    // ProgressBarComponent,
  ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
})
export class ResumeComponent implements AfterViewInit {
  @ViewChildren('progressBar') progressBarsElements!: QueryList<ElementRef>;

  ngAfterViewInit() {
    setTimeout(() => {
      this.progressBarsElements.forEach((progressBar) => {
        const progressElement = progressBar.nativeElement;
        const progressValue = progressElement.getAttribute('data-done');

        progressElement.style.width = progressValue + '%';
        progressElement.style.opacity = '1';
      });
    }, 100);
  }
}
