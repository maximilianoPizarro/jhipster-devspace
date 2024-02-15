import { defineComponent, inject, onMounted, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import LocationService from './location.service';
import { type ILocation } from '@/shared/model/location.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Location',
  setup() {
    const { t: t$ } = useI18n();
    const locationService = inject('locationService', () => new LocationService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const locations: Ref<ILocation[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveLocations = async () => {
      isFetching.value = true;
      try {
        const res = await locationService().retrieve();
        locations.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveLocations();
    };

    onMounted(async () => {
      await retrieveLocations();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: ILocation) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeLocation = async () => {
      try {
        await locationService().delete(removeId.value);
        const message = t$('deliveryApp.location.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveLocations();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      locations,
      handleSyncList,
      isFetching,
      retrieveLocations,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeLocation,
      t$,
    };
  },
});
