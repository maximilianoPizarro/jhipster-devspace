import { defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import JobHistoryService from './job-history.service';
import { useDateFormat } from '@/shared/composables';
import { type IJobHistory } from '@/shared/model/job-history.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'JobHistoryDetails',
  setup() {
    const dateFormat = useDateFormat();
    const jobHistoryService = inject('jobHistoryService', () => new JobHistoryService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const jobHistory: Ref<IJobHistory> = ref({});

    const retrieveJobHistory = async jobHistoryId => {
      try {
        const res = await jobHistoryService().find(jobHistoryId);
        jobHistory.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.jobHistoryId) {
      retrieveJobHistory(route.params.jobHistoryId);
    }

    return {
      ...dateFormat,
      alertService,
      jobHistory,

      previousState,
      t$: useI18n().t,
    };
  },
});
