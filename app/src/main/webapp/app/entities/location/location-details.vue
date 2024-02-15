<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="location">
        <h2 class="jh-entity-heading" data-cy="locationDetailsHeading">
          <span v-text="t$('deliveryApp.location.detail.title')"></span> {{ location.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('deliveryApp.location.streetAddress')"></span>
          </dt>
          <dd>
            <span>{{ location.streetAddress }}</span>
          </dd>
          <dt>
            <span v-text="t$('deliveryApp.location.postalCode')"></span>
          </dt>
          <dd>
            <span>{{ location.postalCode }}</span>
          </dd>
          <dt>
            <span v-text="t$('deliveryApp.location.city')"></span>
          </dt>
          <dd>
            <span>{{ location.city }}</span>
          </dd>
          <dt>
            <span v-text="t$('deliveryApp.location.stateProvince')"></span>
          </dt>
          <dd>
            <span>{{ location.stateProvince }}</span>
          </dd>
          <dt>
            <span v-text="t$('deliveryApp.location.country')"></span>
          </dt>
          <dd>
            <div v-if="location.country">
              <router-link :to="{ name: 'CountryView', params: { countryId: location.country.id } }">{{ location.country.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link v-if="location.id" :to="{ name: 'LocationEdit', params: { locationId: location.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./location-details.component.ts"></script>
