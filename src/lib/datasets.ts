import { StatusTagType } from '@/components/StatusTag'

export interface Dataset {
  id: string
  title: string
  description: string
  viewLink: string
  downloadLink?: string
  status: StatusTagType
  updates?: { date: string; description: string }[];
}

export const datasets: Dataset[] = [
] 