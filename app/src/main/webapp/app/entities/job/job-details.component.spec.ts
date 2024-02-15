/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import JobDetails from './job-details.vue';
import JobService from './job.service';
import AlertService from '@/shared/alert/alert.service';

type JobDetailsComponentType = InstanceType<typeof JobDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const jobSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('Job Management Detail Component', () => {
    let jobServiceStub: SinonStubbedInstance<JobService>;
    let mountOptions: MountingOptions<JobDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      jobServiceStub = sinon.createStubInstance<JobService>(JobService);

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
          jobService: () => jobServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        jobServiceStub.find.resolves(jobSample);
        route = {
          params: {
            jobId: '' + 123,
          },
        };
        const wrapper = shallowMount(JobDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.job).toMatchObject(jobSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        jobServiceStub.find.resolves(jobSample);
        const wrapper = shallowMount(JobDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
