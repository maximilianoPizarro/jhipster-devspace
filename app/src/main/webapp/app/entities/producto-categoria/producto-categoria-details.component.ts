import { Component, Vue, Inject } from 'vue-property-decorator';

import { IProductoCategoria } from '@/shared/model/producto-categoria.model';
import ProductoCategoriaService from './producto-categoria.service';

@Component
export default class ProductoCategoriaDetails extends Vue {
  @Inject('productoCategoriaService') private productoCategoriaService: () => ProductoCategoriaService;
  public productoCategoria: IProductoCategoria = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productoCategoriaId) {
        vm.retrieveProductoCategoria(to.params.productoCategoriaId);
      }
    });
  }

  public retrieveProductoCategoria(productoCategoriaId) {
    this.productoCategoriaService()
      .find(productoCategoriaId)
      .then(res => {
        this.productoCategoria = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
