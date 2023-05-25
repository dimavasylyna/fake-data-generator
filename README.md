# FakeDataGenerator
`FakeDataGenerator` is a TypeScript class designed to simplify the creation of fake data for testing or development purposes. It allows you to generate an arbitrary number of items and to provide optional filtering.

## Usage
To instantiate the `FakeDataGenerator`, provide the required settings:
```typescript
const fakeDataGenerator = new FakeDataGenerator<CampaignStudioItem, QueryParams>({
  itemCreator: generateRandomCampaignStudioItem,
  filtersHandler,
});
```

Settings include:

- `itemCreator`: A function that creates a new item. This function will be called the specified number of times to populate the initial data set.
- `filtersHandler`: An optional function to filter the data based on provided parameters. It takes the current data set and the parameters, and returns the filtered data set.
- `itemsQuantity`: The number of items to be initially generated. Default is 50.
- `limit`: The default limit for the data slice to be returned. Default is 20.
- `offset`: The default starting point for the data slice to be returned. Default is 0.

## Methods
`FakeDataGenerator` provides the following methods:

- `getDataByParams(params?: K)`: Get data based on provided parameters. If no filters are provided, it returns all data. If `filtersHandler` is provided, it uses it to filter the data before returning.

## Example
This is an example of a service class using FakeDataGenerator to generate and filter campaign studio items:
```typescript
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
  //...
}
```

In this example, `generateRandomCampaignStudioItem` is a function to generate a random campaign studio item, and `filtersHandler` is a function to filter these items based on `QueryParams`.

You can see the code in more detail in the files.

This is just a basic usage of FakeDataGenerator. You can extend it to fit your own needs. Happy coding!