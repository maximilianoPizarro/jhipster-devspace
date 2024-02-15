package com.delivery.app.repository;

import com.delivery.app.domain.ProductoCategoria;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ProductoCategoria entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductoCategoriaRepository extends JpaRepository<ProductoCategoria, Long> {}
