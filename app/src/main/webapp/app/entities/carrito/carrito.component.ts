import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ICarrito } from '@/shared/model/carrito.model';

import CarritoService from './carrito.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Carrito extends Vue {
  @Inject('carritoService') private carritoService: () => CarritoService;
  private removeId: number = null;

  public carritos: ICarrito[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllCarritos();
  }

  public clear(): void {
    this.retrieveAllCarritos();
  }

  public retrieveAllCarritos(): void {
    this.isFetching = true;
    this.carritoService()
      .retrieve()
      .then(
        res => {
          this.carritos = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: ICarrito): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeCarrito(): void {
    this.carritoService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('deliveryApp.carrito.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllCarritos();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
