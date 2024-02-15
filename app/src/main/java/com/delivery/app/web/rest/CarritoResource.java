package com.delivery.app.web.rest;

import com.delivery.app.domain.Carrito;
import com.delivery.app.repository.CarritoRepository;
import com.delivery.app.service.CarritoService;
import com.delivery.app.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.delivery.app.domain.Carrito}.
 */
@RestController
@RequestMapping("/api")
public class CarritoResource {

    private final Logger log = LoggerFactory.getLogger(CarritoResource.class);

    private static final String ENTITY_NAME = "carrito";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CarritoService carritoService;

    private final CarritoRepository carritoRepository;

    public CarritoResource(CarritoService carritoService, CarritoRepository carritoRepository) {
        this.carritoService = carritoService;
        this.carritoRepository = carritoRepository;
    }

    /**
     * {@code POST  /carritos} : Create a new carrito.
     *
     * @param carrito the carrito to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new carrito, or with status {@code 400 (Bad Request)} if the carrito has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/carritos")
    public ResponseEntity<Carrito> createCarrito(@Valid @RequestBody Carrito carrito) throws URISyntaxException {
        log.debug("REST request to save Carrito : {}", carrito);
        if (carrito.getId() != null) {
            throw new BadRequestAlertException("A new carrito cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Carrito result = carritoService.save(carrito);
        return ResponseEntity
            .created(new URI("/api/carritos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /carritos/:id} : Updates an existing carrito.
     *
     * @param id the id of the carrito to save.
     * @param carrito the carrito to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated carrito,
     * or with status {@code 400 (Bad Request)} if the carrito is not valid,
     * or with status {@code 500 (Internal Server Error)} if the carrito couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/carritos/{id}")
    public ResponseEntity<Carrito> updateCarrito(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Carrito carrito
    ) throws URISyntaxException {
        log.debug("REST request to update Carrito : {}, {}", id, carrito);
        if (carrito.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, carrito.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!carritoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Carrito result = carritoService.save(carrito);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, carrito.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /carritos/:id} : Partial updates given fields of an existing carrito, field will ignore if it is null
     *
     * @param id the id of the carrito to save.
     * @param carrito the carrito to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated carrito,
     * or with status {@code 400 (Bad Request)} if the carrito is not valid,
     * or with status {@code 404 (Not Found)} if the carrito is not found,
     * or with status {@code 500 (Internal Server Error)} if the carrito couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/carritos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Carrito> partialUpdateCarrito(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Carrito carrito
    ) throws URISyntaxException {
        log.debug("REST request to partial update Carrito partially : {}, {}", id, carrito);
        if (carrito.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, carrito.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!carritoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Carrito> result = carritoService.partialUpdate(carrito);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, carrito.getId().toString())
        );
    }

    /**
     * {@code GET  /carritos} : get all the carritos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of carritos in body.
     */
    @GetMapping("/carritos")
    public List<Carrito> getAllCarritos() {
        log.debug("REST request to get all Carritos");
        return carritoService.findAll();
    }

    /**
     * {@code GET  /carritos/:id} : get the "id" carrito.
     *
     * @param id the id of the carrito to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the carrito, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/carritos/{id}")
    public ResponseEntity<Carrito> getCarrito(@PathVariable Long id) {
        log.debug("REST request to get Carrito : {}", id);
        Optional<Carrito> carrito = carritoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(carrito);
    }

    /**
     * {@code DELETE  /carritos/:id} : delete the "id" carrito.
     *
     * @param id the id of the carrito to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/carritos/{id}")
    public ResponseEntity<Void> deleteCarrito(@PathVariable Long id) {
        log.debug("REST request to delete Carrito : {}", id);
        carritoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
