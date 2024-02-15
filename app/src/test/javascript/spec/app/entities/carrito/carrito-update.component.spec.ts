/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import * as config from '@/shared/config/config';
import CarritoUpdateComponent from '@/entities/carrito/carrito-update.vue';
import CarritoClass from '@/entities/carrito/carrito-update.component';
import CarritoService from '@/entities/carrito/carrito.service';

import ProductoOrdenService from '@/entities/producto-orden/producto-orden.service';

import ClienteService from '@/entities/cliente/cliente.service';

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
  describe('Carrito Management Update Component', () => {
    let wrapper: Wrapper<CarritoClass>;
    let comp: CarritoClass;
    let carritoServiceStub: SinonStubbedInstance<CarritoService>;

    beforeEach(() => {
      carritoServiceStub = sinon.createStubInstance<CarritoService>(CarritoService);

      wrapper = shallowMount<CarritoClass>(CarritoUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          carritoService: () => carritoServiceStub,

          productoOrdenService: () => new ProductoOrdenService(),

          clienteService: () => new ClienteService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('load', () => {
      it('Should convert date from string', () => {
        // GIVEN
        const date = new Date('2019-10-15T11:42:02Z');

        // WHEN
        const convertedDate = comp.convertDateTimeFromServer(date);

        // THEN
        expect(convertedDate).toEqual(dayjs(date).format(DATE_TIME_LONG_FORMAT));
      });

      it('Should not convert date if date is not present', () => {
        expect(comp.convertDateTimeFromServer(null)).toBeNull();
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.carrito = entity;
        carritoServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(carritoServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.carrito = entity;
        carritoServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(carritoServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCarrito = { id: 123 };
        carritoServiceStub.find.resolves(foundCarrito);
        carritoServiceStub.retrieve.resolves([foundCarrito]);

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
