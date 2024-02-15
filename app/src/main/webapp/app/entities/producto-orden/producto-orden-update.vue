<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="deliveryApp.productoOrden.home.createOrEditLabel"
          data-cy="ProductoOrdenCreateUpdateHeading"
          v-text="$t('deliveryApp.productoOrden.home.createOrEditLabel')"
        >
          Create or edit a ProductoOrden
        </h2>
        <div>
          <div class="form-group" v-if="productoOrden.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="productoOrden.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.productoOrden.cantidad')" for="producto-orden-cantidad"
              >Cantidad</label
            >
            <input
              type="number"
              class="form-control"
              name="cantidad"
              id="producto-orden-cantidad"
              data-cy="cantidad"
              :class="{ valid: !$v.productoOrden.cantidad.$invalid, invalid: $v.productoOrden.cantidad.$invalid }"
              v-model.number="$v.productoOrden.cantidad.$model"
              required
            />
            <div v-if="$v.productoOrden.cantidad.$anyDirty && $v.productoOrden.cantidad.$invalid">
              <small class="form-text text-danger" v-if="!$v.productoOrden.cantidad.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.productoOrden.cantidad.min" v-text="$t('entity.validation.min', { min: 0 })">
                This field should be at least 0.
              </small>
              <small class="form-text text-danger" v-if="!$v.productoOrden.cantidad.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.productoOrden.precioTotal')" for="producto-orden-precioTotal"
              >Precio Total</label
            >
            <input
              type="number"
              class="form-control"
              name="precioTotal"
              id="producto-orden-precioTotal"
              data-cy="precioTotal"
              :class="{ valid: !$v.productoOrden.precioTotal.$invalid, invalid: $v.productoOrden.precioTotal.$invalid }"
              v-model.number="$v.productoOrden.precioTotal.$model"
              required
            />
            <div v-if="$v.productoOrden.precioTotal.$anyDirty && $v.productoOrden.precioTotal.$invalid">
              <small class="form-text text-danger" v-if="!$v.productoOrden.precioTotal.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.productoOrden.precioTotal.min"
                v-text="$t('entity.validation.min', { min: 0 })"
              >
                This field should be at least 0.
              </small>
              <small class="form-text text-danger" v-if="!$v.productoOrden.precioTotal.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.productoOrden.producto')" for="producto-orden-producto"
              >Producto</label
            >
            <select
              class="form-control"
              id="producto-orden-producto"
              data-cy="producto"
              name="producto"
              v-model="productoOrden.producto"
              required
            >
              <option v-if="!productoOrden.producto" v-bind:value="null" selected></option>
              <option
                v-bind:value="
                  productoOrden.producto && productoOption.id === productoOrden.producto.id ? productoOrden.producto : productoOption
                "
                v-for="productoOption in productos"
                :key="productoOption.id"
              >
                {{ productoOption.nombre }}
              </option>
            </select>
          </div>
          <div v-if="$v.productoOrden.producto.$anyDirty && $v.productoOrden.producto.$invalid">
            <small class="form-text text-danger" v-if="!$v.productoOrden.producto.required" v-text="$t('entity.validation.required')">
              This field is required.
            </small>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.productoOrden.cart')" for="producto-orden-cart">Cart</label>
            <select class="form-control" id="producto-orden-cart" data-cy="cart" name="cart" v-model="productoOrden.cart" required>
              <option v-if="!productoOrden.cart" v-bind:value="null" selected></option>
              <option
                v-bind:value="productoOrden.cart && carritoOption.id === productoOrden.cart.id ? productoOrden.cart : carritoOption"
                v-for="carritoOption in carritos"
                :key="carritoOption.id"
              >
                {{ carritoOption.id }}
              </option>
            </select>
          </div>
          <div v-if="$v.productoOrden.cart.$anyDirty && $v.productoOrden.cart.$invalid">
            <small class="form-text text-danger" v-if="!$v.productoOrden.cart.required" v-text="$t('entity.validation.required')">
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
            :disabled="$v.productoOrden.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./producto-orden-update.component.ts"></script>
