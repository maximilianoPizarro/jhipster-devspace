/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import LocationUpdate from './location-update.vue';
import LocationService from './location.service';
import AlertService from '@/shared/alert/alert.service';

import CountryService from '@/entities/country/country.service';

type LocationUpdateComponentType = InstanceType<typeof LocationUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const locationSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<LocationUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('Location Management Update Component', () => {
    let comp: LocationUpdateComponentType;
    let locationServiceStub: SinonStubbedInstance<LocationService>;

    beforeEach(() => {
      route = {};
      locationServiceStub = sinon.createStubInstance<LocationService>(LocationService);
      locationServiceStub.retrieve.onFirstCall().resolves(Promise.resolve([]));

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
          locationService: () => locationServiceStub,
          countryService: () =>
            sinon.createStubInstance<CountryService>(CountryService, {
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
        const wrapper = shallowMount(LocationUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.location = locationSample;
        locationServiceStub.update.resolves(locationSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(locationServiceStub.update.calledWith(locationSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        locationServiceStub.create.resolves(entity);
        const wrapper = shallowMount(LocationUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.location = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(locationServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        locationServiceStub.find.resolves(locationSample);
        locationServiceStub.retrieve.resolves([locationSample]);

        // WHEN
        route = {
          params: {
            locationId: '' + locationSample.id,
          },
        };
        const wrapper = shallowMount(LocationUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.location).toMatchObject(locationSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        locationServiceStub.find.resolves(locationSample);
        const wrapper = shallowMount(LocationUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
