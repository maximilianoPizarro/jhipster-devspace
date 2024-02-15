<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="deliveryApp.productoCategoria.home.createOrEditLabel"
          data-cy="ProductoCategoriaCreateUpdateHeading"
          v-text="$t('deliveryApp.productoCategoria.home.createOrEditLabel')"
        >
          Create or edit a ProductoCategoria
        </h2>
        <div>
          <div class="form-group" v-if="productoCategoria.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="productoCategoria.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.productoCategoria.nombre')" for="producto-categoria-nombre"
              >Nombre</label
            >
            <input
              type="text"
              class="form-control"
              name="nombre"
              id="producto-categoria-nombre"
              data-cy="nombre"
              :class="{ valid: !$v.productoCategoria.nombre.$invalid, invalid: $v.productoCategoria.nombre.$invalid }"
              v-model="$v.productoCategoria.nombre.$model"
              required
            />
            <div v-if="$v.productoCategoria.nombre.$anyDirty && $v.productoCategoria.nombre.$invalid">
              <small class="form-text text-danger" v-if="!$v.productoCategoria.nombre.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.productoCategoria.description')" for="producto-categoria-description"
              >Description</label
            >
            <input
              type="text"
              class="form-control"
              name="description"
              id="producto-categoria-description"
              data-cy="description"
              :class="{ valid: !$v.productoCategoria.description.$invalid, invalid: $v.productoCategoria.description.$invalid }"
              v-model="$v.productoCategoria.description.$model"
            />
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.productoCategoria.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./producto-categoria-update.component.ts"></script>
