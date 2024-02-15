import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import CountryService from './country.service';
import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import RegionService from '@/entities/region/region.service';
import { type IRegion } from '@/shared/model/region.model';
import { type ICountry, Country } from '@/shared/model/country.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'CountryUpdate',
  setup() {
    const countryService = inject('countryService', () => new CountryService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const country: Ref<ICountry> = ref(new Country());

    const regionService = inject('regionService', () => new RegionService());

    const regions: Ref<IRegion[]> = ref([]);
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'es'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveCountry = async countryId => {
      try {
        const res = await countryService().find(countryId);
        country.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.countryId) {
      retrieveCountry(route.params.countryId);
    }

    const initRelationships = () => {
      regionService()
        .retrieve()
        .then(res => {
          regions.value = res.data;
        });
    };

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      countryName: {},
      region: {},
      location: {},
    };
    const v$ = useVuelidate(validationRules, country as any);
    v$.value.$validate();

    return {
      countryService,
      alertService,
      country,
      previousState,
      isSaving,
      currentLanguage,
      regions,
      v$,
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.country.id) {
        this.countryService()
          .update(this.country)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('deliveryApp.country.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.countryService()
          .create(this.country)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('deliveryApp.country.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
