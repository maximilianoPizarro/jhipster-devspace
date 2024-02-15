/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';

import Department from './department.vue';
import DepartmentService from './department.service';
import AlertService from '@/shared/alert/alert.service';

type DepartmentComponentType = InstanceType<typeof Department>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('Department Management Component', () => {
    let departmentServiceStub: SinonStubbedInstance<DepartmentService>;
    let mountOptions: MountingOptions<DepartmentComponentType>['global'];

    beforeEach(() => {
      departmentServiceStub = sinon.createStubInstance<DepartmentService>(DepartmentService);
      departmentServiceStub.retrieve.resolves({ headers: {} });

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
          departmentService: () => departmentServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        departmentServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(Department, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(departmentServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.departments[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: DepartmentComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(Department, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        departmentServiceStub.retrieve.reset();
        departmentServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        departmentServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeDepartment();
        await comp.$nextTick(); // clear components

        // THEN
        expect(departmentServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(departmentServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
