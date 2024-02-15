import { IProducto } from '@/shared/model/producto.model';

export interface IProductoCategoria {
  id?: number;
  nombre?: string;
  description?: string | null;
  productos?: IProducto[] | null;
}

export class ProductoCategoria implements IProductoCategoria {
  constructor(public id?: number, public nombre?: string, public description?: string | null, public productos?: IProducto[] | null) {}
}
