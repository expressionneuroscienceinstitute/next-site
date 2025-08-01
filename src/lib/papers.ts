import { StatusTagType } from '@/components/StatusTag'

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  journal?: string;
  year: number;
  url?: string;
  abstract?: string;
  status: StatusTagType;
  updates?: { date: string; description: string }[];
}

export const papers: Paper[] = [
  {
    id: 'insight-design-document-2025',
    title: 'Insight Design Document',
    authors: ['Carney, D.'],
    journal: 'Self-Published',
    year: 2025,
    url: 'https://raw.githubusercontent.com/expressionneuroscienceinstitute/next-site/refs/heads/documents/Insight_Design_Document.pdf',
    abstract: 'The preliminary design document for the Insight Diagnostic Platform, a virtual reality application for the diagnosis and measurement of Binocular Vision Dysfunction (BVD).',
    status: 'published',
    updates: [
      { date: '2025-05-04', description: 'Design document submitted to capstone advisor for review.' },
      { date: '2025-05-05', description: 'Design document uploaded to GitHub.' },
      { date: '2025-05-06', description: 'Design document posted to ENI website.' },
    ]
  },
]; 