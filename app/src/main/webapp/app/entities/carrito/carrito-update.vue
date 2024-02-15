<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="deliveryApp.carrito.home.createOrEditLabel"
          data-cy="CarritoCreateUpdateHeading"
          v-text="$t('deliveryApp.carrito.home.createOrEditLabel')"
        >
          Create or edit a Carrito
        </h2>
        <div>
          <div class="form-group" v-if="carrito.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="carrito.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.carrito.fecha')" for="carrito-fecha">Fecha</label>
            <div class="d-flex">
              <input
                id="carrito-fecha"
                data-cy="fecha"
                type="datetime-local"
                class="form-control"
                name="fecha"
                :class="{ valid: !$v.carrito.fecha.$invalid, invalid: $v.carrito.fecha.$invalid }"
                required
                :value="convertDateTimeFromServer($v.carrito.fecha.$model)"
                @change="updateInstantField('fecha', $event)"
              />
            </div>
            <div v-if="$v.carrito.fecha.$anyDirty && $v.carrito.fecha.$invalid">
              <small class="form-text text-danger" v-if="!$v.carrito.fecha.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.carrito.fecha.ZonedDateTimelocal"
                v-text="$t('entity.validation.ZonedDateTimelocal')"
              >
                This field should be a date and time.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.carrito.status')" for="carrito-status">Status</label>
            <select
              class="form-control"
              name="status"
              :class="{ valid: !$v.carrito.status.$invalid, invalid: $v.carrito.status.$invalid }"
              v-model="$v.carrito.status.$model"
              id="carrito-status"
              data-cy="status"
              required
            >
              <option value="COMPLETO" v-bind:label="$t('deliveryApp.OrdenStatus.COMPLETO')">COMPLETO</option>
              <option value="PAGADO" v-bind:label="$t('deliveryApp.OrdenStatus.PAGADO')">PAGADO</option>
              <option value="PENDIENTE" v-bind:label="$t('deliveryApp.OrdenStatus.PENDIENTE')">PENDIENTE</option>
              <option value="CANCELADO" v-bind:label="$t('deliveryApp.OrdenStatus.CANCELADO')">CANCELADO</option>
              <option value="RECHAZADO" v-bind:label="$t('deliveryApp.OrdenStatus.RECHAZADO')">RECHAZADO</option>
            </select>
            <div v-if="$v.carrito.status.$anyDirty && $v.carrito.status.$invalid">
              <small class="form-text text-danger" v-if="!$v.carrito.status.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.carrito.precioTotal')" for="carrito-precioTotal">Precio Total</label>
            <input
              type="number"
              class="form-control"
              name="precioTotal"
              id="carrito-precioTotal"
              data-cy="precioTotal"
              :class="{ valid: !$v.carrito.precioTotal.$invalid, invalid: $v.carrito.precioTotal.$invalid }"
              v-model.number="$v.carrito.precioTotal.$model"
              required
            />
            <div v-if="$v.carrito.precioTotal.$anyDirty && $v.carrito.precioTotal.$invalid">
              <small class="form-text text-danger" v-if="!$v.carrito.precioTotal.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.carrito.precioTotal.min" v-text="$t('entity.validation.min', { min: 0 })">
                This field should be at least 0.
              </small>
              <small class="form-text text-danger" v-if="!$v.carrito.precioTotal.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.carrito.metodoDePago')" for="carrito-metodoDePago"
              >Metodo De Pago</label
            >
            <select
              class="form-control"
              name="metodoDePago"
              :class="{ valid: !$v.carrito.metodoDePago.$invalid, invalid: $v.carrito.metodoDePago.$invalid }"
              v-model="$v.carrito.metodoDePago.$model"
              id="carrito-metodoDePago"
              data-cy="metodoDePago"
              required
            >
              <option value="EFECTIVO" v-bind:label="$t('deliveryApp.MetodoDePago.EFECTIVO')">efectivo</option>
              <option value="CUPON" v-bind:label="$t('deliveryApp.MetodoDePago.CUPON')">cupon</option>
            </select>
            <div v-if="$v.carrito.metodoDePago.$anyDirty && $v.carrito.metodoDePago.$invalid">
              <small class="form-text text-danger" v-if="!$v.carrito.metodoDePago.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.carrito.referencia')" for="carrito-referencia">Referencia</label>
            <input
              type="text"
              class="form-control"
              name="referencia"
              id="carrito-referencia"
              data-cy="referencia"
              :class="{ valid: !$v.carrito.referencia.$invalid, invalid: $v.carrito.referencia.$invalid }"
              v-model="$v.carrito.referencia.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.carrito.cliente')" for="carrito-cliente">Cliente</label>
            <select class="form-control" id="carrito-cliente" data-cy="cliente" name="cliente" v-model="carrito.cliente" required>
              <option v-if="!carrito.cliente" v-bind:value="null" selected></option>
              <option
                v-bind:value="carrito.cliente && clienteOption.id === carrito.cliente.id ? carrito.cliente : clienteOption"
                v-for="clienteOption in clientes"
                :key="clienteOption.id"
              >
                {{ clienteOption.id }}
              </option>
            </select>
          </div>
          <div v-if="$v.carrito.cliente.$anyDirty && $v.carrito.cliente.$invalid">
            <small class="form-text text-danger" v-if="!$v.carrito.cliente.required" v-text="$t('entity.validation.required')">
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
            :disabled="$v.carrito.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./carrito-update.component.ts"></script>
