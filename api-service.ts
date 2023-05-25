import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FakeDataGenerator } from './fake-data-generator';
import { CampaignStudioInputModel, CampaignStudioItem, CampaignStudioOutputModel, PlatformLink } from './models';

interface QueryParams {
  limit?: number;
  offset?: number;
  orders?: {
    [key: string]: 'asc' | 'desc';
  };
  filters?: CampaignStudioInputModel;
}

function generateRandomCampaignStudioItem(): CampaignStudioItem {
  const platforms: PlatformLink[] = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => ({
    name: `Platform ${Math.floor(Math.random() * 1000)}`,
    href: `http://platform${Math.floor(Math.random() * 1000)}.com`,
  }));

  const status: 'active' | 'blocked' = Math.random() < 0.5 ? 'active' : 'blocked';

  const startDate = new Date();

  startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 10));

  const endDate = new Date();

  endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 10));

  const campaignStudioItem: CampaignStudioItem = {
    id: Math.floor(Math.random() * 10000),
    status,
    name: `Campaign ${Math.floor(Math.random() * 1000)}`,
    imgLink: `http://image${Math.floor(Math.random() * 1000)}.com`,
    title: `Title ${Math.floor(Math.random() * 1000)}`,
    description: `Description ${Math.floor(Math.random() * 1000)}`,
    imps: Math.floor(Math.random() * 10000),
    ctr: parseFloat((Math.random() * 100).toFixed(2)),
    clicks: Math.floor(Math.random() * 10000),
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    platforms,
    url: `http://url${Math.floor(Math.random() * 1000)}.com`,
  };

  return campaignStudioItem;
}

function filtersHandler(data: CampaignStudioItem[], params?: QueryParams): CampaignStudioItem[] {
  return params?.filters?.search ? data.filter((item) => item.id === params?.filters?.search) : data;
}

@Injectable({
  providedIn: 'root',
})
export class FakeApiService {
  getCampaignStrudioData(params?: QueryParams): Observable<CampaignStudioOutputModel> {
    const fakeDataGenerator = new FakeDataGenerator<CampaignStudioItem, QueryParams>({
      itemCreator: generateRandomCampaignStudioItem,
      filtersHandler,
    });

    return of(fakeDataGenerator.getDataByParams(params));
  }

  getCampaignStrudioExport(params?: QueryParams & { fields: Array<keyof CampaignStudioItem> }): Observable<string> {
    // eslint-disable-next-line no-console
    console.log(params);

    return of('export string');
  }

  postAppTeaserTeaserBlock(params: { teaserId: number }): Observable<void> {
    // eslint-disable-next-line no-console
    console.log(`Teaser ${params.teaserId} blocked`);

    return of();
  }

  postAppTeaserTeaserUnblock(params: { teaserId: number }): Observable<void> {
    // eslint-disable-next-line no-console
    console.log(`Teaser ${params.teaserId} unblocked`);

    return of();
  }
}
