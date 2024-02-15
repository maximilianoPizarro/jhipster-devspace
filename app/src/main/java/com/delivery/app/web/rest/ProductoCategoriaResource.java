package com.delivery.app.web.rest;

import com.delivery.app.domain.ProductoCategoria;
import com.delivery.app.repository.ProductoCategoriaRepository;
import com.delivery.app.service.ProductoCategoriaService;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.delivery.app.domain.ProductoCategoria}.
 */
@RestController
@RequestMapping("/api")
public class ProductoCategoriaResource {

    private final Logger log = LoggerFactory.getLogger(ProductoCategoriaResource.class);

    private static final String ENTITY_NAME = "productoCategoria";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductoCategoriaService productoCategoriaService;

    private final ProductoCategoriaRepository productoCategoriaRepository;

    public ProductoCategoriaResource(
        ProductoCategoriaService productoCategoriaService,
        ProductoCategoriaRepository productoCategoriaRepository
    ) {
        this.productoCategoriaService = productoCategoriaService;
        this.productoCategoriaRepository = productoCategoriaRepository;
    }

    /**
     * {@code POST  /producto-categorias} : Create a new productoCategoria.
     *
     * @param productoCategoria the productoCategoria to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productoCategoria, or with status {@code 400 (Bad Request)} if the productoCategoria has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/producto-categorias")
    public ResponseEntity<ProductoCategoria> createProductoCategoria(@Valid @RequestBody ProductoCategoria productoCategoria)
        throws URISyntaxException {
        log.debug("REST request to save ProductoCategoria : {}", productoCategoria);
        if (productoCategoria.getId() != null) {
            throw new BadRequestAlertException("A new productoCategoria cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductoCategoria result = productoCategoriaService.save(productoCategoria);
        return ResponseEntity
            .created(new URI("/api/producto-categorias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /producto-categorias/:id} : Updates an existing productoCategoria.
     *
     * @param id the id of the productoCategoria to save.
     * @param productoCategoria the productoCategoria to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productoCategoria,
     * or with status {@code 400 (Bad Request)} if the productoCategoria is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productoCategoria couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/producto-categorias/{id}")
    public ResponseEntity<ProductoCategoria> updateProductoCategoria(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ProductoCategoria productoCategoria
    ) throws URISyntaxException {
        log.debug("REST request to update ProductoCategoria : {}, {}", id, productoCategoria);
        if (productoCategoria.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, productoCategoria.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!productoCategoriaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ProductoCategoria result = productoCategoriaService.save(productoCategoria);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productoCategoria.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /producto-categorias/:id} : Partial updates given fields of an existing productoCategoria, field will ignore if it is null
     *
     * @param id the id of the productoCategoria to save.
     * @param productoCategoria the productoCategoria to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productoCategoria,
     * or with status {@code 400 (Bad Request)} if the productoCategoria is not valid,
     * or with status {@code 404 (Not Found)} if the productoCategoria is not found,
     * or with status {@code 500 (Internal Server Error)} if the productoCategoria couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/producto-categorias/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<ProductoCategoria> partialUpdateProductoCategoria(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ProductoCategoria productoCategoria
    ) throws URISyntaxException {
        log.debug("REST request to partial update ProductoCategoria partially : {}, {}", id, productoCategoria);
        if (productoCategoria.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, productoCategoria.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!productoCategoriaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ProductoCategoria> result = productoCategoriaService.partialUpdate(productoCategoria);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productoCategoria.getId().toString())
        );
    }

    /**
     * {@code GET  /producto-categorias} : get all the productoCategorias.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productoCategorias in body.
     */
    @GetMapping("/producto-categorias")
    public ResponseEntity<List<ProductoCategoria>> getAllProductoCategorias(Pageable pageable) {
        log.debug("REST request to get a page of ProductoCategorias");
        Page<ProductoCategoria> page = productoCategoriaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /producto-categorias/:id} : get the "id" productoCategoria.
     *
     * @param id the id of the productoCategoria to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productoCategoria, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/producto-categorias/{id}")
    public ResponseEntity<ProductoCategoria> getProductoCategoria(@PathVariable Long id) {
        log.debug("REST request to get ProductoCategoria : {}", id);
        Optional<ProductoCategoria> productoCategoria = productoCategoriaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(productoCategoria);
    }

    /**
     * {@code DELETE  /producto-categorias/:id} : delete the "id" productoCategoria.
     *
     * @param id the id of the productoCategoria to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/producto-categorias/{id}")
    public ResponseEntity<Void> deleteProductoCategoria(@PathVariable Long id) {
        log.debug("REST request to delete ProductoCategoria : {}", id);
        productoCategoriaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
