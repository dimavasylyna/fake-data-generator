/* eslint-disable @typescript-eslint/naming-convention */
import { CreativeStatus } from '@mgx/pub/core/api';

export const MediaLibraryType = {
  StaticImage: 'static-image',
  Video: 'video',
  Animation: 'animation',
} as const;

export interface CreativesListInputModel {
  dateFrom?: string;
  dateTo?: string;
  /**
   * Search by title, name or url
   */
  search?: null | string;
  status?: null | 'active' | 'paused';
}

export interface CreativesListOutputModel {
  data: CreativesListItem[];
  meta: {
    total: number;
    limit: number;
    offset?: number;
  };
}

interface CreativeItemMedia {
  link: string;
  type: MediaLibraryType;
}

export interface CreativesListItem {
  id: number;
  status: CreativeStatus; // 'active' | 'paused'
  name: string;
  media: CreativeItemMedia;
  title: string;
  impressions: number;
  ctr: number;
  clicks: number;
  goal: number;
  startDate: string;
  endDate: string;
  sites: string[];
  url: string;
}
