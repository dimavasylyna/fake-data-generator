export interface CampaignStudioInputModel {
  dateFrom?: string;
  dateTo?: string;
  /**
   * Search by title, description or url
   */
  search?: null | string | number;
  status?: null | 'active' | 'blocked';
}

export interface CampaignStudioOutputModel {
  data: CampaignStudioItem[];
  meta: {
    total: number;
    limit: number;
    offset?: number;
  };
}

export interface CampaignStudioItem {
  id: number;
  status: 'active' | 'blocked';
  name: string;
  imgLink: string;
  title: string;
  description: string;
  imps: number;
  ctr: number;
  clicks: number;
  startDate: string;
  endDate: string;
  platforms: PlatformLink[];
  url: string;
}
export interface PlatformLink {
  name: string;
  href: string;
}
