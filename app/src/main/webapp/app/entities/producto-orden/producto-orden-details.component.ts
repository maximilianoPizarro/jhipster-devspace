import { Component, Vue, Inject } from 'vue-property-decorator';

import { IProductoOrden } from '@/shared/model/producto-orden.model';
import ProductoOrdenService from './producto-orden.service';

@Component
export default class ProductoOrdenDetails extends Vue {
  @Inject('productoOrdenService') private productoOrdenService: () => ProductoOrdenService;
  public productoOrden: IProductoOrden = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productoOrdenId) {
        vm.retrieveProductoOrden(to.params.productoOrdenId);
      }
    });
  }

  public retrieveProductoOrden(productoOrdenId) {
    this.productoOrdenService()
      .find(productoOrdenId)
      .then(res => {
        this.productoOrden = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
