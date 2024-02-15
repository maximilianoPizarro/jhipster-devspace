/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import LocationDetails from './location-details.vue';
import LocationService from './location.service';
import AlertService from '@/shared/alert/alert.service';

type LocationDetailsComponentType = InstanceType<typeof LocationDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const locationSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('Location Management Detail Component', () => {
    let locationServiceStub: SinonStubbedInstance<LocationService>;
    let mountOptions: MountingOptions<LocationDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      locationServiceStub = sinon.createStubInstance<LocationService>(LocationService);

      alertService = new AlertService({
        i18n: { t: vitest.fn() } as any,
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          'font-awesome-icon': true,
          'router-link': true,
        },
        provide: {
          alertService,
          locationService: () => locationServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        locationServiceStub.find.resolves(locationSample);
        route = {
          params: {
            locationId: '' + 123,
          },
        };
        const wrapper = shallowMount(LocationDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.location).toMatchObject(locationSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        locationServiceStub.find.resolves(locationSample);
        const wrapper = shallowMount(LocationDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
