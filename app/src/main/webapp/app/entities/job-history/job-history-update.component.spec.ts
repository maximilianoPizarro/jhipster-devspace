/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import dayjs from 'dayjs';
import JobHistoryUpdate from './job-history-update.vue';
import JobHistoryService from './job-history.service';
import { DATE_TIME_LONG_FORMAT } from '@/shared/composables/date-format';
import AlertService from '@/shared/alert/alert.service';

import JobService from '@/entities/job/job.service';
import DepartmentService from '@/entities/department/department.service';
import EmployeeService from '@/entities/employee/employee.service';

type JobHistoryUpdateComponentType = InstanceType<typeof JobHistoryUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const jobHistorySample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<JobHistoryUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('JobHistory Management Update Component', () => {
    let comp: JobHistoryUpdateComponentType;
    let jobHistoryServiceStub: SinonStubbedInstance<JobHistoryService>;

    beforeEach(() => {
      route = {};
      jobHistoryServiceStub = sinon.createStubInstance<JobHistoryService>(JobHistoryService);
      jobHistoryServiceStub.retrieve.onFirstCall().resolves(Promise.resolve([]));

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
          jobHistoryService: () => jobHistoryServiceStub,
          jobService: () =>
            sinon.createStubInstance<JobService>(JobService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
          departmentService: () =>
            sinon.createStubInstance<DepartmentService>(DepartmentService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
          employeeService: () =>
            sinon.createStubInstance<EmployeeService>(EmployeeService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
    });

    describe('load', () => {
      beforeEach(() => {
        const wrapper = shallowMount(JobHistoryUpdate, { global: mountOptions });
        comp = wrapper.vm;
      });
      it('Should convert date from string', () => {
        // GIVEN
        const date = new Date('2019-10-15T11:42:02Z');

        // WHEN
        const convertedDate = comp.convertDateTimeFromServer(date);

        // THEN
        expect(convertedDate).toEqual(dayjs(date).format(DATE_TIME_LONG_FORMAT));
      });

      it('Should not convert date if date is not present', () => {
        expect(comp.convertDateTimeFromServer(null)).toBeNull();
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(JobHistoryUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.jobHistory = jobHistorySample;
        jobHistoryServiceStub.update.resolves(jobHistorySample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(jobHistoryServiceStub.update.calledWith(jobHistorySample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        jobHistoryServiceStub.create.resolves(entity);
        const wrapper = shallowMount(JobHistoryUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.jobHistory = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(jobHistoryServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        jobHistoryServiceStub.find.resolves(jobHistorySample);
        jobHistoryServiceStub.retrieve.resolves([jobHistorySample]);

        // WHEN
        route = {
          params: {
            jobHistoryId: '' + jobHistorySample.id,
          },
        };
        const wrapper = shallowMount(JobHistoryUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.jobHistory).toMatchObject(jobHistorySample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        jobHistoryServiceStub.find.resolves(jobHistorySample);
        const wrapper = shallowMount(JobHistoryUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
