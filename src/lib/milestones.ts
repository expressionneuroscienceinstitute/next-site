export interface Milestone {
  id: string
  title: string
  date: string
  description: string
  status: 'completed' | 'in-progress' | 'planned'
  links?: { url: string; title: string }[]
}

export const milestones: Milestone[] = [
  {
    id: 'insight-launch',
    title: 'Insight Program Launch',
    date: 'Q1 2024',
    description: 'Launch of the Insight program focusing on Binocular Vision Dysfunction research.',
    status: 'completed'
  },
  {
    id: 'dataset-release',
    title: 'First Dataset Release',
    date: 'Q2 2024',
    description: 'Public release of initial BVD research dataset on Zenodo.',
    status: 'in-progress'
  },
  {
    id: 'paper-publication',
    title: 'First Research Paper',
    date: 'Q3 2024',
    description: 'Publication of first research paper on PubPub platform.',
    status: 'planned'
  },
  {
    id: 'community-expansion',
    title: 'Research Community Expansion',
    date: 'Q4 2024',
    description: 'Launch of community research program and collaboration platform.',
    status: 'planned'
  }
] 