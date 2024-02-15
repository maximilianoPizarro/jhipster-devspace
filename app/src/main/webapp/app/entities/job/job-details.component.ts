import { defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import JobService from './job.service';
import { type IJob } from '@/shared/model/job.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'JobDetails',
  setup() {
    const jobService = inject('jobService', () => new JobService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const job: Ref<IJob> = ref({});

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

    return {
      alertService,
      job,

      previousState,
      t$: useI18n().t,
    };
  },
});
