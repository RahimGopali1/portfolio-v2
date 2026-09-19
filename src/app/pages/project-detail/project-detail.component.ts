import { Component, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  getProjectBySlug,
  Project,
} from '../../shared/data/projects.data';
import { SITE_DESCRIPTION } from '../../shared/data/site.config';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  readonly project = signal<Project | undefined>(undefined);

  constructor() {
    // emits synchronously from the resolved route, so SSR sets the metadata
    this.route.paramMap.subscribe((params) => {
      const project = getProjectBySlug(params.get('slug'));
      this.project.set(project);
      this.applySeo(project);
    });
  }

  stackLabel(project: Project): string {
    return (project.stack ?? []).join(', ');
  }

  private applySeo(project: Project | undefined): void {
    if (!project) {
      this.seo.set({ title: 'Project not found', path: '/portfolio', noindex: true });
      return;
    }

    this.seo.set({
      title: project.title,
      description: project.summary ?? SITE_DESCRIPTION,
      path: `/portfolio/${project.slug}`,
      image: project.image,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        url: project.link,
        image: project.image,
      },
    });
  }
}
