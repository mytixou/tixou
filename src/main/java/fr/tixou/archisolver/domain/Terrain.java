package fr.tixou.archisolver.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Terrain.
 */
@Entity
@Table(name = "terrain")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Terrain implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "parcelle", nullable = false)
    private String parcelle;

    @Column(name = "surface", precision = 21, scale = 2)
    private BigDecimal surface;

    @JsonIgnoreProperties(value = { "departement" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Adresse adresse;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Terrain id(Long id) {
        this.id = id;
        return this;
    }

    public String getParcelle() {
        return this.parcelle;
    }

    public Terrain parcelle(String parcelle) {
        this.parcelle = parcelle;
        return this;
    }

    public void setParcelle(String parcelle) {
        this.parcelle = parcelle;
    }

    public BigDecimal getSurface() {
        return this.surface;
    }

    public Terrain surface(BigDecimal surface) {
        this.surface = surface;
        return this;
    }

    public void setSurface(BigDecimal surface) {
        this.surface = surface;
    }

    public Adresse getAdresse() {
        return this.adresse;
    }

    public Terrain adresse(Adresse adresse) {
        this.setAdresse(adresse);
        return this;
    }

    public void setAdresse(Adresse adresse) {
        this.adresse = adresse;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Terrain)) {
            return false;
        }
        return id != null && id.equals(((Terrain) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Terrain{" +
            "id=" + getId() +
            ", parcelle='" + getParcelle() + "'" +
            ", surface=" + getSurface() +
            "}";
    }
}
