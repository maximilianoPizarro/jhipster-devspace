package com.delivery.app.web.rest;

import static com.delivery.app.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.delivery.app.IntegrationTest;
import com.delivery.app.domain.Carrito;
import com.delivery.app.domain.Producto;
import com.delivery.app.domain.ProductoOrden;
import com.delivery.app.repository.ProductoOrdenRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ProductoOrdenResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ProductoOrdenResourceIT {

    private static final Integer DEFAULT_CANTIDAD = 0;
    private static final Integer UPDATED_CANTIDAD = 1;

    private static final BigDecimal DEFAULT_PRECIO_TOTAL = new BigDecimal(0);
    private static final BigDecimal UPDATED_PRECIO_TOTAL = new BigDecimal(1);

    private static final String ENTITY_API_URL = "/api/producto-ordens";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ProductoOrdenRepository productoOrdenRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProductoOrdenMockMvc;

    private ProductoOrden productoOrden;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductoOrden createEntity(EntityManager em) {
        ProductoOrden productoOrden = new ProductoOrden().cantidad(DEFAULT_CANTIDAD).precioTotal(DEFAULT_PRECIO_TOTAL);
        // Add required entity
        Producto producto;
        if (TestUtil.findAll(em, Producto.class).isEmpty()) {
            producto = ProductoResourceIT.createEntity(em);
            em.persist(producto);
            em.flush();
        } else {
            producto = TestUtil.findAll(em, Producto.class).get(0);
        }
        productoOrden.setProducto(producto);
        // Add required entity
        Carrito carrito;
        if (TestUtil.findAll(em, Carrito.class).isEmpty()) {
            carrito = CarritoResourceIT.createEntity(em);
            em.persist(carrito);
            em.flush();
        } else {
            carrito = TestUtil.findAll(em, Carrito.class).get(0);
        }
        productoOrden.setCart(carrito);
        return productoOrden;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductoOrden createUpdatedEntity(EntityManager em) {
        ProductoOrden productoOrden = new ProductoOrden().cantidad(UPDATED_CANTIDAD).precioTotal(UPDATED_PRECIO_TOTAL);
        // Add required entity
        Producto producto;
        if (TestUtil.findAll(em, Producto.class).isEmpty()) {
            producto = ProductoResourceIT.createUpdatedEntity(em);
            em.persist(producto);
            em.flush();
        } else {
            producto = TestUtil.findAll(em, Producto.class).get(0);
        }
        productoOrden.setProducto(producto);
        // Add required entity
        Carrito carrito;
        if (TestUtil.findAll(em, Carrito.class).isEmpty()) {
            carrito = CarritoResourceIT.createUpdatedEntity(em);
            em.persist(carrito);
            em.flush();
        } else {
            carrito = TestUtil.findAll(em, Carrito.class).get(0);
        }
        productoOrden.setCart(carrito);
        return productoOrden;
    }

    @BeforeEach
    public void initTest() {
        productoOrden = createEntity(em);
    }

    @Test
    @Transactional
    void createProductoOrden() throws Exception {
        int databaseSizeBeforeCreate = productoOrdenRepository.findAll().size();
        // Create the ProductoOrden
        restProductoOrdenMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(productoOrden)))
            .andExpect(status().isCreated());

        // Validate the ProductoOrden in the database
        List<ProductoOrden> productoOrdenList = productoOrdenRepository.findAll();
        assertThat(productoOrdenList).hasSize(databaseSizeBeforeCreate + 1);
        ProductoOrden testProductoOrden = productoOrdenList.get(productoOrdenList.size() - 1);
        assertThat(testProductoOrden.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
        assertThat(testProductoOrden.getPrecioTotal()).isEqualByComparingTo(DEFAULT_PRECIO_TOTAL);
    }

    @Test
    @Transactional
    void createProductoOrdenWithExistingId() throws Exception {
        // Create the ProductoOrden with an existing ID
        productoOrden.setId(1L);

        int databaseSizeBeforeCreate = productoOrdenRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductoOrdenMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(productoOrden)))
            .andExpect(status().isBadRequest());

        // Validate the ProductoOrden in the database
        List<ProductoOrden> productoOrdenList = productoOrdenRepository.findAll();
        assertThat(productoOrdenList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkCantidadIsRequired() throws Exception {
        int databaseSizeBeforeTest = productoOrdenRepository.findAll().size();
        // set the field null
        productoOrden.setCantidad(null);

        // Create the ProductoOrden, which fails.

        restProductoOrdenMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(productoOrden)))
            .andExpect(status().isBadRequest());

        List<ProductoOrden> productoOrdenList = productoOrdenRepository.findAll();
        assertThat(productoOrdenList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPrecioTotalIsRequired() throws Exception {
        int databaseSizeBeforeTest = productoOrdenRepository.findAll().size();
        // set the field null
        productoOrden.setPrecioTotal(null);

        // Create the ProductoOrden, which fails.

        restProductoOrdenMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(productoOrden)))
            .andExpect(status().isBadRequest());

        List<ProductoOrden> productoOrdenList = productoOrdenRepository.findAll();
        assertThat(productoOrdenList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllProductoOrdens() throws Exception {
        // Initialize the database
        productoOrdenRepository.saveAndFlush(productoOrden);

        // Get all the productoOrdenList
        restProductoOrdenMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productoOrden.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD)))
            .andExpect(jsonPath("$.[*].precioTotal").value(hasItem(sameNumber(DEFAULT_PRECIO_TOTAL))));
    }

    @Test
    @Transactional
    void getProductoOrden() throws Exception {
        // Initialize the database
        productoOrdenRepository.saveAndFlush(productoOrden);

        // Get the productoOrden
        restProductoOrdenMockMvc
            .perform(get(ENTITY_API_URL_ID, productoOrden.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(productoOrden.getId().intValue()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD))
            .andExpect(jsonPath("$.precioTotal").value(sameNumber(DEFAULT_PRECIO_TOTAL)));
    }

    @Test
    @Transactional
    void getNonExistingProductoOrden() throws Exception {
        // Get the productoOrden
        restProductoOrdenMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewProductoOrden() throws Exception {
        // Initialize the database
        productoOrdenRepository.saveAndFlush(productoOrden);

        int databaseSizeBeforeUpdate = productoOrdenRepository.findAll().size();

        // Update the productoOrden
        ProductoOrden updatedProductoOrden = productoOrdenRepository.findById(productoOrden.getId()).get();
        // Disconnect from session so that the updates on updatedProductoOrden are not directly saved in db
        em.detach(updatedProductoOrden);
        updatedProductoOrden.cantidad(UPDATED_CANTIDAD).precioTotal(UPDATED_PRECIO_TOTAL);

        restProductoOrdenMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedProductoOrden.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedProductoOrden))
            )
            .andExpect(status().isOk());

        // Validate the ProductoOrden in the database
        List<ProductoOrden> productoOrdenList = productoOrdenRepository.findAll();
        assertThat(productoOrdenList).hasSize(databaseSizeBeforeUpdate);
        ProductoOrden testProductoOrden = productoOrdenList.get(productoOrdenList.size() - 1);
        assertThat(testProductoOrden.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
        assertThat(testProductoOrden.getPrecioTotal()).isEqualTo(UPDATED_PRECIO_TOTAL);
    }

    @Test
    @Transactional
    void putNonExistingProductoOrden() throws Exception {
        int databaseSizeBeforeUpdate = productoOrdenRepository.findAll().size();
        productoOrden.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductoOrdenMockMvc
            .perform(
                put(ENTITY_API_URL_ID, productoOrden.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(productoOrden))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProductoOrden in the database
        List<ProductoOrden> productoOrdenList = productoOrdenRepository.findAll();
        assertThat(productoOrdenList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchProductoOrden() throws Exception {
        int databaseSizeBeforeUpdate = productoOrdenRepository.findAll().size();
        productoOrden.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProductoOrdenMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(productoOrden))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProductoOrden in the database
        List<ProductoOrden> productoOrdenList = productoOrdenRepository.findAll();
        assertThat(productoOrdenList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamProductoOrden() throws Exception {
        int databaseSizeBeforeUpdate = productoOrdenRepository.findAll().size();
        productoOrden.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProductoOrdenMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(productoOrden)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ProductoOrden in the database
        List<ProductoOrden> productoOrdenList = productoOrdenRepository.findAll();
        assertThat(productoOrdenList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateProductoOrdenWithPatch() throws Exception {
        // Initialize the database
        productoOrdenRepository.saveAndFlush(productoOrden);

        int databaseSizeBeforeUpdate = productoOrdenRepository.findAll().size();

        // Update the productoOrden using partial update
        ProductoOrden partialUpdatedProductoOrden = new ProductoOrden();
        partialUpdatedProductoOrden.setId(productoOrden.getId());

        partialUpdatedProductoOrden.precioTotal(UPDATED_PRECIO_TOTAL);

        restProductoOrdenMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProductoOrden.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProductoOrden))
            )
            .andExpect(status().isOk());

        // Validate the ProductoOrden in the database
        List<ProductoOrden> productoOrdenList = productoOrdenRepository.findAll();
        assertThat(productoOrdenList).hasSize(databaseSizeBeforeUpdate);
        ProductoOrden testProductoOrden = productoOrdenList.get(productoOrdenList.size() - 1);
        assertThat(testProductoOrden.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
        assertThat(testProductoOrden.getPrecioTotal()).isEqualByComparingTo(UPDATED_PRECIO_TOTAL);
    }

    @Test
    @Transactional
    void fullUpdateProductoOrdenWithPatch() throws Exception {
        // Initialize the database
        productoOrdenRepository.saveAndFlush(productoOrden);

        int databaseSizeBeforeUpdate = productoOrdenRepository.findAll().size();

        // Update the productoOrden using partial update
        ProductoOrden partialUpdatedProductoOrden = new ProductoOrden();
        partialUpdatedProductoOrden.setId(productoOrden.getId());

        partialUpdatedProductoOrden.cantidad(UPDATED_CANTIDAD).precioTotal(UPDATED_PRECIO_TOTAL);

        restProductoOrdenMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProductoOrden.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProductoOrden))
            )
            .andExpect(status().isOk());

        // Validate the ProductoOrden in the database
        List<ProductoOrden> productoOrdenList = productoOrdenRepository.findAll();
        assertThat(productoOrdenList).hasSize(databaseSizeBeforeUpdate);
        ProductoOrden testProductoOrden = productoOrdenList.get(productoOrdenList.size() - 1);
        assertThat(testProductoOrden.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
        assertThat(testProductoOrden.getPrecioTotal()).isEqualByComparingTo(UPDATED_PRECIO_TOTAL);
    }

    @Test
    @Transactional
    void patchNonExistingProductoOrden() throws Exception {
        int databaseSizeBeforeUpdate = productoOrdenRepository.findAll().size();
        productoOrden.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductoOrdenMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, productoOrden.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(productoOrden))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProductoOrden in the database
        List<ProductoOrden> productoOrdenList = productoOrdenRepository.findAll();
        assertThat(productoOrdenList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchProductoOrden() throws Exception {
        int databaseSizeBeforeUpdate = productoOrdenRepository.findAll().size();
        productoOrden.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProductoOrdenMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(productoOrden))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProductoOrden in the database
        List<ProductoOrden> productoOrdenList = productoOrdenRepository.findAll();
        assertThat(productoOrdenList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamProductoOrden() throws Exception {
        int databaseSizeBeforeUpdate = productoOrdenRepository.findAll().size();
        productoOrden.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProductoOrdenMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(productoOrden))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ProductoOrden in the database
        List<ProductoOrden> productoOrdenList = productoOrdenRepository.findAll();
        assertThat(productoOrdenList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteProductoOrden() throws Exception {
        // Initialize the database
        productoOrdenRepository.saveAndFlush(productoOrden);

        int databaseSizeBeforeDelete = productoOrdenRepository.findAll().size();

        // Delete the productoOrden
        restProductoOrdenMockMvc
            .perform(delete(ENTITY_API_URL_ID, productoOrden.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProductoOrden> productoOrdenList = productoOrdenRepository.findAll();
        assertThat(productoOrdenList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
