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

export const papers: Paper[] = []
 