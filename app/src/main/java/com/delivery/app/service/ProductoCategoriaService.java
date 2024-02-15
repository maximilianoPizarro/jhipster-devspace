package com.delivery.app.service;

import com.delivery.app.domain.ProductoCategoria;
import com.delivery.app.repository.ProductoCategoriaRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ProductoCategoria}.
 */
@Service
@Transactional
public class ProductoCategoriaService {

    private final Logger log = LoggerFactory.getLogger(ProductoCategoriaService.class);

    private final ProductoCategoriaRepository productoCategoriaRepository;

    public ProductoCategoriaService(ProductoCategoriaRepository productoCategoriaRepository) {
        this.productoCategoriaRepository = productoCategoriaRepository;
    }

    /**
     * Save a productoCategoria.
     *
     * @param productoCategoria the entity to save.
     * @return the persisted entity.
     */
    public ProductoCategoria save(ProductoCategoria productoCategoria) {
        log.debug("Request to save ProductoCategoria : {}", productoCategoria);
        return productoCategoriaRepository.save(productoCategoria);
    }

    /**
     * Partially update a productoCategoria.
     *
     * @param productoCategoria the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<ProductoCategoria> partialUpdate(ProductoCategoria productoCategoria) {
        log.debug("Request to partially update ProductoCategoria : {}", productoCategoria);

        return productoCategoriaRepository
            .findById(productoCategoria.getId())
            .map(
                existingProductoCategoria -> {
                    if (productoCategoria.getNombre() != null) {
                        existingProductoCategoria.setNombre(productoCategoria.getNombre());
                    }
                    if (productoCategoria.getDescription() != null) {
                        existingProductoCategoria.setDescription(productoCategoria.getDescription());
                    }

                    return existingProductoCategoria;
                }
            )
            .map(productoCategoriaRepository::save);
    }

    /**
     * Get all the productoCategorias.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<ProductoCategoria> findAll(Pageable pageable) {
        log.debug("Request to get all ProductoCategorias");
        return productoCategoriaRepository.findAll(pageable);
    }

    /**
     * Get one productoCategoria by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ProductoCategoria> findOne(Long id) {
        log.debug("Request to get ProductoCategoria : {}", id);
        return productoCategoriaRepository.findById(id);
    }

    /**
     * Delete the productoCategoria by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete ProductoCategoria : {}", id);
        productoCategoriaRepository.deleteById(id);
    }
}
