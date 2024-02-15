import { type IRegion } from '@/shared/model/region.model';
import { type ILocation } from '@/shared/model/location.model';

export interface ICountry {
  id?: number;
  countryName?: string | null;
  region?: IRegion | null;
  location?: ILocation | null;
}

export class Country implements ICountry {
  constructor(
    public id?: number,
    public countryName?: string | null,
    public region?: IRegion | null,
    public location?: ILocation | null,
  ) {}
}
