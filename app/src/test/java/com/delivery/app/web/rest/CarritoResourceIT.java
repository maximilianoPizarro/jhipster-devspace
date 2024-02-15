package com.delivery.app.web.rest;

import static com.delivery.app.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.delivery.app.IntegrationTest;
import com.delivery.app.domain.Carrito;
import com.delivery.app.domain.Cliente;
import com.delivery.app.domain.enumeration.MetodoDePago;
import com.delivery.app.domain.enumeration.OrdenStatus;
import com.delivery.app.repository.CarritoRepository;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
 * Integration tests for the {@link CarritoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CarritoResourceIT {

    private static final Instant DEFAULT_FECHA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final OrdenStatus DEFAULT_STATUS = OrdenStatus.COMPLETO;
    private static final OrdenStatus UPDATED_STATUS = OrdenStatus.PAGADO;

    private static final BigDecimal DEFAULT_PRECIO_TOTAL = new BigDecimal(0);
    private static final BigDecimal UPDATED_PRECIO_TOTAL = new BigDecimal(1);

    private static final MetodoDePago DEFAULT_METODO_DE_PAGO = MetodoDePago.EFECTIVO;
    private static final MetodoDePago UPDATED_METODO_DE_PAGO = MetodoDePago.CUPON;

    private static final String DEFAULT_REFERENCIA = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCIA = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/carritos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CarritoRepository carritoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCarritoMockMvc;

    private Carrito carrito;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Carrito createEntity(EntityManager em) {
        Carrito carrito = new Carrito()
            .fecha(DEFAULT_FECHA)
            .status(DEFAULT_STATUS)
            .precioTotal(DEFAULT_PRECIO_TOTAL)
            .metodoDePago(DEFAULT_METODO_DE_PAGO)
            .referencia(DEFAULT_REFERENCIA);
        // Add required entity
        Cliente cliente;
        if (TestUtil.findAll(em, Cliente.class).isEmpty()) {
            cliente = ClienteResourceIT.createEntity(em);
            em.persist(cliente);
            em.flush();
        } else {
            cliente = TestUtil.findAll(em, Cliente.class).get(0);
        }
        carrito.setCliente(cliente);
        return carrito;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Carrito createUpdatedEntity(EntityManager em) {
        Carrito carrito = new Carrito()
            .fecha(UPDATED_FECHA)
            .status(UPDATED_STATUS)
            .precioTotal(UPDATED_PRECIO_TOTAL)
            .metodoDePago(UPDATED_METODO_DE_PAGO)
            .referencia(UPDATED_REFERENCIA);
        // Add required entity
        Cliente cliente;
        if (TestUtil.findAll(em, Cliente.class).isEmpty()) {
            cliente = ClienteResourceIT.createUpdatedEntity(em);
            em.persist(cliente);
            em.flush();
        } else {
            cliente = TestUtil.findAll(em, Cliente.class).get(0);
        }
        carrito.setCliente(cliente);
        return carrito;
    }

    @BeforeEach
    public void initTest() {
        carrito = createEntity(em);
    }

    @Test
    @Transactional
    void createCarrito() throws Exception {
        int databaseSizeBeforeCreate = carritoRepository.findAll().size();
        // Create the Carrito
        restCarritoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(carrito)))
            .andExpect(status().isCreated());

        // Validate the Carrito in the database
        List<Carrito> carritoList = carritoRepository.findAll();
        assertThat(carritoList).hasSize(databaseSizeBeforeCreate + 1);
        Carrito testCarrito = carritoList.get(carritoList.size() - 1);
        assertThat(testCarrito.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testCarrito.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testCarrito.getPrecioTotal()).isEqualByComparingTo(DEFAULT_PRECIO_TOTAL);
        assertThat(testCarrito.getMetodoDePago()).isEqualTo(DEFAULT_METODO_DE_PAGO);
        assertThat(testCarrito.getReferencia()).isEqualTo(DEFAULT_REFERENCIA);
    }

    @Test
    @Transactional
    void createCarritoWithExistingId() throws Exception {
        // Create the Carrito with an existing ID
        carrito.setId(1L);

        int databaseSizeBeforeCreate = carritoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCarritoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(carrito)))
            .andExpect(status().isBadRequest());

        // Validate the Carrito in the database
        List<Carrito> carritoList = carritoRepository.findAll();
        assertThat(carritoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkFechaIsRequired() throws Exception {
        int databaseSizeBeforeTest = carritoRepository.findAll().size();
        // set the field null
        carrito.setFecha(null);

        // Create the Carrito, which fails.

        restCarritoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(carrito)))
            .andExpect(status().isBadRequest());

        List<Carrito> carritoList = carritoRepository.findAll();
        assertThat(carritoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = carritoRepository.findAll().size();
        // set the field null
        carrito.setStatus(null);

        // Create the Carrito, which fails.

        restCarritoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(carrito)))
            .andExpect(status().isBadRequest());

        List<Carrito> carritoList = carritoRepository.findAll();
        assertThat(carritoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPrecioTotalIsRequired() throws Exception {
        int databaseSizeBeforeTest = carritoRepository.findAll().size();
        // set the field null
        carrito.setPrecioTotal(null);

        // Create the Carrito, which fails.

        restCarritoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(carrito)))
            .andExpect(status().isBadRequest());

        List<Carrito> carritoList = carritoRepository.findAll();
        assertThat(carritoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkMetodoDePagoIsRequired() throws Exception {
        int databaseSizeBeforeTest = carritoRepository.findAll().size();
        // set the field null
        carrito.setMetodoDePago(null);

        // Create the Carrito, which fails.

        restCarritoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(carrito)))
            .andExpect(status().isBadRequest());

        List<Carrito> carritoList = carritoRepository.findAll();
        assertThat(carritoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCarritos() throws Exception {
        // Initialize the database
        carritoRepository.saveAndFlush(carrito);

        // Get all the carritoList
        restCarritoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(carrito.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].precioTotal").value(hasItem(sameNumber(DEFAULT_PRECIO_TOTAL))))
            .andExpect(jsonPath("$.[*].metodoDePago").value(hasItem(DEFAULT_METODO_DE_PAGO.toString())))
            .andExpect(jsonPath("$.[*].referencia").value(hasItem(DEFAULT_REFERENCIA)));
    }

    @Test
    @Transactional
    void getCarrito() throws Exception {
        // Initialize the database
        carritoRepository.saveAndFlush(carrito);

        // Get the carrito
        restCarritoMockMvc
            .perform(get(ENTITY_API_URL_ID, carrito.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(carrito.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.precioTotal").value(sameNumber(DEFAULT_PRECIO_TOTAL)))
            .andExpect(jsonPath("$.metodoDePago").value(DEFAULT_METODO_DE_PAGO.toString()))
            .andExpect(jsonPath("$.referencia").value(DEFAULT_REFERENCIA));
    }

    @Test
    @Transactional
    void getNonExistingCarrito() throws Exception {
        // Get the carrito
        restCarritoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCarrito() throws Exception {
        // Initialize the database
        carritoRepository.saveAndFlush(carrito);

        int databaseSizeBeforeUpdate = carritoRepository.findAll().size();

        // Update the carrito
        Carrito updatedCarrito = carritoRepository.findById(carrito.getId()).get();
        // Disconnect from session so that the updates on updatedCarrito are not directly saved in db
        em.detach(updatedCarrito);
        updatedCarrito
            .fecha(UPDATED_FECHA)
            .status(UPDATED_STATUS)
            .precioTotal(UPDATED_PRECIO_TOTAL)
            .metodoDePago(UPDATED_METODO_DE_PAGO)
            .referencia(UPDATED_REFERENCIA);

        restCarritoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCarrito.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCarrito))
            )
            .andExpect(status().isOk());

        // Validate the Carrito in the database
        List<Carrito> carritoList = carritoRepository.findAll();
        assertThat(carritoList).hasSize(databaseSizeBeforeUpdate);
        Carrito testCarrito = carritoList.get(carritoList.size() - 1);
        assertThat(testCarrito.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testCarrito.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testCarrito.getPrecioTotal()).isEqualTo(UPDATED_PRECIO_TOTAL);
        assertThat(testCarrito.getMetodoDePago()).isEqualTo(UPDATED_METODO_DE_PAGO);
        assertThat(testCarrito.getReferencia()).isEqualTo(UPDATED_REFERENCIA);
    }

    @Test
    @Transactional
    void putNonExistingCarrito() throws Exception {
        int databaseSizeBeforeUpdate = carritoRepository.findAll().size();
        carrito.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCarritoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, carrito.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(carrito))
            )
            .andExpect(status().isBadRequest());

        // Validate the Carrito in the database
        List<Carrito> carritoList = carritoRepository.findAll();
        assertThat(carritoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCarrito() throws Exception {
        int databaseSizeBeforeUpdate = carritoRepository.findAll().size();
        carrito.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCarritoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(carrito))
            )
            .andExpect(status().isBadRequest());

        // Validate the Carrito in the database
        List<Carrito> carritoList = carritoRepository.findAll();
        assertThat(carritoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCarrito() throws Exception {
        int databaseSizeBeforeUpdate = carritoRepository.findAll().size();
        carrito.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCarritoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(carrito)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Carrito in the database
        List<Carrito> carritoList = carritoRepository.findAll();
        assertThat(carritoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCarritoWithPatch() throws Exception {
        // Initialize the database
        carritoRepository.saveAndFlush(carrito);

        int databaseSizeBeforeUpdate = carritoRepository.findAll().size();

        // Update the carrito using partial update
        Carrito partialUpdatedCarrito = new Carrito();
        partialUpdatedCarrito.setId(carrito.getId());

        partialUpdatedCarrito
            .fecha(UPDATED_FECHA)
            .status(UPDATED_STATUS)
            .precioTotal(UPDATED_PRECIO_TOTAL)
            .metodoDePago(UPDATED_METODO_DE_PAGO);

        restCarritoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCarrito.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCarrito))
            )
            .andExpect(status().isOk());

        // Validate the Carrito in the database
        List<Carrito> carritoList = carritoRepository.findAll();
        assertThat(carritoList).hasSize(databaseSizeBeforeUpdate);
        Carrito testCarrito = carritoList.get(carritoList.size() - 1);
        assertThat(testCarrito.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testCarrito.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testCarrito.getPrecioTotal()).isEqualByComparingTo(UPDATED_PRECIO_TOTAL);
        assertThat(testCarrito.getMetodoDePago()).isEqualTo(UPDATED_METODO_DE_PAGO);
        assertThat(testCarrito.getReferencia()).isEqualTo(DEFAULT_REFERENCIA);
    }

    @Test
    @Transactional
    void fullUpdateCarritoWithPatch() throws Exception {
        // Initialize the database
        carritoRepository.saveAndFlush(carrito);

        int databaseSizeBeforeUpdate = carritoRepository.findAll().size();

        // Update the carrito using partial update
        Carrito partialUpdatedCarrito = new Carrito();
        partialUpdatedCarrito.setId(carrito.getId());

        partialUpdatedCarrito
            .fecha(UPDATED_FECHA)
            .status(UPDATED_STATUS)
            .precioTotal(UPDATED_PRECIO_TOTAL)
            .metodoDePago(UPDATED_METODO_DE_PAGO)
            .referencia(UPDATED_REFERENCIA);

        restCarritoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCarrito.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCarrito))
            )
            .andExpect(status().isOk());

        // Validate the Carrito in the database
        List<Carrito> carritoList = carritoRepository.findAll();
        assertThat(carritoList).hasSize(databaseSizeBeforeUpdate);
        Carrito testCarrito = carritoList.get(carritoList.size() - 1);
        assertThat(testCarrito.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testCarrito.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testCarrito.getPrecioTotal()).isEqualByComparingTo(UPDATED_PRECIO_TOTAL);
        assertThat(testCarrito.getMetodoDePago()).isEqualTo(UPDATED_METODO_DE_PAGO);
        assertThat(testCarrito.getReferencia()).isEqualTo(UPDATED_REFERENCIA);
    }

    @Test
    @Transactional
    void patchNonExistingCarrito() throws Exception {
        int databaseSizeBeforeUpdate = carritoRepository.findAll().size();
        carrito.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCarritoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, carrito.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(carrito))
            )
            .andExpect(status().isBadRequest());

        // Validate the Carrito in the database
        List<Carrito> carritoList = carritoRepository.findAll();
        assertThat(carritoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCarrito() throws Exception {
        int databaseSizeBeforeUpdate = carritoRepository.findAll().size();
        carrito.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCarritoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(carrito))
            )
            .andExpect(status().isBadRequest());

        // Validate the Carrito in the database
        List<Carrito> carritoList = carritoRepository.findAll();
        assertThat(carritoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCarrito() throws Exception {
        int databaseSizeBeforeUpdate = carritoRepository.findAll().size();
        carrito.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCarritoMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(carrito)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Carrito in the database
        List<Carrito> carritoList = carritoRepository.findAll();
        assertThat(carritoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCarrito() throws Exception {
        // Initialize the database
        carritoRepository.saveAndFlush(carrito);

        int databaseSizeBeforeDelete = carritoRepository.findAll().size();

        // Delete the carrito
        restCarritoMockMvc
            .perform(delete(ENTITY_API_URL_ID, carrito.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Carrito> carritoList = carritoRepository.findAll();
        assertThat(carritoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
