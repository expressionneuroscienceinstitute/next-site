export interface Paper {
  id: string;
  title: string;
  authors: string[];
  journal?: string;
  year: number;
  url?: string;
  abstract?: string;
  status: 'available' | 'coming soon';
  updates?: { date: string; description: string }[];
}

export const papers: Paper[] = [
  {
    id: 'insight-design-document-2025',
    title: 'Insight Design Document',
    authors: ['Carney, D.'],
    journal: 'Self-Published',
    year: 2025,
    url: '',
    abstract: 'The preliminary design document for the Insight Diagnostic Platform, a virtual reality application for the diagnosis and measurement of Binocular Vision Dysfunction (BVD).',
    status: 'available',
    updates: [
      { date: '2025-05-04', description: 'Design document submitted to capstone advisor for review.' },
      { date: '2025-05-05', description: 'Design document uploaded to GitHub.' },
      { date: '2025-05-06', description: 'Design document posted to ENI website.' },
    ]
  },
]; 