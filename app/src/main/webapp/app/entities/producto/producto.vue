<template>
  <div>
    <h2 id="page-heading" data-cy="ProductoHeading">
      <span v-text="$t('deliveryApp.producto.home.title')" id="producto-heading">Productos</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('deliveryApp.producto.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'ProductoCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-producto"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('deliveryApp.producto.home.createLabel')"> Create a new Producto </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && productos && productos.length === 0">
      <span v-text="$t('deliveryApp.producto.home.notFound')">No productos found</span>
    </div>
    <div class="table-responsive" v-if="productos && productos.length > 0">
      <table class="table table-striped" aria-describedby="productos">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span v-text="$t('global.field.id')">ID</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('nombre')">
              <span v-text="$t('deliveryApp.producto.nombre')">Nombre</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'nombre'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('description')">
              <span v-text="$t('deliveryApp.producto.description')">Description</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'description'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('precio')">
              <span v-text="$t('deliveryApp.producto.precio')">Precio</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'precio'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('medida')">
              <span v-text="$t('deliveryApp.producto.medida')">Medida</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'medida'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('image')">
              <span v-text="$t('deliveryApp.producto.image')">Image</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'image'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('productoCategoria.nombre')">
              <span v-text="$t('deliveryApp.producto.productoCategoria')">Producto Categoria</span>
              <jhi-sort-indicator
                :current-order="propOrder"
                :reverse="reverse"
                :field-name="'productoCategoria.nombre'"
              ></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productos" :key="producto.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ProductoView', params: { productoId: producto.id } }">{{ producto.id }}</router-link>
            </td>
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.description }}</td>
            <td>{{ producto.precio }}</td>
            <td v-text="$t('deliveryApp.Medida.' + producto.medida)">{{ producto.medida }}</td>
            <td>
              <a v-if="producto.image" v-on:click="openFile(producto.imageContentType, producto.image)">
                <img
                  v-bind:src="'data:' + producto.imageContentType + ';base64,' + producto.image"
                  style="max-height: 30px"
                  alt="producto image"
                />
              </a>
              <span v-if="producto.image">{{ producto.imageContentType }}, {{ byteSize(producto.image) }}</span>
            </td>
            <td>
              <div v-if="producto.productoCategoria">
                <router-link :to="{ name: 'ProductoCategoriaView', params: { productoCategoriaId: producto.productoCategoria.id } }">{{
                  producto.productoCategoria.nombre
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ProductoView', params: { productoId: producto.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ProductoEdit', params: { productoId: producto.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(producto)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="deliveryApp.producto.delete.question" data-cy="productoDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-producto-heading" v-text="$t('deliveryApp.producto.delete.question', { id: removeId })">
          Are you sure you want to delete this Producto?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-producto"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeProducto()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="productos && productos.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./producto.component.ts"></script>
