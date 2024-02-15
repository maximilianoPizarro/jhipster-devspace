/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import RegionUpdate from './region-update.vue';
import RegionService from './region.service';
import AlertService from '@/shared/alert/alert.service';

type RegionUpdateComponentType = InstanceType<typeof RegionUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const regionSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<RegionUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('Region Management Update Component', () => {
    let comp: RegionUpdateComponentType;
    let regionServiceStub: SinonStubbedInstance<RegionService>;

    beforeEach(() => {
      route = {};
      regionServiceStub = sinon.createStubInstance<RegionService>(RegionService);
      regionServiceStub.retrieve.onFirstCall().resolves(Promise.resolve([]));

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
          regionService: () => regionServiceStub,
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(RegionUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.region = regionSample;
        regionServiceStub.update.resolves(regionSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(regionServiceStub.update.calledWith(regionSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        regionServiceStub.create.resolves(entity);
        const wrapper = shallowMount(RegionUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.region = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(regionServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        regionServiceStub.find.resolves(regionSample);
        regionServiceStub.retrieve.resolves([regionSample]);

        // WHEN
        route = {
          params: {
            regionId: '' + regionSample.id,
          },
        };
        const wrapper = shallowMount(RegionUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.region).toMatchObject(regionSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        regionServiceStub.find.resolves(regionSample);
        const wrapper = shallowMount(RegionUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
