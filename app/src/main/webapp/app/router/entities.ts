import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const Producto = () => import('@/entities/producto/producto.vue');
// prettier-ignore
const ProductoUpdate = () => import('@/entities/producto/producto-update.vue');
// prettier-ignore
const ProductoDetails = () => import('@/entities/producto/producto-details.vue');
// prettier-ignore
const ProductoCategoria = () => import('@/entities/producto-categoria/producto-categoria.vue');
// prettier-ignore
const ProductoCategoriaUpdate = () => import('@/entities/producto-categoria/producto-categoria-update.vue');
// prettier-ignore
const ProductoCategoriaDetails = () => import('@/entities/producto-categoria/producto-categoria-details.vue');
// prettier-ignore
const Cliente = () => import('@/entities/cliente/cliente.vue');
// prettier-ignore
const ClienteUpdate = () => import('@/entities/cliente/cliente-update.vue');
// prettier-ignore
const ClienteDetails = () => import('@/entities/cliente/cliente-details.vue');
// prettier-ignore
const Carrito = () => import('@/entities/carrito/carrito.vue');
// prettier-ignore
const CarritoUpdate = () => import('@/entities/carrito/carrito-update.vue');
// prettier-ignore
const CarritoDetails = () => import('@/entities/carrito/carrito-details.vue');
// prettier-ignore
const ProductoOrden = () => import('@/entities/producto-orden/producto-orden.vue');
// prettier-ignore
const ProductoOrdenUpdate = () => import('@/entities/producto-orden/producto-orden-update.vue');
// prettier-ignore
const ProductoOrdenDetails = () => import('@/entities/producto-orden/producto-orden-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/producto',
    name: 'Producto',
    component: Producto,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/producto/new',
    name: 'ProductoCreate',
    component: ProductoUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/producto/:productoId/edit',
    name: 'ProductoEdit',
    component: ProductoUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/producto/:productoId/view',
    name: 'ProductoView',
    component: ProductoDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/producto-categoria',
    name: 'ProductoCategoria',
    component: ProductoCategoria,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/producto-categoria/new',
    name: 'ProductoCategoriaCreate',
    component: ProductoCategoriaUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/producto-categoria/:productoCategoriaId/edit',
    name: 'ProductoCategoriaEdit',
    component: ProductoCategoriaUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/producto-categoria/:productoCategoriaId/view',
    name: 'ProductoCategoriaView',
    component: ProductoCategoriaDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/cliente',
    name: 'Cliente',
    component: Cliente,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/cliente/new',
    name: 'ClienteCreate',
    component: ClienteUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/cliente/:clienteId/edit',
    name: 'ClienteEdit',
    component: ClienteUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/cliente/:clienteId/view',
    name: 'ClienteView',
    component: ClienteDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/carrito',
    name: 'Carrito',
    component: Carrito,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/carrito/new',
    name: 'CarritoCreate',
    component: CarritoUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/carrito/:carritoId/edit',
    name: 'CarritoEdit',
    component: CarritoUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/carrito/:carritoId/view',
    name: 'CarritoView',
    component: CarritoDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/producto-orden',
    name: 'ProductoOrden',
    component: ProductoOrden,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/producto-orden/new',
    name: 'ProductoOrdenCreate',
    component: ProductoOrdenUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/producto-orden/:productoOrdenId/edit',
    name: 'ProductoOrdenEdit',
    component: ProductoOrdenUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/producto-orden/:productoOrdenId/view',
    name: 'ProductoOrdenView',
    component: ProductoOrdenDetails,
    meta: { authorities: [Authority.USER] },
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];
