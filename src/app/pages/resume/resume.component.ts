import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import {
  EducationItem,
  EDUCATION,
  ExperienceItem,
  EXPERIENCE,
  getExperienceLabel,
  getRoleDurationYears,
} from '../../shared/data/career.data';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'resume',
  imports: [MatTabsModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
})
export class ResumeComponent {
  private readonly seo = inject(SeoService);

  readonly experience: ExperienceItem[] = EXPERIENCE;
  readonly education: EducationItem[] = EDUCATION;
  readonly experienceLabel = getExperienceLabel();

  constructor() {
    this.seo.set({
      title: 'Resume',
      description: `${this.experienceLabel} of experience. Education and work history.`,
      path: '/resume',
    });
  }

  /** Whole years in a role; the current role counts up to today. */
  duration(item: ExperienceItem): number {
    return getRoleDurationYears(item);
  }

  isCurrent(item: ExperienceItem): boolean {
    return item.endYear === null;
  }

  /** e.g. "2022 – 2024" or "2026 – Present". */
  yearRange(item: ExperienceItem | EducationItem): string {
    const end = item.endYear ?? 'Present';
    return `${item.startYear} – ${end}`;
  }
}
