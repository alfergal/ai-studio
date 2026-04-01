import { Component, inject, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { PROJECTS, Project } from '../../data/projects.data';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
})
export class ProjectDetail {
  private route = inject(ActivatedRoute);

  id = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('id') ?? '')
    ),
    { initialValue: '' }
  );

  project = computed<Project | null>(() =>
    PROJECTS.find(p => p.id === this.id()) ?? null
  );

  age = signal<number | null>(null);
  sex = signal<'male' | 'female'>('male');
  result = signal<string | null>(null);
}
