/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import CountryDetails from './country-details.vue';
import CountryService from './country.service';
import AlertService from '@/shared/alert/alert.service';

type CountryDetailsComponentType = InstanceType<typeof CountryDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const countrySample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('Country Management Detail Component', () => {
    let countryServiceStub: SinonStubbedInstance<CountryService>;
    let mountOptions: MountingOptions<CountryDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      countryServiceStub = sinon.createStubInstance<CountryService>(CountryService);

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
          countryService: () => countryServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        countryServiceStub.find.resolves(countrySample);
        route = {
          params: {
            countryId: '' + 123,
          },
        };
        const wrapper = shallowMount(CountryDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.country).toMatchObject(countrySample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        countryServiceStub.find.resolves(countrySample);
        const wrapper = shallowMount(CountryDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
