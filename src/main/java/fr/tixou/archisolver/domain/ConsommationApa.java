package fr.tixou.archisolver.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ConsommationApa.
 */
@Entity
@Table(name = "consommation_apa")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ConsommationApa implements Serializable {

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
        value = { "tiersFinanceurs", "natureActivites", "natureMontants", "consommationApas", "aide" },
        allowSetters = true
    )
    private StrategieApa strategieApa;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ConsommationApa id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return this.date;
    }

    public ConsommationApa date(Instant date) {
        this.setDate(date);
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public BigDecimal getMontantCotisations() {
        return this.montantCotisations;
    }

    public ConsommationApa montantCotisations(BigDecimal montantCotisations) {
        this.setMontantCotisations(montantCotisations);
        return this;
    }

    public void setMontantCotisations(BigDecimal montantCotisations) {
        this.montantCotisations = montantCotisations;
    }

    public BigDecimal getNbHeures() {
        return this.nbHeures;
    }

    public ConsommationApa nbHeures(BigDecimal nbHeures) {
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

    public ConsommationApa beneficiaire(Beneficiaire beneficiaire) {
        this.setBeneficiaire(beneficiaire);
        return this;
    }

    public StrategieApa getStrategieApa() {
        return this.strategieApa;
    }

    public void setStrategieApa(StrategieApa strategieApa) {
        this.strategieApa = strategieApa;
    }

    public ConsommationApa strategieApa(StrategieApa strategieApa) {
        this.setStrategieApa(strategieApa);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ConsommationApa)) {
            return false;
        }
        return id != null && id.equals(((ConsommationApa) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ConsommationApa{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", montantCotisations=" + getMontantCotisations() +
            ", nbHeures=" + getNbHeures() +
            "}";
    }
}
