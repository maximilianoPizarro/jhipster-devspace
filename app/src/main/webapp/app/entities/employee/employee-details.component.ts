import { defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import EmployeeService from './employee.service';
import { useDateFormat } from '@/shared/composables';
import { type IEmployee } from '@/shared/model/employee.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'EmployeeDetails',
  setup() {
    const dateFormat = useDateFormat();
    const employeeService = inject('employeeService', () => new EmployeeService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const employee: Ref<IEmployee> = ref({});

    const retrieveEmployee = async employeeId => {
      try {
        const res = await employeeService().find(employeeId);
        employee.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.employeeId) {
      retrieveEmployee(route.params.employeeId);
    }

    return {
      ...dateFormat,
      alertService,
      employee,

      previousState,
      t$: useI18n().t,
    };
  },
});
