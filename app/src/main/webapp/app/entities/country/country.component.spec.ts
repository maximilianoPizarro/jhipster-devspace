/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';

import Country from './country.vue';
import CountryService from './country.service';
import AlertService from '@/shared/alert/alert.service';

type CountryComponentType = InstanceType<typeof Country>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('Country Management Component', () => {
    let countryServiceStub: SinonStubbedInstance<CountryService>;
    let mountOptions: MountingOptions<CountryComponentType>['global'];

    beforeEach(() => {
      countryServiceStub = sinon.createStubInstance<CountryService>(CountryService);
      countryServiceStub.retrieve.resolves({ headers: {} });

      alertService = new AlertService({
        i18n: { t: vitest.fn() } as any,
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          bModal: bModalStub as any,
          'font-awesome-icon': true,
          'b-badge': true,
          'b-button': true,
          'router-link': true,
        },
        directives: {
          'b-modal': {},
        },
        provide: {
          alertService,
          countryService: () => countryServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        countryServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(Country, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(countryServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.countries[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: CountryComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(Country, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        countryServiceStub.retrieve.reset();
        countryServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        countryServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeCountry();
        await comp.$nextTick(); // clear components

        // THEN
        expect(countryServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(countryServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
