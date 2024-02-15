<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="productoOrden">
        <h2 class="jh-entity-heading" data-cy="productoOrdenDetailsHeading">
          <span v-text="$t('deliveryApp.productoOrden.detail.title')">ProductoOrden</span> {{ productoOrden.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('deliveryApp.productoOrden.cantidad')">Cantidad</span>
          </dt>
          <dd>
            <span>{{ productoOrden.cantidad }}</span>
          </dd>
          <dt>
            <span v-text="$t('deliveryApp.productoOrden.precioTotal')">Precio Total</span>
          </dt>
          <dd>
            <span>{{ productoOrden.precioTotal }}</span>
          </dd>
          <dt>
            <span v-text="$t('deliveryApp.productoOrden.producto')">Producto</span>
          </dt>
          <dd>
            <div v-if="productoOrden.producto">
              <router-link :to="{ name: 'ProductoView', params: { productoId: productoOrden.producto.id } }">{{
                productoOrden.producto.nombre
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('deliveryApp.productoOrden.cart')">Cart</span>
          </dt>
          <dd>
            <div v-if="productoOrden.cart">
              <router-link :to="{ name: 'CarritoView', params: { carritoId: productoOrden.cart.id } }">{{
                productoOrden.cart.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="productoOrden.id"
          :to="{ name: 'ProductoOrdenEdit', params: { productoOrdenId: productoOrden.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./producto-orden-details.component.ts"></script>
