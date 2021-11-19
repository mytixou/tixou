package fr.tixou.archisolver.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Batiment.
 */
@Entity
@Table(name = "batiment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Batiment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "emprise", precision = 21, scale = 2)
    private BigDecimal emprise;

    @Column(name = "hauteur", precision = 21, scale = 2)
    private BigDecimal hauteur;

    @Column(name = "etages")
    private Integer etages;

    @ManyToOne
    @JsonIgnoreProperties(value = { "adresse" }, allowSetters = true)
    private Terrain terrain;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Batiment id(Long id) {
        this.id = id;
        return this;
    }

    public String getNom() {
        return this.nom;
    }

    public Batiment nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public BigDecimal getEmprise() {
        return this.emprise;
    }

    public Batiment emprise(BigDecimal emprise) {
        this.emprise = emprise;
        return this;
    }

    public void setEmprise(BigDecimal emprise) {
        this.emprise = emprise;
    }

    public BigDecimal getHauteur() {
        return this.hauteur;
    }

    public Batiment hauteur(BigDecimal hauteur) {
        this.hauteur = hauteur;
        return this;
    }

    public void setHauteur(BigDecimal hauteur) {
        this.hauteur = hauteur;
    }

    public Integer getEtages() {
        return this.etages;
    }

    public Batiment etages(Integer etages) {
        this.etages = etages;
        return this;
    }

    public void setEtages(Integer etages) {
        this.etages = etages;
    }

    public Terrain getTerrain() {
        return this.terrain;
    }

    public Batiment terrain(Terrain terrain) {
        this.setTerrain(terrain);
        return this;
    }

    public void setTerrain(Terrain terrain) {
        this.terrain = terrain;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Batiment)) {
            return false;
        }
        return id != null && id.equals(((Batiment) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Batiment{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", emprise=" + getEmprise() +
            ", hauteur=" + getHauteur() +
            ", etages=" + getEtages() +
            "}";
    }
}
