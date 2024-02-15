<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="productoCategoria">
        <h2 class="jh-entity-heading" data-cy="productoCategoriaDetailsHeading">
          <span v-text="$t('deliveryApp.productoCategoria.detail.title')">ProductoCategoria</span> {{ productoCategoria.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('deliveryApp.productoCategoria.nombre')">Nombre</span>
          </dt>
          <dd>
            <span>{{ productoCategoria.nombre }}</span>
          </dd>
          <dt>
            <span v-text="$t('deliveryApp.productoCategoria.description')">Description</span>
          </dt>
          <dd>
            <span>{{ productoCategoria.description }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="productoCategoria.id"
          :to="{ name: 'ProductoCategoriaEdit', params: { productoCategoriaId: productoCategoria.id } }"
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

<script lang="ts" src="./producto-categoria-details.component.ts"></script>
