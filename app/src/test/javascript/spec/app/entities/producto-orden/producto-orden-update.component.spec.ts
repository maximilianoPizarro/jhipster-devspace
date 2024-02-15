/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import ProductoOrdenUpdateComponent from '@/entities/producto-orden/producto-orden-update.vue';
import ProductoOrdenClass from '@/entities/producto-orden/producto-orden-update.component';
import ProductoOrdenService from '@/entities/producto-orden/producto-orden.service';

import ProductoService from '@/entities/producto/producto.service';

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
  describe('ProductoOrden Management Update Component', () => {
    let wrapper: Wrapper<ProductoOrdenClass>;
    let comp: ProductoOrdenClass;
    let productoOrdenServiceStub: SinonStubbedInstance<ProductoOrdenService>;

    beforeEach(() => {
      productoOrdenServiceStub = sinon.createStubInstance<ProductoOrdenService>(ProductoOrdenService);

      wrapper = shallowMount<ProductoOrdenClass>(ProductoOrdenUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          productoOrdenService: () => productoOrdenServiceStub,

          productoService: () => new ProductoService(),

          carritoService: () => new CarritoService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.productoOrden = entity;
        productoOrdenServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(productoOrdenServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.productoOrden = entity;
        productoOrdenServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(productoOrdenServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProductoOrden = { id: 123 };
        productoOrdenServiceStub.find.resolves(foundProductoOrden);
        productoOrdenServiceStub.retrieve.resolves([foundProductoOrden]);

        // WHEN
        comp.beforeRouteEnter({ params: { productoOrdenId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.productoOrden).toBe(foundProductoOrden);
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
