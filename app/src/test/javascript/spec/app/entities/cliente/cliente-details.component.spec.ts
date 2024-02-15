/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ClienteDetailComponent from '@/entities/cliente/cliente-details.vue';
import ClienteClass from '@/entities/cliente/cliente-details.component';
import ClienteService from '@/entities/cliente/cliente.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Cliente Management Detail Component', () => {
    let wrapper: Wrapper<ClienteClass>;
    let comp: ClienteClass;
    let clienteServiceStub: SinonStubbedInstance<ClienteService>;

    beforeEach(() => {
      clienteServiceStub = sinon.createStubInstance<ClienteService>(ClienteService);

      wrapper = shallowMount<ClienteClass>(ClienteDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { clienteService: () => clienteServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundCliente = { id: 123 };
        clienteServiceStub.find.resolves(foundCliente);

        // WHEN
        comp.retrieveCliente(123);
        await comp.$nextTick();

        // THEN
        expect(comp.cliente).toBe(foundCliente);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCliente = { id: 123 };
        clienteServiceStub.find.resolves(foundCliente);

        // WHEN
        comp.beforeRouteEnter({ params: { clienteId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.cliente).toBe(foundCliente);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
