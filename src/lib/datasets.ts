export interface Dataset {
  id: string
  title: string
  description: string
  viewLink: string
  downloadLink?: string
  status: 'available' | 'coming soon'
  updates?: { date: string; description: string }[];
}

export const datasets: Dataset[] = [
  // {
  //   id: 'bvd-2024',
  //   title: 'Binocular Vision Dysfunction Dataset 2024',
  //   description: 'A comprehensive dataset of eye-tracking and behavioral data from individuals with binocular vision dysfunction.',
  //   viewLink: 'https://zenodo.org/record/1234567',
  //   downloadLink: 'https://s3.aws.com/eni-datasets/bvd-2024.zip',
  //   status: 'available'
  // },
  // {
  //   id: 'neural-correlates-2023',
  //   title: 'Neural Correlates of Visual Processing',
  //   description: 'fMRI and EEG data from healthy controls and patients with visual processing disorders.',
  //   viewLink: '',
  //   status: 'coming soon',
  //   updates: [
  //     { date: '2024-07-15', description: 'Initial data collection phase completed.' },
  //     { date: '2024-08-01', description: 'Data cleaning and preprocessing started.' },
  //     { date: '2024-09-01', description: 'Expected release Q4 2024.' },
  //   ]
  // },
  // {
  //   id: 'vr-diagnostics-2025',
  //   title: 'VR Diagnostic Task Data (2025 Q1)',
  //   description: 'Data collected from the Insight Program VR diagnostic tasks, including performance and physiological measures.',
  //   viewLink: '',
  //   status: 'coming soon',
  //   updates: [
  //       { date: '2024-06-01', description: 'Pilot testing of VR tasks initiated.' },
  //   ]
  // }
] 