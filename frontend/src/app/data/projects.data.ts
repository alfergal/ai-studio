export interface Project {
  id: string;
  title: string;
  description: string;
}

export const PROJECTS: Project[] = [
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
];
