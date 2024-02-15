import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICliente } from '@/shared/model/cliente.model';
import ClienteService from './cliente.service';

@Component
export default class ClienteDetails extends Vue {
  @Inject('clienteService') private clienteService: () => ClienteService;
  public cliente: ICliente = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.clienteId) {
        vm.retrieveCliente(to.params.clienteId);
      }
    });
  }

  public retrieveCliente(clienteId) {
    this.clienteService()
      .find(clienteId)
      .then(res => {
        this.cliente = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
