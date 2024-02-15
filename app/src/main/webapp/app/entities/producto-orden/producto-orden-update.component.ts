import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minValue, decimal } from 'vuelidate/lib/validators';

import ProductoService from '@/entities/producto/producto.service';
import { IProducto } from '@/shared/model/producto.model';

import CarritoService from '@/entities/carrito/carrito.service';
import { ICarrito } from '@/shared/model/carrito.model';

import { IProductoOrden, ProductoOrden } from '@/shared/model/producto-orden.model';
import ProductoOrdenService from './producto-orden.service';

const validations: any = {
  productoOrden: {
    cantidad: {
      required,
      numeric,
      min: minValue(0),
    },
    precioTotal: {
      required,
      decimal,
      min: minValue(0),
    },
    producto: {
      required,
    },
    cart: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class ProductoOrdenUpdate extends Vue {
  @Inject('productoOrdenService') private productoOrdenService: () => ProductoOrdenService;
  public productoOrden: IProductoOrden = new ProductoOrden();

  @Inject('productoService') private productoService: () => ProductoService;

  public productos: IProducto[] = [];

  @Inject('carritoService') private carritoService: () => CarritoService;

  public carritos: ICarrito[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productoOrdenId) {
        vm.retrieveProductoOrden(to.params.productoOrdenId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.productoOrden.id) {
      this.productoOrdenService()
        .update(this.productoOrden)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('deliveryApp.productoOrden.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.productoOrdenService()
        .create(this.productoOrden)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('deliveryApp.productoOrden.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    }
  }

  public retrieveProductoOrden(productoOrdenId): void {
    this.productoOrdenService()
      .find(productoOrdenId)
      .then(res => {
        this.productoOrden = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.productoService()
      .retrieve()
      .then(res => {
        this.productos = res.data;
      });
    this.carritoService()
      .retrieve()
      .then(res => {
        this.carritos = res.data;
      });
  }
}
