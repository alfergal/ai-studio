import { Component, signal } from '@angular/core';
import { ProjectCard } from '../../components/project-card/project-card';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {

  projects = signal([
    {
      id: 'titanic',
      title: 'Titanic Predictor',
      description: 'ML model to predict survival'
    },
    {
      id: 'sentiment',
      title: 'Sentiment Analysis',
      description: 'Text classification using NLP'
    }
  ]);

}
