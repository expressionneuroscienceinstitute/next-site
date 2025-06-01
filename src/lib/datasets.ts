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
] 