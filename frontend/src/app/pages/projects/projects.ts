import { Component } from '@angular/core';
import { ProjectCard } from '../../components/project-card/project-card';

@Component({
  selector: 'app-projects',
  imports: [ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  projects = [
    {
      title: 'Titanic Predictor',
      description: 'ML model to predict survival'
    },
    {
      title: 'Sentiment Analysis',
      description: 'Text classification using NLP'
    }
  ];
}
