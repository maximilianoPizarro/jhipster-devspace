/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import ProductoUpdateComponent from '@/entities/producto/producto-update.vue';
import ProductoClass from '@/entities/producto/producto-update.component';
import ProductoService from '@/entities/producto/producto.service';

import ProductoCategoriaService from '@/entities/producto-categoria/producto-categoria.service';

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
  describe('Producto Management Update Component', () => {
    let wrapper: Wrapper<ProductoClass>;
    let comp: ProductoClass;
    let productoServiceStub: SinonStubbedInstance<ProductoService>;

    beforeEach(() => {
      productoServiceStub = sinon.createStubInstance<ProductoService>(ProductoService);

      wrapper = shallowMount<ProductoClass>(ProductoUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          productoService: () => productoServiceStub,

          productoCategoriaService: () => new ProductoCategoriaService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.producto = entity;
        productoServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(productoServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.producto = entity;
        productoServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(productoServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProducto = { id: 123 };
        productoServiceStub.find.resolves(foundProducto);
        productoServiceStub.retrieve.resolves([foundProducto]);

        // WHEN
        comp.beforeRouteEnter({ params: { productoId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.producto).toBe(foundProducto);
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
