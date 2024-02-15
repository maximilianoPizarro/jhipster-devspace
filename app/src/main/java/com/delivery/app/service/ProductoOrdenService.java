package com.delivery.app.service;

import com.delivery.app.domain.ProductoOrden;
import com.delivery.app.repository.ProductoOrdenRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ProductoOrden}.
 */
@Service
@Transactional
public class ProductoOrdenService {

    private final Logger log = LoggerFactory.getLogger(ProductoOrdenService.class);

    private final ProductoOrdenRepository productoOrdenRepository;

    public ProductoOrdenService(ProductoOrdenRepository productoOrdenRepository) {
        this.productoOrdenRepository = productoOrdenRepository;
    }

    /**
     * Save a productoOrden.
     *
     * @param productoOrden the entity to save.
     * @return the persisted entity.
     */
    public ProductoOrden save(ProductoOrden productoOrden) {
        log.debug("Request to save ProductoOrden : {}", productoOrden);
        return productoOrdenRepository.save(productoOrden);
    }

    /**
     * Partially update a productoOrden.
     *
     * @param productoOrden the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<ProductoOrden> partialUpdate(ProductoOrden productoOrden) {
        log.debug("Request to partially update ProductoOrden : {}", productoOrden);

        return productoOrdenRepository
            .findById(productoOrden.getId())
            .map(
                existingProductoOrden -> {
                    if (productoOrden.getCantidad() != null) {
                        existingProductoOrden.setCantidad(productoOrden.getCantidad());
                    }
                    if (productoOrden.getPrecioTotal() != null) {
                        existingProductoOrden.setPrecioTotal(productoOrden.getPrecioTotal());
                    }

                    return existingProductoOrden;
                }
            )
            .map(productoOrdenRepository::save);
    }

    /**
     * Get all the productoOrdens.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ProductoOrden> findAll() {
        log.debug("Request to get all ProductoOrdens");
        return productoOrdenRepository.findAll();
    }

    /**
     * Get one productoOrden by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ProductoOrden> findOne(Long id) {
        log.debug("Request to get ProductoOrden : {}", id);
        return productoOrdenRepository.findById(id);
    }

    /**
     * Delete the productoOrden by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete ProductoOrden : {}", id);
        productoOrdenRepository.deleteById(id);
    }
}
