/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ProductoCategoriaDetailComponent from '@/entities/producto-categoria/producto-categoria-details.vue';
import ProductoCategoriaClass from '@/entities/producto-categoria/producto-categoria-details.component';
import ProductoCategoriaService from '@/entities/producto-categoria/producto-categoria.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('ProductoCategoria Management Detail Component', () => {
    let wrapper: Wrapper<ProductoCategoriaClass>;
    let comp: ProductoCategoriaClass;
    let productoCategoriaServiceStub: SinonStubbedInstance<ProductoCategoriaService>;

    beforeEach(() => {
      productoCategoriaServiceStub = sinon.createStubInstance<ProductoCategoriaService>(ProductoCategoriaService);

      wrapper = shallowMount<ProductoCategoriaClass>(ProductoCategoriaDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { productoCategoriaService: () => productoCategoriaServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundProductoCategoria = { id: 123 };
        productoCategoriaServiceStub.find.resolves(foundProductoCategoria);

        // WHEN
        comp.retrieveProductoCategoria(123);
        await comp.$nextTick();

        // THEN
        expect(comp.productoCategoria).toBe(foundProductoCategoria);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProductoCategoria = { id: 123 };
        productoCategoriaServiceStub.find.resolves(foundProductoCategoria);

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
