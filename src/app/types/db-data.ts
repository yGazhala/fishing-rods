import { Brand } from './brand';
import { RodType } from './rod-type';
import { Rod } from './rod';
import { Advertisement } from './advertisement';

export type DbData = {
  brands: Brand[];
  rodTypes: RodType[];
  rods: Rod[];
  advertisements: Advertisement[];
};
