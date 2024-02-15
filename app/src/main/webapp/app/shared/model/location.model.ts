import { type ICountry } from '@/shared/model/country.model';
import { type IDepartment } from '@/shared/model/department.model';

export interface ILocation {
  id?: number;
  streetAddress?: string | null;
  postalCode?: string | null;
  city?: string | null;
  stateProvince?: string | null;
  country?: ICountry | null;
  department?: IDepartment | null;
}

export class Location implements ILocation {
  constructor(
    public id?: number,
    public streetAddress?: string | null,
    public postalCode?: string | null,
    public city?: string | null,
    public stateProvince?: string | null,
    public country?: ICountry | null,
    public department?: IDepartment | null,
  ) {}
}
