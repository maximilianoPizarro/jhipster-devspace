import { defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import TaskService from './task.service';
import { type ITask } from '@/shared/model/task.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'TaskDetails',
  setup() {
    const taskService = inject('taskService', () => new TaskService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const task: Ref<ITask> = ref({});

    const retrieveTask = async taskId => {
      try {
        const res = await taskService().find(taskId);
        task.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.taskId) {
      retrieveTask(route.params.taskId);
    }

    return {
      alertService,
      task,

      previousState,
      t$: useI18n().t,
    };
  },
});
