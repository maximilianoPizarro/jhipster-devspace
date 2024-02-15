/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ProductoOrdenDetailComponent from '@/entities/producto-orden/producto-orden-details.vue';
import ProductoOrdenClass from '@/entities/producto-orden/producto-orden-details.component';
import ProductoOrdenService from '@/entities/producto-orden/producto-orden.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('ProductoOrden Management Detail Component', () => {
    let wrapper: Wrapper<ProductoOrdenClass>;
    let comp: ProductoOrdenClass;
    let productoOrdenServiceStub: SinonStubbedInstance<ProductoOrdenService>;

    beforeEach(() => {
      productoOrdenServiceStub = sinon.createStubInstance<ProductoOrdenService>(ProductoOrdenService);

      wrapper = shallowMount<ProductoOrdenClass>(ProductoOrdenDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { productoOrdenService: () => productoOrdenServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundProductoOrden = { id: 123 };
        productoOrdenServiceStub.find.resolves(foundProductoOrden);

        // WHEN
        comp.retrieveProductoOrden(123);
        await comp.$nextTick();

        // THEN
        expect(comp.productoOrden).toBe(foundProductoOrden);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProductoOrden = { id: 123 };
        productoOrdenServiceStub.find.resolves(foundProductoOrden);

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
