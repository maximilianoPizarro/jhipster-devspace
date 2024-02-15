import { defineComponent, inject, onMounted, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import RegionService from './region.service';
import { type IRegion } from '@/shared/model/region.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Region',
  setup() {
    const { t: t$ } = useI18n();
    const regionService = inject('regionService', () => new RegionService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const regions: Ref<IRegion[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveRegions = async () => {
      isFetching.value = true;
      try {
        const res = await regionService().retrieve();
        regions.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveRegions();
    };

    onMounted(async () => {
      await retrieveRegions();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IRegion) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeRegion = async () => {
      try {
        await regionService().delete(removeId.value);
        const message = t$('deliveryApp.region.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveRegions();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      regions,
      handleSyncList,
      isFetching,
      retrieveRegions,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeRegion,
      t$,
    };
  },
});
