import { IProductoOrden } from '@/shared/model/producto-orden.model';
import { ICliente } from '@/shared/model/cliente.model';

import { OrdenStatus } from '@/shared/model/enumerations/orden-status.model';
import { MetodoDePago } from '@/shared/model/enumerations/metodo-de-pago.model';
export interface ICarrito {
  id?: number;
  fecha?: Date;
  status?: OrdenStatus;
  precioTotal?: number;
  metodoDePago?: MetodoDePago;
  referencia?: string | null;
  ordens?: IProductoOrden[] | null;
  cliente?: ICliente;
}

export class Carrito implements ICarrito {
  constructor(
    public id?: number,
    public fecha?: Date,
    public status?: OrdenStatus,
    public precioTotal?: number,
    public metodoDePago?: MetodoDePago,
    public referencia?: string | null,
    public ordens?: IProductoOrden[] | null,
    public cliente?: ICliente
  ) {}
}
