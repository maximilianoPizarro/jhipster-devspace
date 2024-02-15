<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="producto">
        <h2 class="jh-entity-heading" data-cy="productoDetailsHeading">
          <span v-text="$t('deliveryApp.producto.detail.title')">Producto</span> {{ producto.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('deliveryApp.producto.nombre')">Nombre</span>
          </dt>
          <dd>
            <span>{{ producto.nombre }}</span>
          </dd>
          <dt>
            <span v-text="$t('deliveryApp.producto.description')">Description</span>
          </dt>
          <dd>
            <span>{{ producto.description }}</span>
          </dd>
          <dt>
            <span v-text="$t('deliveryApp.producto.precio')">Precio</span>
          </dt>
          <dd>
            <span>{{ producto.precio }}</span>
          </dd>
          <dt>
            <span v-text="$t('deliveryApp.producto.medida')">Medida</span>
          </dt>
          <dd>
            <span v-text="$t('deliveryApp.Medida.' + producto.medida)">{{ producto.medida }}</span>
          </dd>
          <dt>
            <span v-text="$t('deliveryApp.producto.image')">Image</span>
          </dt>
          <dd>
            <div v-if="producto.image">
              <a v-on:click="openFile(producto.imageContentType, producto.image)">
                <img
                  v-bind:src="'data:' + producto.imageContentType + ';base64,' + producto.image"
                  style="max-width: 100%"
                  alt="producto image"
                />
              </a>
              {{ producto.imageContentType }}, {{ byteSize(producto.image) }}
            </div>
          </dd>
          <dt>
            <span v-text="$t('deliveryApp.producto.productoCategoria')">Producto Categoria</span>
          </dt>
          <dd>
            <div v-if="producto.productoCategoria">
              <router-link :to="{ name: 'ProductoCategoriaView', params: { productoCategoriaId: producto.productoCategoria.id } }">{{
                producto.productoCategoria.nombre
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="producto.id" :to="{ name: 'ProductoEdit', params: { productoId: producto.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./producto-details.component.ts"></script>
