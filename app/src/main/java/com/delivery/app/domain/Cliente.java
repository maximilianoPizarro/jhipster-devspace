package com.delivery.app.domain;

import com.delivery.app.domain.enumeration.Genero;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Cliente.
 */
@Entity
@Table(name = "cliente")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Cliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "genero", nullable = false)
    private Genero genero;

    @NotNull
    @Column(name = "telefono", nullable = false)
    private String telefono;

    @NotNull
    @Column(name = "direccion_1", nullable = false)
    private String direccion1;

    @Column(name = "direccion_2")
    private String direccion2;

    @NotNull
    @Column(name = "ciudad", nullable = false)
    private String ciudad;

    @NotNull
    @Column(name = "pais", nullable = false)
    private String pais;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "cliente")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "ordens", "cliente" }, allowSetters = true)
    private Set<Carrito> carts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cliente id(Long id) {
        this.id = id;
        return this;
    }

    public Genero getGenero() {
        return this.genero;
    }

    public Cliente genero(Genero genero) {
        this.genero = genero;
        return this;
    }

    public void setGenero(Genero genero) {
        this.genero = genero;
    }

    public String getTelefono() {
        return this.telefono;
    }

    public Cliente telefono(String telefono) {
        this.telefono = telefono;
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDireccion1() {
        return this.direccion1;
    }

    public Cliente direccion1(String direccion1) {
        this.direccion1 = direccion1;
        return this;
    }

    public void setDireccion1(String direccion1) {
        this.direccion1 = direccion1;
    }

    public String getDireccion2() {
        return this.direccion2;
    }

    public Cliente direccion2(String direccion2) {
        this.direccion2 = direccion2;
        return this;
    }

    public void setDireccion2(String direccion2) {
        this.direccion2 = direccion2;
    }

    public String getCiudad() {
        return this.ciudad;
    }

    public Cliente ciudad(String ciudad) {
        this.ciudad = ciudad;
        return this;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getPais() {
        return this.pais;
    }

    public Cliente pais(String pais) {
        this.pais = pais;
        return this;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public User getUser() {
        return this.user;
    }

    public Cliente user(User user) {
        this.setUser(user);
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Carrito> getCarts() {
        return this.carts;
    }

    public Cliente carts(Set<Carrito> carritos) {
        this.setCarts(carritos);
        return this;
    }

    public Cliente addCart(Carrito carrito) {
        this.carts.add(carrito);
        carrito.setCliente(this);
        return this;
    }

    public Cliente removeCart(Carrito carrito) {
        this.carts.remove(carrito);
        carrito.setCliente(null);
        return this;
    }

    public void setCarts(Set<Carrito> carritos) {
        if (this.carts != null) {
            this.carts.forEach(i -> i.setCliente(null));
        }
        if (carritos != null) {
            carritos.forEach(i -> i.setCliente(this));
        }
        this.carts = carritos;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cliente)) {
            return false;
        }
        return id != null && id.equals(((Cliente) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cliente{" +
            "id=" + getId() +
            ", genero='" + getGenero() + "'" +
            ", telefono='" + getTelefono() + "'" +
            ", direccion1='" + getDireccion1() + "'" +
            ", direccion2='" + getDireccion2() + "'" +
            ", ciudad='" + getCiudad() + "'" +
            ", pais='" + getPais() + "'" +
            "}";
    }
}
