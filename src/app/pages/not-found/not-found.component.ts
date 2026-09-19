import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.set({
      title: 'Page not found',
      description: 'The page you are looking for does not exist or has moved.',
      path: '/',
      noindex: true,
    });
  }
}
