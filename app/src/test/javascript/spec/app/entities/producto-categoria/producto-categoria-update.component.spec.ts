/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import ProductoCategoriaUpdateComponent from '@/entities/producto-categoria/producto-categoria-update.vue';
import ProductoCategoriaClass from '@/entities/producto-categoria/producto-categoria-update.component';
import ProductoCategoriaService from '@/entities/producto-categoria/producto-categoria.service';

import ProductoService from '@/entities/producto/producto.service';

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
  describe('ProductoCategoria Management Update Component', () => {
    let wrapper: Wrapper<ProductoCategoriaClass>;
    let comp: ProductoCategoriaClass;
    let productoCategoriaServiceStub: SinonStubbedInstance<ProductoCategoriaService>;

    beforeEach(() => {
      productoCategoriaServiceStub = sinon.createStubInstance<ProductoCategoriaService>(ProductoCategoriaService);

      wrapper = shallowMount<ProductoCategoriaClass>(ProductoCategoriaUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          productoCategoriaService: () => productoCategoriaServiceStub,

          productoService: () => new ProductoService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.productoCategoria = entity;
        productoCategoriaServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(productoCategoriaServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.productoCategoria = entity;
        productoCategoriaServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(productoCategoriaServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProductoCategoria = { id: 123 };
        productoCategoriaServiceStub.find.resolves(foundProductoCategoria);
        productoCategoriaServiceStub.retrieve.resolves([foundProductoCategoria]);

        // WHEN
        comp.beforeRouteEnter({ params: { productoCategoriaId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.productoCategoria).toBe(foundProductoCategoria);
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
