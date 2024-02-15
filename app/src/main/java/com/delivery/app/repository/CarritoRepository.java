package com.delivery.app.repository;

import com.delivery.app.domain.Carrito;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Carrito entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CarritoRepository extends JpaRepository<Carrito, Long> {}
