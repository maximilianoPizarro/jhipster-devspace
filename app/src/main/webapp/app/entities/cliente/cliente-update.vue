<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="deliveryApp.cliente.home.createOrEditLabel"
          data-cy="ClienteCreateUpdateHeading"
          v-text="$t('deliveryApp.cliente.home.createOrEditLabel')"
        >
          Create or edit a Cliente
        </h2>
        <div>
          <div class="form-group" v-if="cliente.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="cliente.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.cliente.genero')" for="cliente-genero">Genero</label>
            <select
              class="form-control"
              name="genero"
              :class="{ valid: !$v.cliente.genero.$invalid, invalid: $v.cliente.genero.$invalid }"
              v-model="$v.cliente.genero.$model"
              id="cliente-genero"
              data-cy="genero"
              required
            >
              <option value="MASCULINO" v-bind:label="$t('deliveryApp.Genero.MASCULINO')">MASCULINO</option>
              <option value="FEMENINO" v-bind:label="$t('deliveryApp.Genero.FEMENINO')">FEMENINO</option>
              <option value="OTRO" v-bind:label="$t('deliveryApp.Genero.OTRO')">OTRO</option>
            </select>
            <div v-if="$v.cliente.genero.$anyDirty && $v.cliente.genero.$invalid">
              <small class="form-text text-danger" v-if="!$v.cliente.genero.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.cliente.telefono')" for="cliente-telefono">Telefono</label>
            <input
              type="text"
              class="form-control"
              name="telefono"
              id="cliente-telefono"
              data-cy="telefono"
              :class="{ valid: !$v.cliente.telefono.$invalid, invalid: $v.cliente.telefono.$invalid }"
              v-model="$v.cliente.telefono.$model"
              required
            />
            <div v-if="$v.cliente.telefono.$anyDirty && $v.cliente.telefono.$invalid">
              <small class="form-text text-danger" v-if="!$v.cliente.telefono.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.cliente.direccion1')" for="cliente-direccion1">Direccion 1</label>
            <input
              type="text"
              class="form-control"
              name="direccion1"
              id="cliente-direccion1"
              data-cy="direccion1"
              :class="{ valid: !$v.cliente.direccion1.$invalid, invalid: $v.cliente.direccion1.$invalid }"
              v-model="$v.cliente.direccion1.$model"
              required
            />
            <div v-if="$v.cliente.direccion1.$anyDirty && $v.cliente.direccion1.$invalid">
              <small class="form-text text-danger" v-if="!$v.cliente.direccion1.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.cliente.direccion2')" for="cliente-direccion2">Direccion 2</label>
            <input
              type="text"
              class="form-control"
              name="direccion2"
              id="cliente-direccion2"
              data-cy="direccion2"
              :class="{ valid: !$v.cliente.direccion2.$invalid, invalid: $v.cliente.direccion2.$invalid }"
              v-model="$v.cliente.direccion2.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.cliente.ciudad')" for="cliente-ciudad">Ciudad</label>
            <input
              type="text"
              class="form-control"
              name="ciudad"
              id="cliente-ciudad"
              data-cy="ciudad"
              :class="{ valid: !$v.cliente.ciudad.$invalid, invalid: $v.cliente.ciudad.$invalid }"
              v-model="$v.cliente.ciudad.$model"
              required
            />
            <div v-if="$v.cliente.ciudad.$anyDirty && $v.cliente.ciudad.$invalid">
              <small class="form-text text-danger" v-if="!$v.cliente.ciudad.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.cliente.pais')" for="cliente-pais">Pais</label>
            <input
              type="text"
              class="form-control"
              name="pais"
              id="cliente-pais"
              data-cy="pais"
              :class="{ valid: !$v.cliente.pais.$invalid, invalid: $v.cliente.pais.$invalid }"
              v-model="$v.cliente.pais.$model"
              required
            />
            <div v-if="$v.cliente.pais.$anyDirty && $v.cliente.pais.$invalid">
              <small class="form-text text-danger" v-if="!$v.cliente.pais.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.cliente.user')" for="cliente-user">User</label>
            <select class="form-control" id="cliente-user" data-cy="user" name="user" v-model="cliente.user" required>
              <option v-if="!cliente.user" v-bind:value="null" selected></option>
              <option
                v-bind:value="cliente.user && userOption.id === cliente.user.id ? cliente.user : userOption"
                v-for="userOption in users"
                :key="userOption.id"
              >
                {{ userOption.login }}
              </option>
            </select>
          </div>
          <div v-if="$v.cliente.user.$anyDirty && $v.cliente.user.$invalid">
            <small class="form-text text-danger" v-if="!$v.cliente.user.required" v-text="$t('entity.validation.required')">
              This field is required.
            </small>
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
            :disabled="$v.cliente.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./cliente-update.component.ts"></script>
