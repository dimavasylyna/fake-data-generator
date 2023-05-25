interface BaseQueryParams {
  limit?: number;
  offset?: number;
  orders?: {
    [key: string]: 'asc' | 'desc';
  };
}
interface Settings<T, K> {
  itemCreator: () => T;
  filtersHandler?: (data: T[], params?: K) => T[];
  itemsQuantity?: number;
  limit?: number;
  offset?: number;
}

interface Meta {
  meta: {
    total: number;
    limit: number;
    offset: number;
  };
}

interface OutputModel<T> extends Meta {
  data: T[];
}

/**
 * A class to generate and handle fake data.
 * @template T the type of items to be generated.
 * @template K the type of parameters for filtering items.
 */
export class FakeDataGenerator<T, K extends BaseQueryParams> {
  private readonly itemsQuantity;
  private readonly limit;
  private readonly offset;
  private readonly data: T[];
  private readonly outputModel: OutputModel<T>;

  // the function to create an item
  private readonly itemCreator: () => T;

  // optional function to filter the items
  private readonly filtersHandler?: (data: T[], params?: K) => T[];

  constructor(settings: Settings<T, K>) {
    this.itemCreator = settings.itemCreator;
    this.filtersHandler = settings.filtersHandler;
    this.limit = settings.limit || 20;
    this.offset = settings.offset || 0;
    this.itemsQuantity = settings.itemsQuantity || 50;

    this.data = this.generateRandomList(this.itemsQuantity);
    this.outputModel = {
      data: this.data,
      meta: {
        total: this.itemsQuantity,
        limit: this.limit,
        offset: this.offset,
      },
    };
  }

  /**
   * Generate a list of items.
   * @param count the number of items to be generated.
   * @returns an array of items.
   */
  private generateRandomList(count: number): T[] {
    const res = Array.from({ length: count }, this.itemCreator);

    return res;
  }

  /**
   * Get data by parameters.
   * @param params optional parameters for filtering items.
   * @returns an output model with filtered items and metadata.
   */
  getDataByParams(params?: K): OutputModel<T> {
    // return all data if no filters are provided
    if (params?.offset === undefined || params?.limit === undefined || !this.filtersHandler) {
      return { ...this.outputModel, data: this.data };
    }

    const filteredData = this.filtersHandler(this.data, params);

    const dataByParams = filteredData.slice(params.offset, params.offset + params.limit);

    return {
      meta: { ...this.outputModel.meta, limit: params.limit, offset: params.offset },
      data: dataByParams,
    };
  }
}
