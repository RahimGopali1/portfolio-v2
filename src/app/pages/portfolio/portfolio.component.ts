import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { getExperienceLabel } from '../../shared/data/career.data';
import { PROJECTS } from '../../shared/data/projects.data';
import { SITE_DESCRIPTION } from '../../shared/data/site.config';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, RouterLink],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  private readonly seo = inject(SeoService);

  /** Same derived career data as the Resume page (single source of truth). */
  readonly experienceLabel = getExperienceLabel();

  /** Shared project list (also powers the case-study routes). */
  readonly projects = PROJECTS;

  constructor() {
    this.seo.set({
      title: 'Portfolio',
      description: `${this.experienceLabel} of experience shipping websites and web apps. ${SITE_DESCRIPTION}`,
      path: '/portfolio',
    });
  }
}
