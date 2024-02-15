import { IProductoCategoria } from '@/shared/model/producto-categoria.model';

import { Medida } from '@/shared/model/enumerations/medida.model';
export interface IProducto {
  id?: number;
  nombre?: string;
  description?: string | null;
  precio?: number;
  medida?: Medida;
  imageContentType?: string | null;
  image?: string | null;
  productoCategoria?: IProductoCategoria;
}

export class Producto implements IProducto {
  constructor(
    public id?: number,
    public nombre?: string,
    public description?: string | null,
    public precio?: number,
    public medida?: Medida,
    public imageContentType?: string | null,
    public image?: string | null,
    public productoCategoria?: IProductoCategoria
  ) {}
}
