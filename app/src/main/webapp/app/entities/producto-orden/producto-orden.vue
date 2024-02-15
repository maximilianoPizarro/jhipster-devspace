<template>
  <div>
    <h2 id="page-heading" data-cy="ProductoOrdenHeading">
      <span v-text="$t('deliveryApp.productoOrden.home.title')" id="producto-orden-heading">Producto Ordens</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('deliveryApp.productoOrden.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'ProductoOrdenCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-producto-orden"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('deliveryApp.productoOrden.home.createLabel')"> Create a new Producto Orden </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && productoOrdens && productoOrdens.length === 0">
      <span v-text="$t('deliveryApp.productoOrden.home.notFound')">No productoOrdens found</span>
    </div>
    <div class="table-responsive" v-if="productoOrdens && productoOrdens.length > 0">
      <table class="table table-striped" aria-describedby="productoOrdens">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('deliveryApp.productoOrden.cantidad')">Cantidad</span></th>
            <th scope="row"><span v-text="$t('deliveryApp.productoOrden.precioTotal')">Precio Total</span></th>
            <th scope="row"><span v-text="$t('deliveryApp.productoOrden.producto')">Producto</span></th>
            <th scope="row"><span v-text="$t('deliveryApp.productoOrden.cart')">Cart</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="productoOrden in productoOrdens" :key="productoOrden.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ProductoOrdenView', params: { productoOrdenId: productoOrden.id } }">{{
                productoOrden.id
              }}</router-link>
            </td>
            <td>{{ productoOrden.cantidad }}</td>
            <td>{{ productoOrden.precioTotal }}</td>
            <td>
              <div v-if="productoOrden.producto">
                <router-link :to="{ name: 'ProductoView', params: { productoId: productoOrden.producto.id } }">{{
                  productoOrden.producto.nombre
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="productoOrden.cart">
                <router-link :to="{ name: 'CarritoView', params: { carritoId: productoOrden.cart.id } }">{{
                  productoOrden.cart.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'ProductoOrdenView', params: { productoOrdenId: productoOrden.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'ProductoOrdenEdit', params: { productoOrdenId: productoOrden.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(productoOrden)"
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
        ><span id="deliveryApp.productoOrden.delete.question" data-cy="productoOrdenDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-productoOrden-heading" v-text="$t('deliveryApp.productoOrden.delete.question', { id: removeId })">
          Are you sure you want to delete this Producto Orden?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-productoOrden"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeProductoOrden()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./producto-orden.component.ts"></script>
