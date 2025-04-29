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

// Start with an empty array, add examples
export const papers: Paper[] = [
  {
    id: 'bvd-mechanisms-2025',
    title: 'Neural Mechanisms Underlying Binocular Vision Dysfunction',
    authors: ['Chen, S.', 'Rodriguez, M.', 'Hart, G.'],
    journal: 'Journal of Vision (submitted)',
    year: 2025,
    url: '', // No URL yet
    abstract: 'Investigating the cortical and subcortical changes associated with BVD using advanced neuroimaging.',
    status: 'coming soon',
    updates: [
      { date: '2024-07-20', description: 'Manuscript submitted for peer review.' },
      { date: '2024-08-15', description: 'Awaiting initial reviewer feedback.' },
    ]
  },
  // Add more papers here as they become available or planned
]; 