package com.delivery.app.service;

import com.delivery.app.domain.Carrito;
import com.delivery.app.repository.CarritoRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Carrito}.
 */
@Service
@Transactional
public class CarritoService {

    private final Logger log = LoggerFactory.getLogger(CarritoService.class);

    private final CarritoRepository carritoRepository;

    public CarritoService(CarritoRepository carritoRepository) {
        this.carritoRepository = carritoRepository;
    }

    /**
     * Save a carrito.
     *
     * @param carrito the entity to save.
     * @return the persisted entity.
     */
    public Carrito save(Carrito carrito) {
        log.debug("Request to save Carrito : {}", carrito);
        return carritoRepository.save(carrito);
    }

    /**
     * Partially update a carrito.
     *
     * @param carrito the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Carrito> partialUpdate(Carrito carrito) {
        log.debug("Request to partially update Carrito : {}", carrito);

        return carritoRepository
            .findById(carrito.getId())
            .map(
                existingCarrito -> {
                    if (carrito.getFecha() != null) {
                        existingCarrito.setFecha(carrito.getFecha());
                    }
                    if (carrito.getStatus() != null) {
                        existingCarrito.setStatus(carrito.getStatus());
                    }
                    if (carrito.getPrecioTotal() != null) {
                        existingCarrito.setPrecioTotal(carrito.getPrecioTotal());
                    }
                    if (carrito.getMetodoDePago() != null) {
                        existingCarrito.setMetodoDePago(carrito.getMetodoDePago());
                    }
                    if (carrito.getReferencia() != null) {
                        existingCarrito.setReferencia(carrito.getReferencia());
                    }

                    return existingCarrito;
                }
            )
            .map(carritoRepository::save);
    }

    /**
     * Get all the carritos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Carrito> findAll() {
        log.debug("Request to get all Carritos");
        return carritoRepository.findAll();
    }

    /**
     * Get one carrito by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Carrito> findOne(Long id) {
        log.debug("Request to get Carrito : {}", id);
        return carritoRepository.findById(id);
    }

    /**
     * Delete the carrito by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Carrito : {}", id);
        carritoRepository.deleteById(id);
    }
}
