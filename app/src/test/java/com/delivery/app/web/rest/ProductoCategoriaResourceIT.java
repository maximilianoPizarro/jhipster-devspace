package com.delivery.app.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.delivery.app.IntegrationTest;
import com.delivery.app.domain.ProductoCategoria;
import com.delivery.app.repository.ProductoCategoriaRepository;
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
 * Integration tests for the {@link ProductoCategoriaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ProductoCategoriaResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/producto-categorias";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ProductoCategoriaRepository productoCategoriaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProductoCategoriaMockMvc;

    private ProductoCategoria productoCategoria;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductoCategoria createEntity(EntityManager em) {
        ProductoCategoria productoCategoria = new ProductoCategoria().nombre(DEFAULT_NOMBRE).description(DEFAULT_DESCRIPTION);
        return productoCategoria;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductoCategoria createUpdatedEntity(EntityManager em) {
        ProductoCategoria productoCategoria = new ProductoCategoria().nombre(UPDATED_NOMBRE).description(UPDATED_DESCRIPTION);
        return productoCategoria;
    }

    @BeforeEach
    public void initTest() {
        productoCategoria = createEntity(em);
    }

    @Test
    @Transactional
    void createProductoCategoria() throws Exception {
        int databaseSizeBeforeCreate = productoCategoriaRepository.findAll().size();
        // Create the ProductoCategoria
        restProductoCategoriaMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(productoCategoria))
            )
            .andExpect(status().isCreated());

        // Validate the ProductoCategoria in the database
        List<ProductoCategoria> productoCategoriaList = productoCategoriaRepository.findAll();
        assertThat(productoCategoriaList).hasSize(databaseSizeBeforeCreate + 1);
        ProductoCategoria testProductoCategoria = productoCategoriaList.get(productoCategoriaList.size() - 1);
        assertThat(testProductoCategoria.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testProductoCategoria.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    void createProductoCategoriaWithExistingId() throws Exception {
        // Create the ProductoCategoria with an existing ID
        productoCategoria.setId(1L);

        int databaseSizeBeforeCreate = productoCategoriaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductoCategoriaMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(productoCategoria))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProductoCategoria in the database
        List<ProductoCategoria> productoCategoriaList = productoCategoriaRepository.findAll();
        assertThat(productoCategoriaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = productoCategoriaRepository.findAll().size();
        // set the field null
        productoCategoria.setNombre(null);

        // Create the ProductoCategoria, which fails.

        restProductoCategoriaMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(productoCategoria))
            )
            .andExpect(status().isBadRequest());

        List<ProductoCategoria> productoCategoriaList = productoCategoriaRepository.findAll();
        assertThat(productoCategoriaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllProductoCategorias() throws Exception {
        // Initialize the database
        productoCategoriaRepository.saveAndFlush(productoCategoria);

        // Get all the productoCategoriaList
        restProductoCategoriaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productoCategoria.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    @Transactional
    void getProductoCategoria() throws Exception {
        // Initialize the database
        productoCategoriaRepository.saveAndFlush(productoCategoria);

        // Get the productoCategoria
        restProductoCategoriaMockMvc
            .perform(get(ENTITY_API_URL_ID, productoCategoria.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(productoCategoria.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    void getNonExistingProductoCategoria() throws Exception {
        // Get the productoCategoria
        restProductoCategoriaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewProductoCategoria() throws Exception {
        // Initialize the database
        productoCategoriaRepository.saveAndFlush(productoCategoria);

        int databaseSizeBeforeUpdate = productoCategoriaRepository.findAll().size();

        // Update the productoCategoria
        ProductoCategoria updatedProductoCategoria = productoCategoriaRepository.findById(productoCategoria.getId()).get();
        // Disconnect from session so that the updates on updatedProductoCategoria are not directly saved in db
        em.detach(updatedProductoCategoria);
        updatedProductoCategoria.nombre(UPDATED_NOMBRE).description(UPDATED_DESCRIPTION);

        restProductoCategoriaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedProductoCategoria.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedProductoCategoria))
            )
            .andExpect(status().isOk());

        // Validate the ProductoCategoria in the database
        List<ProductoCategoria> productoCategoriaList = productoCategoriaRepository.findAll();
        assertThat(productoCategoriaList).hasSize(databaseSizeBeforeUpdate);
        ProductoCategoria testProductoCategoria = productoCategoriaList.get(productoCategoriaList.size() - 1);
        assertThat(testProductoCategoria.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testProductoCategoria.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void putNonExistingProductoCategoria() throws Exception {
        int databaseSizeBeforeUpdate = productoCategoriaRepository.findAll().size();
        productoCategoria.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductoCategoriaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, productoCategoria.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(productoCategoria))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProductoCategoria in the database
        List<ProductoCategoria> productoCategoriaList = productoCategoriaRepository.findAll();
        assertThat(productoCategoriaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchProductoCategoria() throws Exception {
        int databaseSizeBeforeUpdate = productoCategoriaRepository.findAll().size();
        productoCategoria.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProductoCategoriaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(productoCategoria))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProductoCategoria in the database
        List<ProductoCategoria> productoCategoriaList = productoCategoriaRepository.findAll();
        assertThat(productoCategoriaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamProductoCategoria() throws Exception {
        int databaseSizeBeforeUpdate = productoCategoriaRepository.findAll().size();
        productoCategoria.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProductoCategoriaMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(productoCategoria))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ProductoCategoria in the database
        List<ProductoCategoria> productoCategoriaList = productoCategoriaRepository.findAll();
        assertThat(productoCategoriaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateProductoCategoriaWithPatch() throws Exception {
        // Initialize the database
        productoCategoriaRepository.saveAndFlush(productoCategoria);

        int databaseSizeBeforeUpdate = productoCategoriaRepository.findAll().size();

        // Update the productoCategoria using partial update
        ProductoCategoria partialUpdatedProductoCategoria = new ProductoCategoria();
        partialUpdatedProductoCategoria.setId(productoCategoria.getId());

        partialUpdatedProductoCategoria.nombre(UPDATED_NOMBRE).description(UPDATED_DESCRIPTION);

        restProductoCategoriaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProductoCategoria.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProductoCategoria))
            )
            .andExpect(status().isOk());

        // Validate the ProductoCategoria in the database
        List<ProductoCategoria> productoCategoriaList = productoCategoriaRepository.findAll();
        assertThat(productoCategoriaList).hasSize(databaseSizeBeforeUpdate);
        ProductoCategoria testProductoCategoria = productoCategoriaList.get(productoCategoriaList.size() - 1);
        assertThat(testProductoCategoria.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testProductoCategoria.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void fullUpdateProductoCategoriaWithPatch() throws Exception {
        // Initialize the database
        productoCategoriaRepository.saveAndFlush(productoCategoria);

        int databaseSizeBeforeUpdate = productoCategoriaRepository.findAll().size();

        // Update the productoCategoria using partial update
        ProductoCategoria partialUpdatedProductoCategoria = new ProductoCategoria();
        partialUpdatedProductoCategoria.setId(productoCategoria.getId());

        partialUpdatedProductoCategoria.nombre(UPDATED_NOMBRE).description(UPDATED_DESCRIPTION);

        restProductoCategoriaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProductoCategoria.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProductoCategoria))
            )
            .andExpect(status().isOk());

        // Validate the ProductoCategoria in the database
        List<ProductoCategoria> productoCategoriaList = productoCategoriaRepository.findAll();
        assertThat(productoCategoriaList).hasSize(databaseSizeBeforeUpdate);
        ProductoCategoria testProductoCategoria = productoCategoriaList.get(productoCategoriaList.size() - 1);
        assertThat(testProductoCategoria.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testProductoCategoria.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void patchNonExistingProductoCategoria() throws Exception {
        int databaseSizeBeforeUpdate = productoCategoriaRepository.findAll().size();
        productoCategoria.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductoCategoriaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, productoCategoria.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(productoCategoria))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProductoCategoria in the database
        List<ProductoCategoria> productoCategoriaList = productoCategoriaRepository.findAll();
        assertThat(productoCategoriaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchProductoCategoria() throws Exception {
        int databaseSizeBeforeUpdate = productoCategoriaRepository.findAll().size();
        productoCategoria.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProductoCategoriaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(productoCategoria))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProductoCategoria in the database
        List<ProductoCategoria> productoCategoriaList = productoCategoriaRepository.findAll();
        assertThat(productoCategoriaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamProductoCategoria() throws Exception {
        int databaseSizeBeforeUpdate = productoCategoriaRepository.findAll().size();
        productoCategoria.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProductoCategoriaMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(productoCategoria))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ProductoCategoria in the database
        List<ProductoCategoria> productoCategoriaList = productoCategoriaRepository.findAll();
        assertThat(productoCategoriaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteProductoCategoria() throws Exception {
        // Initialize the database
        productoCategoriaRepository.saveAndFlush(productoCategoria);

        int databaseSizeBeforeDelete = productoCategoriaRepository.findAll().size();

        // Delete the productoCategoria
        restProductoCategoriaMockMvc
            .perform(delete(ENTITY_API_URL_ID, productoCategoria.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProductoCategoria> productoCategoriaList = productoCategoriaRepository.findAll();
        assertThat(productoCategoriaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
