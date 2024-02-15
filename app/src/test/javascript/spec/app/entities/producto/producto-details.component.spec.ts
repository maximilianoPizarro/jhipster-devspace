/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ProductoDetailComponent from '@/entities/producto/producto-details.vue';
import ProductoClass from '@/entities/producto/producto-details.component';
import ProductoService from '@/entities/producto/producto.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Producto Management Detail Component', () => {
    let wrapper: Wrapper<ProductoClass>;
    let comp: ProductoClass;
    let productoServiceStub: SinonStubbedInstance<ProductoService>;

    beforeEach(() => {
      productoServiceStub = sinon.createStubInstance<ProductoService>(ProductoService);

      wrapper = shallowMount<ProductoClass>(ProductoDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { productoService: () => productoServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundProducto = { id: 123 };
        productoServiceStub.find.resolves(foundProducto);

        // WHEN
        comp.retrieveProducto(123);
        await comp.$nextTick();

        // THEN
        expect(comp.producto).toBe(foundProducto);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProducto = { id: 123 };
        productoServiceStub.find.resolves(foundProducto);

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
