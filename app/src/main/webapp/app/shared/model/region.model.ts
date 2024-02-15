import { type ICountry } from '@/shared/model/country.model';

export interface IRegion {
  id?: number;
  regionName?: string | null;
  country?: ICountry | null;
}

export class Region implements IRegion {
  constructor(
    public id?: number,
    public regionName?: string | null,
    public country?: ICountry | null,
  ) {}
}
