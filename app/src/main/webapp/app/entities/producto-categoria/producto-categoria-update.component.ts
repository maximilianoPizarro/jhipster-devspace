import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import ProductoService from '@/entities/producto/producto.service';
import { IProducto } from '@/shared/model/producto.model';

import { IProductoCategoria, ProductoCategoria } from '@/shared/model/producto-categoria.model';
import ProductoCategoriaService from './producto-categoria.service';

const validations: any = {
  productoCategoria: {
    nombre: {
      required,
    },
    description: {},
  },
};

@Component({
  validations,
})
export default class ProductoCategoriaUpdate extends Vue {
  @Inject('productoCategoriaService') private productoCategoriaService: () => ProductoCategoriaService;
  public productoCategoria: IProductoCategoria = new ProductoCategoria();

  @Inject('productoService') private productoService: () => ProductoService;

  public productos: IProducto[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productoCategoriaId) {
        vm.retrieveProductoCategoria(to.params.productoCategoriaId);
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
    if (this.productoCategoria.id) {
      this.productoCategoriaService()
        .update(this.productoCategoria)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('deliveryApp.productoCategoria.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.productoCategoriaService()
        .create(this.productoCategoria)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('deliveryApp.productoCategoria.created', { param: param.id });
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

  public retrieveProductoCategoria(productoCategoriaId): void {
    this.productoCategoriaService()
      .find(productoCategoriaId)
      .then(res => {
        this.productoCategoria = res;
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
  }
}
