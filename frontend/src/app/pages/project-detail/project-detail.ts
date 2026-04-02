import { Component, inject, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { PROJECTS, Project } from '../../data/projects.data';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
})

export class ProjectDetail {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);

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
  pclass = signal<number>(3);
  fare = signal<number>(10);
  familySize = signal<number>(1);
  result = signal<string | null>(null);


  predict() {
    const payload = {
      age: this.age(),
      sex: this.sex(),
      pclass: this.pclass(),
      fare: this.fare(),
      familySize: this.familySize()
    };

    this.api.predict(payload).subscribe((res: any) => {
      this.result.set(res.prediction);
    });
  }
}
