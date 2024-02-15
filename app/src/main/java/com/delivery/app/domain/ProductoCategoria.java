package com.delivery.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ProductoCategoria.
 */
@Entity
@Table(name = "producto_categoria")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ProductoCategoria implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "productoCategoria")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "productoCategoria" }, allowSetters = true)
    private Set<Producto> productos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProductoCategoria id(Long id) {
        this.id = id;
        return this;
    }

    public String getNombre() {
        return this.nombre;
    }

    public ProductoCategoria nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescription() {
        return this.description;
    }

    public ProductoCategoria description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Producto> getProductos() {
        return this.productos;
    }

    public ProductoCategoria productos(Set<Producto> productos) {
        this.setProductos(productos);
        return this;
    }

    public ProductoCategoria addProducto(Producto producto) {
        this.productos.add(producto);
        producto.setProductoCategoria(this);
        return this;
    }

    public ProductoCategoria removeProducto(Producto producto) {
        this.productos.remove(producto);
        producto.setProductoCategoria(null);
        return this;
    }

    public void setProductos(Set<Producto> productos) {
        if (this.productos != null) {
            this.productos.forEach(i -> i.setProductoCategoria(null));
        }
        if (productos != null) {
            productos.forEach(i -> i.setProductoCategoria(this));
        }
        this.productos = productos;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProductoCategoria)) {
            return false;
        }
        return id != null && id.equals(((ProductoCategoria) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProductoCategoria{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
