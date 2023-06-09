import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FakeDataGenerator } from './fake-data-generator';
import { CreativesListInputModel, CreativesListItem, CreativesListOutputModel, MediaLibraryType } from './models';

interface QueryParams {
  limit?: number;
  offset?: number;
  orders?: {
    [key: string]: 'asc' | 'desc';
  };
  filters?: CreativesListInputModel;
}

function generateRandomCreativesListItem(): CreativesListItem {
  const sites: string[] = Array.from(
    { length: Math.floor(Math.random() * 20) + 1 },
    () => `http://platform${Math.floor(Math.random() * 1000)}.com`,
  );

  const status: CreativesListItem['status'] = Math.random() < 0.5 ? 'active' : 'paused';

  const startDate = new Date();

  startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 10));

  const endDate = new Date();

  endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 10));

  const creativesListItem: CreativesListItem = {
    id: Math.floor(Math.random() * 10000),
    status,
    name: `Campaign ${Math.floor(Math.random() * 1000)}`,
    media: {
      link: `https://picsum.photos/${Math.floor(Math.random() * 500)}/${Math.floor(Math.random() * 500)}`,
      type: MediaLibraryType.StaticImage,
    },
    title: `Title ${Math.floor(Math.random() * 1000)}`,
    impressions: Math.floor(Math.random() * 10000),
    ctr: parseFloat((Math.random() * 100).toFixed(2)),
    clicks: Math.floor(Math.random() * 10000),
    goal: Math.floor(Math.random() * 10000),
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    sites,
    url: `http://url${(Math.random().toString(2) + Math.random().toString(2)).substring(
      0,
      Math.floor(Math.random() * 500),
    )}.com`,
  };

  return creativesListItem;
}

function filtersHandler(data: CreativesListItem[], params?: QueryParams): CreativesListItem[] {
  const searchString = params?.filters?.search;
  const status = params?.filters?.status;

  let filteredData =
    typeof searchString === 'string'
      ? data.filter((item) => item.title.toLowerCase().trim().includes(searchString.toLowerCase().trim()))
      : data;

  if (status) {
    filteredData = filteredData.filter((item) => {
      return status === item.status;
    });
  }

  return filteredData;
}

const fakeDataGenerator = new FakeDataGenerator<CreativesListItem, QueryParams>({
  itemCreator: generateRandomCreativesListItem,
  filtersHandler,
});

@Injectable({
  providedIn: 'root',
})
export class FakeApiService {
  getCampaignStudioCreatives(params?: QueryParams): Observable<CreativesListOutputModel> {
    // eslint-disable-next-line no-console
    console.log(params);

    return of(fakeDataGenerator.getDataByParams(params));
  }

  getCampaignStrudioExport(params?: QueryParams & { fields: Array<keyof CreativesListItem> }): Observable<string> {
    // eslint-disable-next-line no-console
    console.log(params);

    return of('export string');
  }

  patchToggleCreativeStatus(params: {
    id: CreativesListItem['id'];
    status: CreativesListItem['status'];
  }): Observable<void> {
    // eslint-disable-next-line no-console
    console.log(`Creative ${params.id} was ${params.status}`);

    return of();
  }

  deleteCreativeById(id: number): Observable<void> {
    // eslint-disable-next-line no-console
    console.log(`Creative ${id} deleted`);

    return of();
  }
}
