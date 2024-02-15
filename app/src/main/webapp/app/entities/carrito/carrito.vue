<template>
  <div>
    <h2 id="page-heading" data-cy="CarritoHeading">
      <span v-text="$t('deliveryApp.carrito.home.title')" id="carrito-heading">Carritos</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('deliveryApp.carrito.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'CarritoCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-carrito"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('deliveryApp.carrito.home.createLabel')"> Create a new Carrito </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && carritos && carritos.length === 0">
      <span v-text="$t('deliveryApp.carrito.home.notFound')">No carritos found</span>
    </div>
    <div class="table-responsive" v-if="carritos && carritos.length > 0">
      <table class="table table-striped" aria-describedby="carritos">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('deliveryApp.carrito.fecha')">Fecha</span></th>
            <th scope="row"><span v-text="$t('deliveryApp.carrito.status')">Status</span></th>
            <th scope="row"><span v-text="$t('deliveryApp.carrito.precioTotal')">Precio Total</span></th>
            <th scope="row"><span v-text="$t('deliveryApp.carrito.metodoDePago')">Metodo De Pago</span></th>
            <th scope="row"><span v-text="$t('deliveryApp.carrito.referencia')">Referencia</span></th>
            <th scope="row"><span v-text="$t('deliveryApp.carrito.cliente')">Cliente</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="carrito in carritos" :key="carrito.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'CarritoView', params: { carritoId: carrito.id } }">{{ carrito.id }}</router-link>
            </td>
            <td>{{ carrito.fecha ? $d(Date.parse(carrito.fecha), 'short') : '' }}</td>
            <td v-text="$t('deliveryApp.OrdenStatus.' + carrito.status)">{{ carrito.status }}</td>
            <td>{{ carrito.precioTotal }}</td>
            <td v-text="$t('deliveryApp.MetodoDePago.' + carrito.metodoDePago)">{{ carrito.metodoDePago }}</td>
            <td>{{ carrito.referencia }}</td>
            <td>
              <div v-if="carrito.cliente">
                <router-link :to="{ name: 'ClienteView', params: { clienteId: carrito.cliente.id } }">{{ carrito.cliente.id }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'CarritoView', params: { carritoId: carrito.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'CarritoEdit', params: { carritoId: carrito.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(carrito)"
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
        ><span id="deliveryApp.carrito.delete.question" data-cy="carritoDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-carrito-heading" v-text="$t('deliveryApp.carrito.delete.question', { id: removeId })">
          Are you sure you want to delete this Carrito?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-carrito"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeCarrito()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./carrito.component.ts"></script>
