import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import DepartmentService from './department.service';
import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import LocationService from '@/entities/location/location.service';
import { type ILocation } from '@/shared/model/location.model';
import { type IDepartment, Department } from '@/shared/model/department.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'DepartmentUpdate',
  setup() {
    const departmentService = inject('departmentService', () => new DepartmentService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const department: Ref<IDepartment> = ref(new Department());

    const locationService = inject('locationService', () => new LocationService());

    const locations: Ref<ILocation[]> = ref([]);
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'es'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveDepartment = async departmentId => {
      try {
        const res = await departmentService().find(departmentId);
        department.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.departmentId) {
      retrieveDepartment(route.params.departmentId);
    }

    const initRelationships = () => {
      locationService()
        .retrieve()
        .then(res => {
          locations.value = res.data;
        });
    };

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      departmentName: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      location: {},
      employees: {},
      jobHistory: {},
    };
    const v$ = useVuelidate(validationRules, department as any);
    v$.value.$validate();

    return {
      departmentService,
      alertService,
      department,
      previousState,
      isSaving,
      currentLanguage,
      locations,
      v$,
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.department.id) {
        this.departmentService()
          .update(this.department)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('deliveryApp.department.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.departmentService()
          .create(this.department)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('deliveryApp.department.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
