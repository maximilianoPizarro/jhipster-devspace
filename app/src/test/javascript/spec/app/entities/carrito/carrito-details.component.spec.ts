/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import CarritoDetailComponent from '@/entities/carrito/carrito-details.vue';
import CarritoClass from '@/entities/carrito/carrito-details.component';
import CarritoService from '@/entities/carrito/carrito.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Carrito Management Detail Component', () => {
    let wrapper: Wrapper<CarritoClass>;
    let comp: CarritoClass;
    let carritoServiceStub: SinonStubbedInstance<CarritoService>;

    beforeEach(() => {
      carritoServiceStub = sinon.createStubInstance<CarritoService>(CarritoService);

      wrapper = shallowMount<CarritoClass>(CarritoDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { carritoService: () => carritoServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundCarrito = { id: 123 };
        carritoServiceStub.find.resolves(foundCarrito);

        // WHEN
        comp.retrieveCarrito(123);
        await comp.$nextTick();

        // THEN
        expect(comp.carrito).toBe(foundCarrito);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCarrito = { id: 123 };
        carritoServiceStub.find.resolves(foundCarrito);

        // WHEN
        comp.beforeRouteEnter({ params: { carritoId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.carrito).toBe(foundCarrito);
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
