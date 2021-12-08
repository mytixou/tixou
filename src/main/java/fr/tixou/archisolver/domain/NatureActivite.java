package fr.tixou.archisolver.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A NatureActivite.
 */
@Entity
@Table(name = "nature_activite")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class NatureActivite implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "libelle")
    private String libelle;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @ManyToOne
    @ManyToOne
    @ManyToOne
    @JsonIgnoreProperties(
        value = { "tiersFinanceurs", "natureActivites", "natureMontants", "consommationCis", "aide" },
        allowSetters = true
    )
    private StrategieCi strategie;

    @ManyToOne
    @ManyToOne
    @ManyToOne
    @ManyToOne
    @JsonIgnoreProperties(
        value = { "tiersFinanceurs", "natureActivites", "natureMontants", "consommationApas", "aide" },
        allowSetters = true
    )
    private StrategieApa strategie;

    @ManyToOne
    @ManyToOne
    @ManyToOne
    @ManyToOne
    @JsonIgnoreProperties(
        value = { "tiersFinanceurs", "natureActivites", "natureMontants", "consommationPches", "aide" },
        allowSetters = true
    )
    private StrategiePch strategie;

    @ManyToOne
    @ManyToOne
    @ManyToOne
    @ManyToOne
    @JsonIgnoreProperties(
        value = { "tiersFinanceurs", "natureActivites", "natureMontants", "consommationPchES", "aide" },
        allowSetters = true
    )
    private StrategiePchE strategie;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public NatureActivite id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return this.code;
    }

    public NatureActivite code(String code) {
        this.setCode(code);
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLibelle() {
        return this.libelle;
    }

    public NatureActivite libelle(String libelle) {
        this.setLibelle(libelle);
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public String getDescription() {
        return this.description;
    }

    public NatureActivite description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public StrategieCi getStrategie() {
        return this.strategie;
    }

    public void setStrategie(StrategieCi strategieCi) {
        this.strategie = strategieCi;
    }

    public NatureActivite strategie(StrategieCi strategieCi) {
        this.setStrategie(strategieCi);
        return this;
    }

    public StrategieApa getStrategie() {
        return this.strategie;
    }

    public void setStrategie(StrategieApa strategieApa) {
        this.strategie = strategieApa;
    }

    public NatureActivite strategie(StrategieApa strategieApa) {
        this.setStrategie(strategieApa);
        return this;
    }

    public StrategiePch getStrategie() {
        return this.strategie;
    }

    public void setStrategie(StrategiePch strategiePch) {
        this.strategie = strategiePch;
    }

    public NatureActivite strategie(StrategiePch strategiePch) {
        this.setStrategie(strategiePch);
        return this;
    }

    public StrategiePchE getStrategie() {
        return this.strategie;
    }

    public void setStrategie(StrategiePchE strategiePchE) {
        this.strategie = strategiePchE;
    }

    public NatureActivite strategie(StrategiePchE strategiePchE) {
        this.setStrategie(strategiePchE);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NatureActivite)) {
            return false;
        }
        return id != null && id.equals(((NatureActivite) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NatureActivite{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", libelle='" + getLibelle() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
