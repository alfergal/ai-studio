import { Component, inject, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { PROJECTS, Project } from '../../data/projects.data';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule],
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
  probability = signal<number | null>(null);
  loading = signal(false);
  percentage = computed(() => {
    if (this.probability() === null) return null;
    return Math.round(this.probability()! * 100);
  });
  barColor = computed(() => {
    if (this.probability() === null) return '#ef4444';
    return this.probability()! > 0.5 ? '#22c55e' : '#ef4444';
  });

  predict() {
    const payload = {
      age: this.age(),
      sex: this.sex(),
      pclass: this.pclass(),
      fare: this.fare(),
      familySize: this.familySize()
    };

    this.loading.set(true);
    this.result.set(null);
    this.probability.set(null);
    this.api.predict(payload)
      .pipe(
        finalize(() => {
          setTimeout(() => this.loading.set(false), 400);
        })
      )
      .subscribe({
        next: (res: any) => {
          this.result.set(res.prediction);
          this.probability.set(res.probability);
        },
        error: () => {
          this.result.set('Error calling API');
        }
      });
  }
}
