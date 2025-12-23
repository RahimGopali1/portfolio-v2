import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent implements OnChanges {
  @Input() percent: number = 0;
  @Input() title: string = '';

  dashOffset: number = 628;

  readonly circleRadius: number = 100;
  readonly circleCircumference: number = 2 * Math.PI * this.circleRadius;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['percent']) {
      setTimeout(() => {
        this.updateProgress();
      }, 100);
    }
  }

  private updateProgress(): void {
    const progress = Math.min(Math.max(this.percent, 0), 100);
    this.dashOffset = this.circleCircumference * (1 - progress / 100);
  }
}
