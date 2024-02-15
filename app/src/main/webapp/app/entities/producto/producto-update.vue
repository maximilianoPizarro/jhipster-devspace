<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="deliveryApp.producto.home.createOrEditLabel"
          data-cy="ProductoCreateUpdateHeading"
          v-text="$t('deliveryApp.producto.home.createOrEditLabel')"
        >
          Create or edit a Producto
        </h2>
        <div>
          <div class="form-group" v-if="producto.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="producto.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.producto.nombre')" for="producto-nombre">Nombre</label>
            <input
              type="text"
              class="form-control"
              name="nombre"
              id="producto-nombre"
              data-cy="nombre"
              :class="{ valid: !$v.producto.nombre.$invalid, invalid: $v.producto.nombre.$invalid }"
              v-model="$v.producto.nombre.$model"
              required
            />
            <div v-if="$v.producto.nombre.$anyDirty && $v.producto.nombre.$invalid">
              <small class="form-text text-danger" v-if="!$v.producto.nombre.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.producto.description')" for="producto-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="producto-description"
              data-cy="description"
              :class="{ valid: !$v.producto.description.$invalid, invalid: $v.producto.description.$invalid }"
              v-model="$v.producto.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.producto.precio')" for="producto-precio">Precio</label>
            <input
              type="number"
              class="form-control"
              name="precio"
              id="producto-precio"
              data-cy="precio"
              :class="{ valid: !$v.producto.precio.$invalid, invalid: $v.producto.precio.$invalid }"
              v-model.number="$v.producto.precio.$model"
              required
            />
            <div v-if="$v.producto.precio.$anyDirty && $v.producto.precio.$invalid">
              <small class="form-text text-danger" v-if="!$v.producto.precio.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.producto.precio.min" v-text="$t('entity.validation.min', { min: 0 })">
                This field should be at least 0.
              </small>
              <small class="form-text text-danger" v-if="!$v.producto.precio.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.producto.medida')" for="producto-medida">Medida</label>
            <select
              class="form-control"
              name="medida"
              :class="{ valid: !$v.producto.medida.$invalid, invalid: $v.producto.medida.$invalid }"
              v-model="$v.producto.medida.$model"
              id="producto-medida"
              data-cy="medida"
              required
            >
              <option value="S" v-bind:label="$t('deliveryApp.Medida.S')">S</option>
              <option value="M" v-bind:label="$t('deliveryApp.Medida.M')">M</option>
              <option value="L" v-bind:label="$t('deliveryApp.Medida.L')">L</option>
              <option value="XL" v-bind:label="$t('deliveryApp.Medida.XL')">XL</option>
              <option value="XXL" v-bind:label="$t('deliveryApp.Medida.XXL')">XXL</option>
            </select>
            <div v-if="$v.producto.medida.$anyDirty && $v.producto.medida.$invalid">
              <small class="form-text text-danger" v-if="!$v.producto.medida.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.producto.image')" for="producto-image">Image</label>
            <div>
              <img
                v-bind:src="'data:' + producto.imageContentType + ';base64,' + producto.image"
                style="max-height: 100px"
                v-if="producto.image"
                alt="producto image"
              />
              <div v-if="producto.image" class="form-text text-danger clearfix">
                <span class="pull-left">{{ producto.imageContentType }}, {{ byteSize(producto.image) }}</span>
                <button
                  type="button"
                  v-on:click="clearInputImage('image', 'imageContentType', 'file_image')"
                  class="btn btn-secondary btn-xs pull-right"
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                </button>
              </div>
              <input
                type="file"
                ref="file_image"
                id="file_image"
                data-cy="image"
                v-on:change="setFileData($event, producto, 'image', true)"
                accept="image/*"
                v-text="$t('entity.action.addimage')"
              />
            </div>
            <input
              type="hidden"
              class="form-control"
              name="image"
              id="producto-image"
              data-cy="image"
              :class="{ valid: !$v.producto.image.$invalid, invalid: $v.producto.image.$invalid }"
              v-model="$v.producto.image.$model"
            />
            <input
              type="hidden"
              class="form-control"
              name="imageContentType"
              id="producto-imageContentType"
              v-model="producto.imageContentType"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('deliveryApp.producto.productoCategoria')" for="producto-productoCategoria"
              >Producto Categoria</label
            >
            <select
              class="form-control"
              id="producto-productoCategoria"
              data-cy="productoCategoria"
              name="productoCategoria"
              v-model="producto.productoCategoria"
              required
            >
              <option v-if="!producto.productoCategoria" v-bind:value="null" selected></option>
              <option
                v-bind:value="
                  producto.productoCategoria && productoCategoriaOption.id === producto.productoCategoria.id
                    ? producto.productoCategoria
                    : productoCategoriaOption
                "
                v-for="productoCategoriaOption in productoCategorias"
                :key="productoCategoriaOption.id"
              >
                {{ productoCategoriaOption.nombre }}
              </option>
            </select>
          </div>
          <div v-if="$v.producto.productoCategoria.$anyDirty && $v.producto.productoCategoria.$invalid">
            <small class="form-text text-danger" v-if="!$v.producto.productoCategoria.required" v-text="$t('entity.validation.required')">
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
            :disabled="$v.producto.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./producto-update.component.ts"></script>
