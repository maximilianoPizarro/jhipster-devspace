/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import ClienteUpdateComponent from '@/entities/cliente/cliente-update.vue';
import ClienteClass from '@/entities/cliente/cliente-update.component';
import ClienteService from '@/entities/cliente/cliente.service';

import UserService from '@/admin/user-management/user-management.service';

import CarritoService from '@/entities/carrito/carrito.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('Cliente Management Update Component', () => {
    let wrapper: Wrapper<ClienteClass>;
    let comp: ClienteClass;
    let clienteServiceStub: SinonStubbedInstance<ClienteService>;

    beforeEach(() => {
      clienteServiceStub = sinon.createStubInstance<ClienteService>(ClienteService);

      wrapper = shallowMount<ClienteClass>(ClienteUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          clienteService: () => clienteServiceStub,

          userService: () => new UserService(),

          carritoService: () => new CarritoService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.cliente = entity;
        clienteServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(clienteServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.cliente = entity;
        clienteServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(clienteServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCliente = { id: 123 };
        clienteServiceStub.find.resolves(foundCliente);
        clienteServiceStub.retrieve.resolves([foundCliente]);

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
