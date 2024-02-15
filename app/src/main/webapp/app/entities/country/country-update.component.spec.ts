/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import CountryUpdate from './country-update.vue';
import CountryService from './country.service';
import AlertService from '@/shared/alert/alert.service';

import RegionService from '@/entities/region/region.service';

type CountryUpdateComponentType = InstanceType<typeof CountryUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const countrySample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<CountryUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('Country Management Update Component', () => {
    let comp: CountryUpdateComponentType;
    let countryServiceStub: SinonStubbedInstance<CountryService>;

    beforeEach(() => {
      route = {};
      countryServiceStub = sinon.createStubInstance<CountryService>(CountryService);
      countryServiceStub.retrieve.onFirstCall().resolves(Promise.resolve([]));

      alertService = new AlertService({
        i18n: { t: vitest.fn() } as any,
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          'font-awesome-icon': true,
          'b-input-group': true,
          'b-input-group-prepend': true,
          'b-form-datepicker': true,
          'b-form-input': true,
        },
        provide: {
          alertService,
          countryService: () => countryServiceStub,
          regionService: () =>
            sinon.createStubInstance<RegionService>(RegionService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(CountryUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.country = countrySample;
        countryServiceStub.update.resolves(countrySample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(countryServiceStub.update.calledWith(countrySample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        countryServiceStub.create.resolves(entity);
        const wrapper = shallowMount(CountryUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.country = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(countryServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        countryServiceStub.find.resolves(countrySample);
        countryServiceStub.retrieve.resolves([countrySample]);

        // WHEN
        route = {
          params: {
            countryId: '' + countrySample.id,
          },
        };
        const wrapper = shallowMount(CountryUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.country).toMatchObject(countrySample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        countryServiceStub.find.resolves(countrySample);
        const wrapper = shallowMount(CountryUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
