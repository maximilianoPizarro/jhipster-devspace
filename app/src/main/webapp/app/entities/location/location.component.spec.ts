/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';

import Location from './location.vue';
import LocationService from './location.service';
import AlertService from '@/shared/alert/alert.service';

type LocationComponentType = InstanceType<typeof Location>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('Location Management Component', () => {
    let locationServiceStub: SinonStubbedInstance<LocationService>;
    let mountOptions: MountingOptions<LocationComponentType>['global'];

    beforeEach(() => {
      locationServiceStub = sinon.createStubInstance<LocationService>(LocationService);
      locationServiceStub.retrieve.resolves({ headers: {} });

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
          locationService: () => locationServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        locationServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(Location, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(locationServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.locations[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: LocationComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(Location, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        locationServiceStub.retrieve.reset();
        locationServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        locationServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeLocation();
        await comp.$nextTick(); // clear components

        // THEN
        expect(locationServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(locationServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
