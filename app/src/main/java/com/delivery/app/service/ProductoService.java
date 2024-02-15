package com.delivery.app.service;

import com.delivery.app.domain.Producto;
import com.delivery.app.repository.ProductoRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Producto}.
 */
@Service
@Transactional
public class ProductoService {

    private final Logger log = LoggerFactory.getLogger(ProductoService.class);

    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    /**
     * Save a producto.
     *
     * @param producto the entity to save.
     * @return the persisted entity.
     */
    public Producto save(Producto producto) {
        log.debug("Request to save Producto : {}", producto);
        return productoRepository.save(producto);
    }

    /**
     * Partially update a producto.
     *
     * @param producto the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Producto> partialUpdate(Producto producto) {
        log.debug("Request to partially update Producto : {}", producto);

        return productoRepository
            .findById(producto.getId())
            .map(
                existingProducto -> {
                    if (producto.getNombre() != null) {
                        existingProducto.setNombre(producto.getNombre());
                    }
                    if (producto.getDescription() != null) {
                        existingProducto.setDescription(producto.getDescription());
                    }
                    if (producto.getPrecio() != null) {
                        existingProducto.setPrecio(producto.getPrecio());
                    }
                    if (producto.getMedida() != null) {
                        existingProducto.setMedida(producto.getMedida());
                    }
                    if (producto.getImage() != null) {
                        existingProducto.setImage(producto.getImage());
                    }
                    if (producto.getImageContentType() != null) {
                        existingProducto.setImageContentType(producto.getImageContentType());
                    }

                    return existingProducto;
                }
            )
            .map(productoRepository::save);
    }

    /**
     * Get all the productos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Producto> findAll(Pageable pageable) {
        log.debug("Request to get all Productos");
        return productoRepository.findAll(pageable);
    }

    /**
     * Get one producto by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Producto> findOne(Long id) {
        log.debug("Request to get Producto : {}", id);
        return productoRepository.findById(id);
    }

    /**
     * Delete the producto by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Producto : {}", id);
        productoRepository.deleteById(id);
    }
}
