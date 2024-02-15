import { IUser } from '@/shared/model/user.model';
import { ICarrito } from '@/shared/model/carrito.model';

import { Genero } from '@/shared/model/enumerations/genero.model';
export interface ICliente {
  id?: number;
  genero?: Genero;
  telefono?: string;
  direccion1?: string;
  direccion2?: string | null;
  ciudad?: string;
  pais?: string;
  user?: IUser;
  carts?: ICarrito[] | null;
}

export class Cliente implements ICliente {
  constructor(
    public id?: number,
    public genero?: Genero,
    public telefono?: string,
    public direccion1?: string,
    public direccion2?: string | null,
    public ciudad?: string,
    public pais?: string,
    public user?: IUser,
    public carts?: ICarrito[] | null
  ) {}
}
