<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="cliente">
        <h2 class="jh-entity-heading" data-cy="clienteDetailsHeading">
          <span v-text="$t('deliveryApp.cliente.detail.title')">Cliente</span> {{ cliente.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('deliveryApp.cliente.genero')">Genero</span>
          </dt>
          <dd>
            <span v-text="$t('deliveryApp.Genero.' + cliente.genero)">{{ cliente.genero }}</span>
          </dd>
          <dt>
            <span v-text="$t('deliveryApp.cliente.telefono')">Telefono</span>
          </dt>
          <dd>
            <span>{{ cliente.telefono }}</span>
          </dd>
          <dt>
            <span v-text="$t('deliveryApp.cliente.direccion1')">Direccion 1</span>
          </dt>
          <dd>
            <span>{{ cliente.direccion1 }}</span>
          </dd>
          <dt>
            <span v-text="$t('deliveryApp.cliente.direccion2')">Direccion 2</span>
          </dt>
          <dd>
            <span>{{ cliente.direccion2 }}</span>
          </dd>
          <dt>
            <span v-text="$t('deliveryApp.cliente.ciudad')">Ciudad</span>
          </dt>
          <dd>
            <span>{{ cliente.ciudad }}</span>
          </dd>
          <dt>
            <span v-text="$t('deliveryApp.cliente.pais')">Pais</span>
          </dt>
          <dd>
            <span>{{ cliente.pais }}</span>
          </dd>
          <dt>
            <span v-text="$t('deliveryApp.cliente.user')">User</span>
          </dt>
          <dd>
            {{ cliente.user ? cliente.user.login : '' }}
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="cliente.id" :to="{ name: 'ClienteEdit', params: { clienteId: cliente.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./cliente-details.component.ts"></script>
