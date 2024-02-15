import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import JobService from './job.service';
import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import TaskService from '@/entities/task/task.service';
import { type ITask } from '@/shared/model/task.model';
import EmployeeService from '@/entities/employee/employee.service';
import { type IEmployee } from '@/shared/model/employee.model';
import { type IJob, Job } from '@/shared/model/job.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'JobUpdate',
  setup() {
    const jobService = inject('jobService', () => new JobService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const job: Ref<IJob> = ref(new Job());

    const taskService = inject('taskService', () => new TaskService());

    const tasks: Ref<ITask[]> = ref([]);

    const employeeService = inject('employeeService', () => new EmployeeService());

    const employees: Ref<IEmployee[]> = ref([]);
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'es'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveJob = async jobId => {
      try {
        const res = await jobService().find(jobId);
        job.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.jobId) {
      retrieveJob(route.params.jobId);
    }

    const initRelationships = () => {
      taskService()
        .retrieve()
        .then(res => {
          tasks.value = res.data;
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
      jobTitle: {},
      minSalary: {},
      maxSalary: {},
      tasks: {},
      employee: {},
      jobHistory: {},
    };
    const v$ = useVuelidate(validationRules, job as any);
    v$.value.$validate();

    return {
      jobService,
      alertService,
      job,
      previousState,
      isSaving,
      currentLanguage,
      tasks,
      employees,
      v$,
      t$,
    };
  },
  created(): void {
    this.job.tasks = [];
  },
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.job.id) {
        this.jobService()
          .update(this.job)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('deliveryApp.job.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.jobService()
          .create(this.job)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('deliveryApp.job.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },

    getSelected(selectedVals, option): any {
      if (selectedVals) {
        return selectedVals.find(value => option.id === value.id) ?? option;
      }
      return option;
    },
  },
});
