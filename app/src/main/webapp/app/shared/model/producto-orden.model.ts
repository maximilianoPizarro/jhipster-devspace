import { IProducto } from '@/shared/model/producto.model';
import { ICarrito } from '@/shared/model/carrito.model';

export interface IProductoOrden {
  id?: number;
  cantidad?: number;
  precioTotal?: number;
  producto?: IProducto;
  cart?: ICarrito;
}

export class ProductoOrden implements IProductoOrden {
  constructor(
    public id?: number,
    public cantidad?: number,
    public precioTotal?: number,
    public producto?: IProducto,
    public cart?: ICarrito
  ) {}
}
