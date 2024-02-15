/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';

import Region from './region.vue';
import RegionService from './region.service';
import AlertService from '@/shared/alert/alert.service';

type RegionComponentType = InstanceType<typeof Region>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('Region Management Component', () => {
    let regionServiceStub: SinonStubbedInstance<RegionService>;
    let mountOptions: MountingOptions<RegionComponentType>['global'];

    beforeEach(() => {
      regionServiceStub = sinon.createStubInstance<RegionService>(RegionService);
      regionServiceStub.retrieve.resolves({ headers: {} });

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
          regionService: () => regionServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        regionServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(Region, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(regionServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.regions[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: RegionComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(Region, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        regionServiceStub.retrieve.reset();
        regionServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        regionServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeRegion();
        await comp.$nextTick(); // clear components

        // THEN
        expect(regionServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(regionServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
