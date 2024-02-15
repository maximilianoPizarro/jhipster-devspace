package com.delivery.app.web.rest;

import com.delivery.app.domain.ProductoOrden;
import com.delivery.app.repository.ProductoOrdenRepository;
import com.delivery.app.service.ProductoOrdenService;
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
 * REST controller for managing {@link com.delivery.app.domain.ProductoOrden}.
 */
@RestController
@RequestMapping("/api")
public class ProductoOrdenResource {

    private final Logger log = LoggerFactory.getLogger(ProductoOrdenResource.class);

    private static final String ENTITY_NAME = "productoOrden";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductoOrdenService productoOrdenService;

    private final ProductoOrdenRepository productoOrdenRepository;

    public ProductoOrdenResource(ProductoOrdenService productoOrdenService, ProductoOrdenRepository productoOrdenRepository) {
        this.productoOrdenService = productoOrdenService;
        this.productoOrdenRepository = productoOrdenRepository;
    }

    /**
     * {@code POST  /producto-ordens} : Create a new productoOrden.
     *
     * @param productoOrden the productoOrden to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productoOrden, or with status {@code 400 (Bad Request)} if the productoOrden has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/producto-ordens")
    public ResponseEntity<ProductoOrden> createProductoOrden(@Valid @RequestBody ProductoOrden productoOrden) throws URISyntaxException {
        log.debug("REST request to save ProductoOrden : {}", productoOrden);
        if (productoOrden.getId() != null) {
            throw new BadRequestAlertException("A new productoOrden cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductoOrden result = productoOrdenService.save(productoOrden);
        return ResponseEntity
            .created(new URI("/api/producto-ordens/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /producto-ordens/:id} : Updates an existing productoOrden.
     *
     * @param id the id of the productoOrden to save.
     * @param productoOrden the productoOrden to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productoOrden,
     * or with status {@code 400 (Bad Request)} if the productoOrden is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productoOrden couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/producto-ordens/{id}")
    public ResponseEntity<ProductoOrden> updateProductoOrden(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ProductoOrden productoOrden
    ) throws URISyntaxException {
        log.debug("REST request to update ProductoOrden : {}, {}", id, productoOrden);
        if (productoOrden.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, productoOrden.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!productoOrdenRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ProductoOrden result = productoOrdenService.save(productoOrden);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productoOrden.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /producto-ordens/:id} : Partial updates given fields of an existing productoOrden, field will ignore if it is null
     *
     * @param id the id of the productoOrden to save.
     * @param productoOrden the productoOrden to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productoOrden,
     * or with status {@code 400 (Bad Request)} if the productoOrden is not valid,
     * or with status {@code 404 (Not Found)} if the productoOrden is not found,
     * or with status {@code 500 (Internal Server Error)} if the productoOrden couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/producto-ordens/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<ProductoOrden> partialUpdateProductoOrden(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ProductoOrden productoOrden
    ) throws URISyntaxException {
        log.debug("REST request to partial update ProductoOrden partially : {}, {}", id, productoOrden);
        if (productoOrden.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, productoOrden.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!productoOrdenRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ProductoOrden> result = productoOrdenService.partialUpdate(productoOrden);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productoOrden.getId().toString())
        );
    }

    /**
     * {@code GET  /producto-ordens} : get all the productoOrdens.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productoOrdens in body.
     */
    @GetMapping("/producto-ordens")
    public List<ProductoOrden> getAllProductoOrdens() {
        log.debug("REST request to get all ProductoOrdens");
        return productoOrdenService.findAll();
    }

    /**
     * {@code GET  /producto-ordens/:id} : get the "id" productoOrden.
     *
     * @param id the id of the productoOrden to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productoOrden, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/producto-ordens/{id}")
    public ResponseEntity<ProductoOrden> getProductoOrden(@PathVariable Long id) {
        log.debug("REST request to get ProductoOrden : {}", id);
        Optional<ProductoOrden> productoOrden = productoOrdenService.findOne(id);
        return ResponseUtil.wrapOrNotFound(productoOrden);
    }

    /**
     * {@code DELETE  /producto-ordens/:id} : delete the "id" productoOrden.
     *
     * @param id the id of the productoOrden to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/producto-ordens/{id}")
    public ResponseEntity<Void> deleteProductoOrden(@PathVariable Long id) {
        log.debug("REST request to delete ProductoOrden : {}", id);
        productoOrdenService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
