/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import TaskUpdate from './task-update.vue';
import TaskService from './task.service';
import AlertService from '@/shared/alert/alert.service';

type TaskUpdateComponentType = InstanceType<typeof TaskUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const taskSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<TaskUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('Task Management Update Component', () => {
    let comp: TaskUpdateComponentType;
    let taskServiceStub: SinonStubbedInstance<TaskService>;

    beforeEach(() => {
      route = {};
      taskServiceStub = sinon.createStubInstance<TaskService>(TaskService);
      taskServiceStub.retrieve.onFirstCall().resolves(Promise.resolve([]));

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
          taskService: () => taskServiceStub,
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(TaskUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.task = taskSample;
        taskServiceStub.update.resolves(taskSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(taskServiceStub.update.calledWith(taskSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        taskServiceStub.create.resolves(entity);
        const wrapper = shallowMount(TaskUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.task = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(taskServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        taskServiceStub.find.resolves(taskSample);
        taskServiceStub.retrieve.resolves([taskSample]);

        // WHEN
        route = {
          params: {
            taskId: '' + taskSample.id,
          },
        };
        const wrapper = shallowMount(TaskUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.task).toMatchObject(taskSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        taskServiceStub.find.resolves(taskSample);
        const wrapper = shallowMount(TaskUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
