package com.delivery.app.domain;

import com.delivery.app.domain.enumeration.MetodoDePago;
import com.delivery.app.domain.enumeration.OrdenStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Carrito.
 */
@Entity
@Table(name = "carrito")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Carrito implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "fecha", nullable = false)
    private Instant fecha;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private OrdenStatus status;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "precio_total", precision = 21, scale = 2, nullable = false)
    private BigDecimal precioTotal;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "metodo_de_pago", nullable = false)
    private MetodoDePago metodoDePago;

    @Column(name = "referencia")
    private String referencia;

    @OneToMany(mappedBy = "cart")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "producto", "cart" }, allowSetters = true)
    private Set<ProductoOrden> ordens = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "user", "carts" }, allowSetters = true)
    private Cliente cliente;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Carrito id(Long id) {
        this.id = id;
        return this;
    }

    public Instant getFecha() {
        return this.fecha;
    }

    public Carrito fecha(Instant fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public OrdenStatus getStatus() {
        return this.status;
    }

    public Carrito status(OrdenStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(OrdenStatus status) {
        this.status = status;
    }

    public BigDecimal getPrecioTotal() {
        return this.precioTotal;
    }

    public Carrito precioTotal(BigDecimal precioTotal) {
        this.precioTotal = precioTotal;
        return this;
    }

    public void setPrecioTotal(BigDecimal precioTotal) {
        this.precioTotal = precioTotal;
    }

    public MetodoDePago getMetodoDePago() {
        return this.metodoDePago;
    }

    public Carrito metodoDePago(MetodoDePago metodoDePago) {
        this.metodoDePago = metodoDePago;
        return this;
    }

    public void setMetodoDePago(MetodoDePago metodoDePago) {
        this.metodoDePago = metodoDePago;
    }

    public String getReferencia() {
        return this.referencia;
    }

    public Carrito referencia(String referencia) {
        this.referencia = referencia;
        return this;
    }

    public void setReferencia(String referencia) {
        this.referencia = referencia;
    }

    public Set<ProductoOrden> getOrdens() {
        return this.ordens;
    }

    public Carrito ordens(Set<ProductoOrden> productoOrdens) {
        this.setOrdens(productoOrdens);
        return this;
    }

    public Carrito addOrden(ProductoOrden productoOrden) {
        this.ordens.add(productoOrden);
        productoOrden.setCart(this);
        return this;
    }

    public Carrito removeOrden(ProductoOrden productoOrden) {
        this.ordens.remove(productoOrden);
        productoOrden.setCart(null);
        return this;
    }

    public void setOrdens(Set<ProductoOrden> productoOrdens) {
        if (this.ordens != null) {
            this.ordens.forEach(i -> i.setCart(null));
        }
        if (productoOrdens != null) {
            productoOrdens.forEach(i -> i.setCart(this));
        }
        this.ordens = productoOrdens;
    }

    public Cliente getCliente() {
        return this.cliente;
    }

    public Carrito cliente(Cliente cliente) {
        this.setCliente(cliente);
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Carrito)) {
            return false;
        }
        return id != null && id.equals(((Carrito) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Carrito{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", status='" + getStatus() + "'" +
            ", precioTotal=" + getPrecioTotal() +
            ", metodoDePago='" + getMetodoDePago() + "'" +
            ", referencia='" + getReferencia() + "'" +
            "}";
    }
}
