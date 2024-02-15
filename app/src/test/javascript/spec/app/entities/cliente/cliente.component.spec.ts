/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ClienteComponent from '@/entities/cliente/cliente.vue';
import ClienteClass from '@/entities/cliente/cliente.component';
import ClienteService from '@/entities/cliente/cliente.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.component('jhi-sort-indicator', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('Cliente Management Component', () => {
    let wrapper: Wrapper<ClienteClass>;
    let comp: ClienteClass;
    let clienteServiceStub: SinonStubbedInstance<ClienteService>;

    beforeEach(() => {
      clienteServiceStub = sinon.createStubInstance<ClienteService>(ClienteService);
      clienteServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ClienteClass>(ClienteComponent, {
        store,
        i18n,
        localVue,
        stubs: { jhiItemCount: true, bPagination: true, bModal: bModalStub as any },
        provide: {
          clienteService: () => clienteServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      clienteServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllClientes();
      await comp.$nextTick();

      // THEN
      expect(clienteServiceStub.retrieve.called).toBeTruthy();
      expect(comp.clientes[0]).toEqual(expect.objectContaining({ id: 123 }));
    });

    it('should load a page', async () => {
      // GIVEN
      clienteServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();

      // THEN
      expect(clienteServiceStub.retrieve.called).toBeTruthy();
      expect(comp.clientes[0]).toEqual(expect.objectContaining({ id: 123 }));
    });

    it('should not load a page if the page is the same as the previous page', () => {
      // GIVEN
      clienteServiceStub.retrieve.reset();
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(clienteServiceStub.retrieve.called).toBeFalsy();
    });

    it('should re-initialize the page', async () => {
      // GIVEN
      clienteServiceStub.retrieve.reset();
      clienteServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();
      comp.clear();
      await comp.$nextTick();

      // THEN
      expect(clienteServiceStub.retrieve.callCount).toEqual(3);
      expect(comp.page).toEqual(1);
      expect(comp.clientes[0]).toEqual(expect.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,asc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // GIVEN
      comp.propOrder = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,asc', 'id']);
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      clienteServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeCliente();
      await comp.$nextTick();

      // THEN
      expect(clienteServiceStub.delete.called).toBeTruthy();
      expect(clienteServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
