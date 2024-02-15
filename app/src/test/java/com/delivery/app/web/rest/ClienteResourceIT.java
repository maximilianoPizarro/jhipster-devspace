package com.delivery.app.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.delivery.app.IntegrationTest;
import com.delivery.app.domain.Cliente;
import com.delivery.app.domain.User;
import com.delivery.app.domain.enumeration.Genero;
import com.delivery.app.repository.ClienteRepository;
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
 * Integration tests for the {@link ClienteResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ClienteResourceIT {

    private static final Genero DEFAULT_GENERO = Genero.MASCULINO;
    private static final Genero UPDATED_GENERO = Genero.FEMENINO;

    private static final String DEFAULT_TELEFONO = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO = "BBBBBBBBBB";

    private static final String DEFAULT_DIRECCION_1 = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION_1 = "BBBBBBBBBB";

    private static final String DEFAULT_DIRECCION_2 = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION_2 = "BBBBBBBBBB";

    private static final String DEFAULT_CIUDAD = "AAAAAAAAAA";
    private static final String UPDATED_CIUDAD = "BBBBBBBBBB";

    private static final String DEFAULT_PAIS = "AAAAAAAAAA";
    private static final String UPDATED_PAIS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/clientes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restClienteMockMvc;

    private Cliente cliente;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cliente createEntity(EntityManager em) {
        Cliente cliente = new Cliente()
            .genero(DEFAULT_GENERO)
            .telefono(DEFAULT_TELEFONO)
            .direccion1(DEFAULT_DIRECCION_1)
            .direccion2(DEFAULT_DIRECCION_2)
            .ciudad(DEFAULT_CIUDAD)
            .pais(DEFAULT_PAIS);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        cliente.setUser(user);
        return cliente;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cliente createUpdatedEntity(EntityManager em) {
        Cliente cliente = new Cliente()
            .genero(UPDATED_GENERO)
            .telefono(UPDATED_TELEFONO)
            .direccion1(UPDATED_DIRECCION_1)
            .direccion2(UPDATED_DIRECCION_2)
            .ciudad(UPDATED_CIUDAD)
            .pais(UPDATED_PAIS);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        cliente.setUser(user);
        return cliente;
    }

    @BeforeEach
    public void initTest() {
        cliente = createEntity(em);
    }

    @Test
    @Transactional
    void createCliente() throws Exception {
        int databaseSizeBeforeCreate = clienteRepository.findAll().size();
        // Create the Cliente
        restClienteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cliente)))
            .andExpect(status().isCreated());

        // Validate the Cliente in the database
        List<Cliente> clienteList = clienteRepository.findAll();
        assertThat(clienteList).hasSize(databaseSizeBeforeCreate + 1);
        Cliente testCliente = clienteList.get(clienteList.size() - 1);
        assertThat(testCliente.getGenero()).isEqualTo(DEFAULT_GENERO);
        assertThat(testCliente.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
        assertThat(testCliente.getDireccion1()).isEqualTo(DEFAULT_DIRECCION_1);
        assertThat(testCliente.getDireccion2()).isEqualTo(DEFAULT_DIRECCION_2);
        assertThat(testCliente.getCiudad()).isEqualTo(DEFAULT_CIUDAD);
        assertThat(testCliente.getPais()).isEqualTo(DEFAULT_PAIS);
    }

    @Test
    @Transactional
    void createClienteWithExistingId() throws Exception {
        // Create the Cliente with an existing ID
        cliente.setId(1L);

        int databaseSizeBeforeCreate = clienteRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restClienteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cliente)))
            .andExpect(status().isBadRequest());

        // Validate the Cliente in the database
        List<Cliente> clienteList = clienteRepository.findAll();
        assertThat(clienteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkGeneroIsRequired() throws Exception {
        int databaseSizeBeforeTest = clienteRepository.findAll().size();
        // set the field null
        cliente.setGenero(null);

        // Create the Cliente, which fails.

        restClienteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cliente)))
            .andExpect(status().isBadRequest());

        List<Cliente> clienteList = clienteRepository.findAll();
        assertThat(clienteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTelefonoIsRequired() throws Exception {
        int databaseSizeBeforeTest = clienteRepository.findAll().size();
        // set the field null
        cliente.setTelefono(null);

        // Create the Cliente, which fails.

        restClienteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cliente)))
            .andExpect(status().isBadRequest());

        List<Cliente> clienteList = clienteRepository.findAll();
        assertThat(clienteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDireccion1IsRequired() throws Exception {
        int databaseSizeBeforeTest = clienteRepository.findAll().size();
        // set the field null
        cliente.setDireccion1(null);

        // Create the Cliente, which fails.

        restClienteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cliente)))
            .andExpect(status().isBadRequest());

        List<Cliente> clienteList = clienteRepository.findAll();
        assertThat(clienteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkCiudadIsRequired() throws Exception {
        int databaseSizeBeforeTest = clienteRepository.findAll().size();
        // set the field null
        cliente.setCiudad(null);

        // Create the Cliente, which fails.

        restClienteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cliente)))
            .andExpect(status().isBadRequest());

        List<Cliente> clienteList = clienteRepository.findAll();
        assertThat(clienteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPaisIsRequired() throws Exception {
        int databaseSizeBeforeTest = clienteRepository.findAll().size();
        // set the field null
        cliente.setPais(null);

        // Create the Cliente, which fails.

        restClienteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cliente)))
            .andExpect(status().isBadRequest());

        List<Cliente> clienteList = clienteRepository.findAll();
        assertThat(clienteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllClientes() throws Exception {
        // Initialize the database
        clienteRepository.saveAndFlush(cliente);

        // Get all the clienteList
        restClienteMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cliente.getId().intValue())))
            .andExpect(jsonPath("$.[*].genero").value(hasItem(DEFAULT_GENERO.toString())))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO)))
            .andExpect(jsonPath("$.[*].direccion1").value(hasItem(DEFAULT_DIRECCION_1)))
            .andExpect(jsonPath("$.[*].direccion2").value(hasItem(DEFAULT_DIRECCION_2)))
            .andExpect(jsonPath("$.[*].ciudad").value(hasItem(DEFAULT_CIUDAD)))
            .andExpect(jsonPath("$.[*].pais").value(hasItem(DEFAULT_PAIS)));
    }

    @Test
    @Transactional
    void getCliente() throws Exception {
        // Initialize the database
        clienteRepository.saveAndFlush(cliente);

        // Get the cliente
        restClienteMockMvc
            .perform(get(ENTITY_API_URL_ID, cliente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cliente.getId().intValue()))
            .andExpect(jsonPath("$.genero").value(DEFAULT_GENERO.toString()))
            .andExpect(jsonPath("$.telefono").value(DEFAULT_TELEFONO))
            .andExpect(jsonPath("$.direccion1").value(DEFAULT_DIRECCION_1))
            .andExpect(jsonPath("$.direccion2").value(DEFAULT_DIRECCION_2))
            .andExpect(jsonPath("$.ciudad").value(DEFAULT_CIUDAD))
            .andExpect(jsonPath("$.pais").value(DEFAULT_PAIS));
    }

    @Test
    @Transactional
    void getNonExistingCliente() throws Exception {
        // Get the cliente
        restClienteMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCliente() throws Exception {
        // Initialize the database
        clienteRepository.saveAndFlush(cliente);

        int databaseSizeBeforeUpdate = clienteRepository.findAll().size();

        // Update the cliente
        Cliente updatedCliente = clienteRepository.findById(cliente.getId()).get();
        // Disconnect from session so that the updates on updatedCliente are not directly saved in db
        em.detach(updatedCliente);
        updatedCliente
            .genero(UPDATED_GENERO)
            .telefono(UPDATED_TELEFONO)
            .direccion1(UPDATED_DIRECCION_1)
            .direccion2(UPDATED_DIRECCION_2)
            .ciudad(UPDATED_CIUDAD)
            .pais(UPDATED_PAIS);

        restClienteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCliente.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCliente))
            )
            .andExpect(status().isOk());

        // Validate the Cliente in the database
        List<Cliente> clienteList = clienteRepository.findAll();
        assertThat(clienteList).hasSize(databaseSizeBeforeUpdate);
        Cliente testCliente = clienteList.get(clienteList.size() - 1);
        assertThat(testCliente.getGenero()).isEqualTo(UPDATED_GENERO);
        assertThat(testCliente.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testCliente.getDireccion1()).isEqualTo(UPDATED_DIRECCION_1);
        assertThat(testCliente.getDireccion2()).isEqualTo(UPDATED_DIRECCION_2);
        assertThat(testCliente.getCiudad()).isEqualTo(UPDATED_CIUDAD);
        assertThat(testCliente.getPais()).isEqualTo(UPDATED_PAIS);
    }

    @Test
    @Transactional
    void putNonExistingCliente() throws Exception {
        int databaseSizeBeforeUpdate = clienteRepository.findAll().size();
        cliente.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClienteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cliente.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cliente))
            )
            .andExpect(status().isBadRequest());

        // Validate the Cliente in the database
        List<Cliente> clienteList = clienteRepository.findAll();
        assertThat(clienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCliente() throws Exception {
        int databaseSizeBeforeUpdate = clienteRepository.findAll().size();
        cliente.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClienteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cliente))
            )
            .andExpect(status().isBadRequest());

        // Validate the Cliente in the database
        List<Cliente> clienteList = clienteRepository.findAll();
        assertThat(clienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCliente() throws Exception {
        int databaseSizeBeforeUpdate = clienteRepository.findAll().size();
        cliente.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClienteMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cliente)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Cliente in the database
        List<Cliente> clienteList = clienteRepository.findAll();
        assertThat(clienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateClienteWithPatch() throws Exception {
        // Initialize the database
        clienteRepository.saveAndFlush(cliente);

        int databaseSizeBeforeUpdate = clienteRepository.findAll().size();

        // Update the cliente using partial update
        Cliente partialUpdatedCliente = new Cliente();
        partialUpdatedCliente.setId(cliente.getId());

        partialUpdatedCliente.direccion1(UPDATED_DIRECCION_1);

        restClienteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCliente.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCliente))
            )
            .andExpect(status().isOk());

        // Validate the Cliente in the database
        List<Cliente> clienteList = clienteRepository.findAll();
        assertThat(clienteList).hasSize(databaseSizeBeforeUpdate);
        Cliente testCliente = clienteList.get(clienteList.size() - 1);
        assertThat(testCliente.getGenero()).isEqualTo(DEFAULT_GENERO);
        assertThat(testCliente.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
        assertThat(testCliente.getDireccion1()).isEqualTo(UPDATED_DIRECCION_1);
        assertThat(testCliente.getDireccion2()).isEqualTo(DEFAULT_DIRECCION_2);
        assertThat(testCliente.getCiudad()).isEqualTo(DEFAULT_CIUDAD);
        assertThat(testCliente.getPais()).isEqualTo(DEFAULT_PAIS);
    }

    @Test
    @Transactional
    void fullUpdateClienteWithPatch() throws Exception {
        // Initialize the database
        clienteRepository.saveAndFlush(cliente);

        int databaseSizeBeforeUpdate = clienteRepository.findAll().size();

        // Update the cliente using partial update
        Cliente partialUpdatedCliente = new Cliente();
        partialUpdatedCliente.setId(cliente.getId());

        partialUpdatedCliente
            .genero(UPDATED_GENERO)
            .telefono(UPDATED_TELEFONO)
            .direccion1(UPDATED_DIRECCION_1)
            .direccion2(UPDATED_DIRECCION_2)
            .ciudad(UPDATED_CIUDAD)
            .pais(UPDATED_PAIS);

        restClienteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCliente.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCliente))
            )
            .andExpect(status().isOk());

        // Validate the Cliente in the database
        List<Cliente> clienteList = clienteRepository.findAll();
        assertThat(clienteList).hasSize(databaseSizeBeforeUpdate);
        Cliente testCliente = clienteList.get(clienteList.size() - 1);
        assertThat(testCliente.getGenero()).isEqualTo(UPDATED_GENERO);
        assertThat(testCliente.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testCliente.getDireccion1()).isEqualTo(UPDATED_DIRECCION_1);
        assertThat(testCliente.getDireccion2()).isEqualTo(UPDATED_DIRECCION_2);
        assertThat(testCliente.getCiudad()).isEqualTo(UPDATED_CIUDAD);
        assertThat(testCliente.getPais()).isEqualTo(UPDATED_PAIS);
    }

    @Test
    @Transactional
    void patchNonExistingCliente() throws Exception {
        int databaseSizeBeforeUpdate = clienteRepository.findAll().size();
        cliente.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClienteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cliente.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cliente))
            )
            .andExpect(status().isBadRequest());

        // Validate the Cliente in the database
        List<Cliente> clienteList = clienteRepository.findAll();
        assertThat(clienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCliente() throws Exception {
        int databaseSizeBeforeUpdate = clienteRepository.findAll().size();
        cliente.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClienteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cliente))
            )
            .andExpect(status().isBadRequest());

        // Validate the Cliente in the database
        List<Cliente> clienteList = clienteRepository.findAll();
        assertThat(clienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCliente() throws Exception {
        int databaseSizeBeforeUpdate = clienteRepository.findAll().size();
        cliente.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClienteMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(cliente)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Cliente in the database
        List<Cliente> clienteList = clienteRepository.findAll();
        assertThat(clienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCliente() throws Exception {
        // Initialize the database
        clienteRepository.saveAndFlush(cliente);

        int databaseSizeBeforeDelete = clienteRepository.findAll().size();

        // Delete the cliente
        restClienteMockMvc
            .perform(delete(ENTITY_API_URL_ID, cliente.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Cliente> clienteList = clienteRepository.findAll();
        assertThat(clienteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
