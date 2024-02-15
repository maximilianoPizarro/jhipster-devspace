import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import JobHistoryService from './job-history.service';
import { useValidation, useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import JobService from '@/entities/job/job.service';
import { type IJob } from '@/shared/model/job.model';
import DepartmentService from '@/entities/department/department.service';
import { type IDepartment } from '@/shared/model/department.model';
import EmployeeService from '@/entities/employee/employee.service';
import { type IEmployee } from '@/shared/model/employee.model';
import { type IJobHistory, JobHistory } from '@/shared/model/job-history.model';
import { Language } from '@/shared/model/enumerations/language.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'JobHistoryUpdate',
  setup() {
    const jobHistoryService = inject('jobHistoryService', () => new JobHistoryService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const jobHistory: Ref<IJobHistory> = ref(new JobHistory());

    const jobService = inject('jobService', () => new JobService());

    const jobs: Ref<IJob[]> = ref([]);

    const departmentService = inject('departmentService', () => new DepartmentService());

    const departments: Ref<IDepartment[]> = ref([]);

    const employeeService = inject('employeeService', () => new EmployeeService());

    const employees: Ref<IEmployee[]> = ref([]);
    const languageValues: Ref<string[]> = ref(Object.keys(Language));
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'es'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveJobHistory = async jobHistoryId => {
      try {
        const res = await jobHistoryService().find(jobHistoryId);
        res.startDate = new Date(res.startDate);
        res.endDate = new Date(res.endDate);
        jobHistory.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.jobHistoryId) {
      retrieveJobHistory(route.params.jobHistoryId);
    }

    const initRelationships = () => {
      jobService()
        .retrieve()
        .then(res => {
          jobs.value = res.data;
        });
      departmentService()
        .retrieve()
        .then(res => {
          departments.value = res.data;
        });
      employeeService()
        .retrieve()
        .then(res => {
          employees.value = res.data;
        });
    };

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      startDate: {},
      endDate: {},
      language: {},
      job: {},
      department: {},
      employee: {},
    };
    const v$ = useVuelidate(validationRules, jobHistory as any);
    v$.value.$validate();

    return {
      jobHistoryService,
      alertService,
      jobHistory,
      previousState,
      languageValues,
      isSaving,
      currentLanguage,
      jobs,
      departments,
      employees,
      v$,
      ...useDateFormat({ entityRef: jobHistory }),
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.jobHistory.id) {
        this.jobHistoryService()
          .update(this.jobHistory)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('deliveryApp.jobHistory.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.jobHistoryService()
          .create(this.jobHistory)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('deliveryApp.jobHistory.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
