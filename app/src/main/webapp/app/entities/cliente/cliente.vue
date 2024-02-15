<template>
  <div>
    <h2 id="page-heading" data-cy="ClienteHeading">
      <span v-text="$t('deliveryApp.cliente.home.title')" id="cliente-heading">Clientes</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('deliveryApp.cliente.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'ClienteCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-cliente"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('deliveryApp.cliente.home.createLabel')"> Create a new Cliente </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && clientes && clientes.length === 0">
      <span v-text="$t('deliveryApp.cliente.home.notFound')">No clientes found</span>
    </div>
    <div class="table-responsive" v-if="clientes && clientes.length > 0">
      <table class="table table-striped" aria-describedby="clientes">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span v-text="$t('global.field.id')">ID</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('genero')">
              <span v-text="$t('deliveryApp.cliente.genero')">Genero</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'genero'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('telefono')">
              <span v-text="$t('deliveryApp.cliente.telefono')">Telefono</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'telefono'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('direccion1')">
              <span v-text="$t('deliveryApp.cliente.direccion1')">Direccion 1</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'direccion1'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('direccion2')">
              <span v-text="$t('deliveryApp.cliente.direccion2')">Direccion 2</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'direccion2'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('ciudad')">
              <span v-text="$t('deliveryApp.cliente.ciudad')">Ciudad</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'ciudad'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('pais')">
              <span v-text="$t('deliveryApp.cliente.pais')">Pais</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'pais'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('user.login')">
              <span v-text="$t('deliveryApp.cliente.user')">User</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'user.login'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in clientes" :key="cliente.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ClienteView', params: { clienteId: cliente.id } }">{{ cliente.id }}</router-link>
            </td>
            <td v-text="$t('deliveryApp.Genero.' + cliente.genero)">{{ cliente.genero }}</td>
            <td>{{ cliente.telefono }}</td>
            <td>{{ cliente.direccion1 }}</td>
            <td>{{ cliente.direccion2 }}</td>
            <td>{{ cliente.ciudad }}</td>
            <td>{{ cliente.pais }}</td>
            <td>
              {{ cliente.user ? cliente.user.login : '' }}
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ClienteView', params: { clienteId: cliente.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ClienteEdit', params: { clienteId: cliente.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(cliente)"
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
        ><span id="deliveryApp.cliente.delete.question" data-cy="clienteDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-cliente-heading" v-text="$t('deliveryApp.cliente.delete.question', { id: removeId })">
          Are you sure you want to delete this Cliente?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-cliente"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeCliente()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="clientes && clientes.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./cliente.component.ts"></script>
