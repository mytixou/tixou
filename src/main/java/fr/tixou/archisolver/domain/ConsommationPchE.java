package fr.tixou.archisolver.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ConsommationPchE.
 */
@Entity
@Table(name = "consommation_pch_e")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ConsommationPchE implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "date")
    private Instant date;

    @Column(name = "montant_cotisations", precision = 21, scale = 2)
    private BigDecimal montantCotisations;

    @Column(name = "nb_heures", precision = 21, scale = 2)
    private BigDecimal nbHeures;

    @ManyToOne
    @JsonIgnoreProperties(
        value = {
            "soldeCis",
            "soldeApas",
            "soldePches",
            "soldePchES",
            "consommationCis",
            "consommationApas",
            "consommationPches",
            "consommationPchES",
        },
        allowSetters = true
    )
    private Beneficiaire beneficiaire;

    @ManyToOne
    @JsonIgnoreProperties(
        value = { "tiersFinanceurs", "natureActivites", "natureMontants", "consommationPchES", "aide" },
        allowSetters = true
    )
    private StrategiePchE strategiePchE;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ConsommationPchE id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return this.date;
    }

    public ConsommationPchE date(Instant date) {
        this.setDate(date);
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public BigDecimal getMontantCotisations() {
        return this.montantCotisations;
    }

    public ConsommationPchE montantCotisations(BigDecimal montantCotisations) {
        this.setMontantCotisations(montantCotisations);
        return this;
    }

    public void setMontantCotisations(BigDecimal montantCotisations) {
        this.montantCotisations = montantCotisations;
    }

    public BigDecimal getNbHeures() {
        return this.nbHeures;
    }

    public ConsommationPchE nbHeures(BigDecimal nbHeures) {
        this.setNbHeures(nbHeures);
        return this;
    }

    public void setNbHeures(BigDecimal nbHeures) {
        this.nbHeures = nbHeures;
    }

    public Beneficiaire getBeneficiaire() {
        return this.beneficiaire;
    }

    public void setBeneficiaire(Beneficiaire beneficiaire) {
        this.beneficiaire = beneficiaire;
    }

    public ConsommationPchE beneficiaire(Beneficiaire beneficiaire) {
        this.setBeneficiaire(beneficiaire);
        return this;
    }

    public StrategiePchE getStrategiePchE() {
        return this.strategiePchE;
    }

    public void setStrategiePchE(StrategiePchE strategiePchE) {
        this.strategiePchE = strategiePchE;
    }

    public ConsommationPchE strategiePchE(StrategiePchE strategiePchE) {
        this.setStrategiePchE(strategiePchE);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ConsommationPchE)) {
            return false;
        }
        return id != null && id.equals(((ConsommationPchE) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ConsommationPchE{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", montantCotisations=" + getMontantCotisations() +
            ", nbHeures=" + getNbHeures() +
            "}";
    }
}
