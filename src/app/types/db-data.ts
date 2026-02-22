import { Brand } from './brand';
import { RodType } from './rod-type';
import { Rod } from './rod';
import { Advertisement } from './advertisement';
import { UserProfileSettings } from './user-profile-settings';

export type DbData = {
  userProfileSettings: UserProfileSettings[];
  brands: Brand[];
  rodTypes: RodType[];
  rods: Rod[];
  advertisements: Advertisement[];
};
