package com.delivery.app.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.delivery.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProductoOrdenTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductoOrden.class);
        ProductoOrden productoOrden1 = new ProductoOrden();
        productoOrden1.setId(1L);
        ProductoOrden productoOrden2 = new ProductoOrden();
        productoOrden2.setId(productoOrden1.getId());
        assertThat(productoOrden1).isEqualTo(productoOrden2);
        productoOrden2.setId(2L);
        assertThat(productoOrden1).isNotEqualTo(productoOrden2);
        productoOrden1.setId(null);
        assertThat(productoOrden1).isNotEqualTo(productoOrden2);
    }
}
