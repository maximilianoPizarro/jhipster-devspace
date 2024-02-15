/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';

import Task from './task.vue';
import TaskService from './task.service';
import AlertService from '@/shared/alert/alert.service';

type TaskComponentType = InstanceType<typeof Task>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('Task Management Component', () => {
    let taskServiceStub: SinonStubbedInstance<TaskService>;
    let mountOptions: MountingOptions<TaskComponentType>['global'];

    beforeEach(() => {
      taskServiceStub = sinon.createStubInstance<TaskService>(TaskService);
      taskServiceStub.retrieve.resolves({ headers: {} });

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
          taskService: () => taskServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        taskServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(Task, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(taskServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.tasks[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: TaskComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(Task, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        taskServiceStub.retrieve.reset();
        taskServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        taskServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeTask();
        await comp.$nextTick(); // clear components

        // THEN
        expect(taskServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(taskServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
