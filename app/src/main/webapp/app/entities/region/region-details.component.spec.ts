/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import RegionDetails from './region-details.vue';
import RegionService from './region.service';
import AlertService from '@/shared/alert/alert.service';

type RegionDetailsComponentType = InstanceType<typeof RegionDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const regionSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('Region Management Detail Component', () => {
    let regionServiceStub: SinonStubbedInstance<RegionService>;
    let mountOptions: MountingOptions<RegionDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      regionServiceStub = sinon.createStubInstance<RegionService>(RegionService);

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
          regionService: () => regionServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        regionServiceStub.find.resolves(regionSample);
        route = {
          params: {
            regionId: '' + 123,
          },
        };
        const wrapper = shallowMount(RegionDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.region).toMatchObject(regionSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        regionServiceStub.find.resolves(regionSample);
        const wrapper = shallowMount(RegionDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
