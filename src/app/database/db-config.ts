import { DBConfig } from 'ngx-indexed-db';
import { DbStoreName } from './db-store-name';

export const dbConfig: DBConfig = {
  name: 'fishingRodsDb',
  version: 1,
  objectStoresMeta: [
    {
      store: DbStoreName.USER_PROFILE_SETTINGS,
      storeConfig: { keyPath: 'userId', autoIncrement: false },
      storeSchema: [],
    },
    {
      store: DbStoreName.ROD_TYPES,
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [{ name: 'name', keypath: 'name', options: { unique: true } }],
    },
    {
      store: DbStoreName.BRANDS,
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [{ name: 'name', keypath: 'name', options: { unique: true } }],
    },
    {
      store: DbStoreName.RODS,
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'isFavorite', keypath: 'isFavorite', options: { unique: false } },
        { name: 'typeId', keypath: 'typeId', options: { unique: false } },
        { name: 'brandId', keypath: 'brandId', options: { unique: false } },
        { name: 'model', keypath: 'model', options: { unique: false } },
        { name: 'year', keypath: 'year', options: { unique: false } },
        { name: 'lengthCm', keypath: 'lengthCm', options: { unique: false } },
        { name: 'tipType', keypath: 'tipType', options: { unique: false } },
        { name: 'minLureWeightGrams', keypath: 'minLureWeightGrams', options: { unique: false } },
        { name: 'maxLureWeightGrams', keypath: 'maxLureWeightGrams', options: { unique: false } },
        { name: 'weightGrams', keypath: 'weightGrams', options: { unique: false } },
        { name: 'numberOfSections', keypath: 'numberOfSections', options: { unique: false } },
        { name: 'searchIndex', keypath: 'searchIndex', options: { unique: false } },
      ],
    },
    {
      store: DbStoreName.OFFERS,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'rodId', keypath: 'rodId', options: { unique: false } },
        { name: 'isUsed', keypath: 'isUsed', options: { unique: false } },
        { name: 'priceUAH', keypath: 'priceUAH', options: { unique: false } },
        { name: 'priceUSD', keypath: 'priceUSD', options: { unique: false } },
        { name: 'timestamp', keypath: 'timestamp', options: { unique: false } },
        { name: 'sellerName', keypath: 'sellerName', options: { unique: false } },
      ],
    },
  ],
};
