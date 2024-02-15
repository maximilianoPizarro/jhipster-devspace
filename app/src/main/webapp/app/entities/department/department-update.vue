<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="deliveryApp.department.home.createOrEditLabel"
          data-cy="DepartmentCreateUpdateHeading"
          v-text="t$('deliveryApp.department.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="department.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="department.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('deliveryApp.department.departmentName')" for="department-departmentName"></label>
            <input
              type="text"
              class="form-control"
              name="departmentName"
              id="department-departmentName"
              data-cy="departmentName"
              :class="{ valid: !v$.departmentName.$invalid, invalid: v$.departmentName.$invalid }"
              v-model="v$.departmentName.$model"
              required
            />
            <div v-if="v$.departmentName.$anyDirty && v$.departmentName.$invalid">
              <small class="form-text text-danger" v-for="error of v$.departmentName.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('deliveryApp.department.location')" for="department-location"></label>
            <select class="form-control" id="department-location" data-cy="location" name="location" v-model="department.location">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="department.location && locationOption.id === department.location.id ? department.location : locationOption"
                v-for="locationOption in locations"
                :key="locationOption.id"
              >
                {{ locationOption.id }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.cancel')"></span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="v$.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.save')"></span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./department-update.component.ts"></script>
