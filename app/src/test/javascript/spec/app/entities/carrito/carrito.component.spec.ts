/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import CarritoComponent from '@/entities/carrito/carrito.vue';
import CarritoClass from '@/entities/carrito/carrito.component';
import CarritoService from '@/entities/carrito/carrito.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
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
  describe('Carrito Management Component', () => {
    let wrapper: Wrapper<CarritoClass>;
    let comp: CarritoClass;
    let carritoServiceStub: SinonStubbedInstance<CarritoService>;

    beforeEach(() => {
      carritoServiceStub = sinon.createStubInstance<CarritoService>(CarritoService);
      carritoServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<CarritoClass>(CarritoComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          carritoService: () => carritoServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      carritoServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllCarritos();
      await comp.$nextTick();

      // THEN
      expect(carritoServiceStub.retrieve.called).toBeTruthy();
      expect(comp.carritos[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      carritoServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeCarrito();
      await comp.$nextTick();

      // THEN
      expect(carritoServiceStub.delete.called).toBeTruthy();
      expect(carritoServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
