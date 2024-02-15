import { defineComponent, inject, onMounted, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import CountryService from './country.service';
import { type ICountry } from '@/shared/model/country.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Country',
  setup() {
    const { t: t$ } = useI18n();
    const countryService = inject('countryService', () => new CountryService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const countries: Ref<ICountry[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveCountrys = async () => {
      isFetching.value = true;
      try {
        const res = await countryService().retrieve();
        countries.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveCountrys();
    };

    onMounted(async () => {
      await retrieveCountrys();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: ICountry) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeCountry = async () => {
      try {
        await countryService().delete(removeId.value);
        const message = t$('deliveryApp.country.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveCountrys();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      countries,
      handleSyncList,
      isFetching,
      retrieveCountrys,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeCountry,
      t$,
    };
  },
});
