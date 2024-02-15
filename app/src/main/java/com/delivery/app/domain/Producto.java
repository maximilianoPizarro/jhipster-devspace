package com.delivery.app.domain;

import com.delivery.app.domain.enumeration.Medida;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * Producto sold by the Online store
 */
@ApiModel(description = "Producto sold by the Online store")
@Entity
@Table(name = "producto")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Producto implements Serializable {

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

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "precio", precision = 21, scale = 2, nullable = false)
    private BigDecimal precio;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "medida", nullable = false)
    private Medida medida;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "productos" }, allowSetters = true)
    private ProductoCategoria productoCategoria;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Producto id(Long id) {
        this.id = id;
        return this;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Producto nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescription() {
        return this.description;
    }

    public Producto description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrecio() {
        return this.precio;
    }

    public Producto precio(BigDecimal precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public Medida getMedida() {
        return this.medida;
    }

    public Producto medida(Medida medida) {
        this.medida = medida;
        return this;
    }

    public void setMedida(Medida medida) {
        this.medida = medida;
    }

    public byte[] getImage() {
        return this.image;
    }

    public Producto image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return this.imageContentType;
    }

    public Producto imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public ProductoCategoria getProductoCategoria() {
        return this.productoCategoria;
    }

    public Producto productoCategoria(ProductoCategoria productoCategoria) {
        this.setProductoCategoria(productoCategoria);
        return this;
    }

    public void setProductoCategoria(ProductoCategoria productoCategoria) {
        this.productoCategoria = productoCategoria;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Producto)) {
            return false;
        }
        return id != null && id.equals(((Producto) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Producto{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", description='" + getDescription() + "'" +
            ", precio=" + getPrecio() +
            ", medida='" + getMedida() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            "}";
    }
}
