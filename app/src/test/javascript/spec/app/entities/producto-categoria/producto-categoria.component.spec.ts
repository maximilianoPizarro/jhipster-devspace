/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ProductoCategoriaComponent from '@/entities/producto-categoria/producto-categoria.vue';
import ProductoCategoriaClass from '@/entities/producto-categoria/producto-categoria.component';
import ProductoCategoriaService from '@/entities/producto-categoria/producto-categoria.service';

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
  describe('ProductoCategoria Management Component', () => {
    let wrapper: Wrapper<ProductoCategoriaClass>;
    let comp: ProductoCategoriaClass;
    let productoCategoriaServiceStub: SinonStubbedInstance<ProductoCategoriaService>;

    beforeEach(() => {
      productoCategoriaServiceStub = sinon.createStubInstance<ProductoCategoriaService>(ProductoCategoriaService);
      productoCategoriaServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ProductoCategoriaClass>(ProductoCategoriaComponent, {
        store,
        i18n,
        localVue,
        stubs: { jhiItemCount: true, bPagination: true, bModal: bModalStub as any },
        provide: {
          productoCategoriaService: () => productoCategoriaServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      productoCategoriaServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllProductoCategorias();
      await comp.$nextTick();

      // THEN
      expect(productoCategoriaServiceStub.retrieve.called).toBeTruthy();
      expect(comp.productoCategorias[0]).toEqual(expect.objectContaining({ id: 123 }));
    });

    it('should load a page', async () => {
      // GIVEN
      productoCategoriaServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();

      // THEN
      expect(productoCategoriaServiceStub.retrieve.called).toBeTruthy();
      expect(comp.productoCategorias[0]).toEqual(expect.objectContaining({ id: 123 }));
    });

    it('should not load a page if the page is the same as the previous page', () => {
      // GIVEN
      productoCategoriaServiceStub.retrieve.reset();
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(productoCategoriaServiceStub.retrieve.called).toBeFalsy();
    });

    it('should re-initialize the page', async () => {
      // GIVEN
      productoCategoriaServiceStub.retrieve.reset();
      productoCategoriaServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();
      comp.clear();
      await comp.$nextTick();

      // THEN
      expect(productoCategoriaServiceStub.retrieve.callCount).toEqual(3);
      expect(comp.page).toEqual(1);
      expect(comp.productoCategorias[0]).toEqual(expect.objectContaining({ id: 123 }));
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
      productoCategoriaServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeProductoCategoria();
      await comp.$nextTick();

      // THEN
      expect(productoCategoriaServiceStub.delete.called).toBeTruthy();
      expect(productoCategoriaServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
