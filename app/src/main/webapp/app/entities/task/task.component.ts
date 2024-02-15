import { defineComponent, inject, onMounted, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import TaskService from './task.service';
import { type ITask } from '@/shared/model/task.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Task',
  setup() {
    const { t: t$ } = useI18n();
    const taskService = inject('taskService', () => new TaskService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const tasks: Ref<ITask[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveTasks = async () => {
      isFetching.value = true;
      try {
        const res = await taskService().retrieve();
        tasks.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveTasks();
    };

    onMounted(async () => {
      await retrieveTasks();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: ITask) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeTask = async () => {
      try {
        await taskService().delete(removeId.value);
        const message = t$('deliveryApp.task.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveTasks();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      tasks,
      handleSyncList,
      isFetching,
      retrieveTasks,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeTask,
      t$,
    };
  },
});
