import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { PROJECTS } from '../../data/projects.data';

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
    { initialValue: null }
  );

  project = computed(() =>
    PROJECTS.find(p => p.id === this.id())
  );

}
