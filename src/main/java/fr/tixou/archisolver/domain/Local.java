package fr.tixou.archisolver.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import fr.tixou.archisolver.domain.enumeration.TypeLocal;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Local.
 */
@Entity
@Table(name = "local")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Local implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "designation")
    private String designation;

    @Column(name = "surface", precision = 21, scale = 2)
    private BigDecimal surface;

    @Column(name = "etage")
    private Integer etage;

    @Enumerated(EnumType.STRING)
    @Column(name = "typelocal")
    private TypeLocal typelocal;

    @ManyToOne
    @JsonIgnoreProperties(value = { "terrain" }, allowSetters = true)
    private Batiment batiment;

    @ManyToMany(mappedBy = "locals")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "locals" }, allowSetters = true)
    private Set<Proprietaire> proprietaires = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Local id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDesignation() {
        return this.designation;
    }

    public Local designation(String designation) {
        this.setDesignation(designation);
        return this;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public BigDecimal getSurface() {
        return this.surface;
    }

    public Local surface(BigDecimal surface) {
        this.setSurface(surface);
        return this;
    }

    public void setSurface(BigDecimal surface) {
        this.surface = surface;
    }

    public Integer getEtage() {
        return this.etage;
    }

    public Local etage(Integer etage) {
        this.setEtage(etage);
        return this;
    }

    public void setEtage(Integer etage) {
        this.etage = etage;
    }

    public TypeLocal getTypelocal() {
        return this.typelocal;
    }

    public Local typelocal(TypeLocal typelocal) {
        this.setTypelocal(typelocal);
        return this;
    }

    public void setTypelocal(TypeLocal typelocal) {
        this.typelocal = typelocal;
    }

    public Batiment getBatiment() {
        return this.batiment;
    }

    public void setBatiment(Batiment batiment) {
        this.batiment = batiment;
    }

    public Local batiment(Batiment batiment) {
        this.setBatiment(batiment);
        return this;
    }

    public Set<Proprietaire> getProprietaires() {
        return this.proprietaires;
    }

    public void setProprietaires(Set<Proprietaire> proprietaires) {
        if (this.proprietaires != null) {
            this.proprietaires.forEach(i -> i.removeLocal(this));
        }
        if (proprietaires != null) {
            proprietaires.forEach(i -> i.addLocal(this));
        }
        this.proprietaires = proprietaires;
    }

    public Local proprietaires(Set<Proprietaire> proprietaires) {
        this.setProprietaires(proprietaires);
        return this;
    }

    public Local addProprietaire(Proprietaire proprietaire) {
        this.proprietaires.add(proprietaire);
        proprietaire.getLocals().add(this);
        return this;
    }

    public Local removeProprietaire(Proprietaire proprietaire) {
        this.proprietaires.remove(proprietaire);
        proprietaire.getLocals().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Local)) {
            return false;
        }
        return id != null && id.equals(((Local) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Local{" +
            "id=" + getId() +
            ", designation='" + getDesignation() + "'" +
            ", surface=" + getSurface() +
            ", etage=" + getEtage() +
            ", typelocal='" + getTypelocal() + "'" +
            "}";
    }
}
