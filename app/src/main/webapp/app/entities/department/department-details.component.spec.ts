/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import DepartmentDetails from './department-details.vue';
import DepartmentService from './department.service';
import AlertService from '@/shared/alert/alert.service';

type DepartmentDetailsComponentType = InstanceType<typeof DepartmentDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const departmentSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('Department Management Detail Component', () => {
    let departmentServiceStub: SinonStubbedInstance<DepartmentService>;
    let mountOptions: MountingOptions<DepartmentDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      departmentServiceStub = sinon.createStubInstance<DepartmentService>(DepartmentService);

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
          departmentService: () => departmentServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        departmentServiceStub.find.resolves(departmentSample);
        route = {
          params: {
            departmentId: '' + 123,
          },
        };
        const wrapper = shallowMount(DepartmentDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.department).toMatchObject(departmentSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        departmentServiceStub.find.resolves(departmentSample);
        const wrapper = shallowMount(DepartmentDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
