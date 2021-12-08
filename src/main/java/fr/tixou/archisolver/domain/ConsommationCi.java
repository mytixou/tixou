package fr.tixou.archisolver.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ConsommationCi.
 */
@Entity
@Table(name = "consommation_ci")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ConsommationCi implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "date")
    private Instant date;

    @Column(name = "montant_ci", precision = 21, scale = 2)
    private BigDecimal montantCi;

    @Column(name = "montant_recuperable", precision = 21, scale = 2)
    private BigDecimal montantRecuperable;

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
        value = { "tiersFinanceurs", "natureActivites", "natureMontants", "consommationCis", "aide" },
        allowSetters = true
    )
    private StrategieCi strategieCi;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ConsommationCi id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return this.date;
    }

    public ConsommationCi date(Instant date) {
        this.setDate(date);
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public BigDecimal getMontantCi() {
        return this.montantCi;
    }

    public ConsommationCi montantCi(BigDecimal montantCi) {
        this.setMontantCi(montantCi);
        return this;
    }

    public void setMontantCi(BigDecimal montantCi) {
        this.montantCi = montantCi;
    }

    public BigDecimal getMontantRecuperable() {
        return this.montantRecuperable;
    }

    public ConsommationCi montantRecuperable(BigDecimal montantRecuperable) {
        this.setMontantRecuperable(montantRecuperable);
        return this;
    }

    public void setMontantRecuperable(BigDecimal montantRecuperable) {
        this.montantRecuperable = montantRecuperable;
    }

    public Beneficiaire getBeneficiaire() {
        return this.beneficiaire;
    }

    public void setBeneficiaire(Beneficiaire beneficiaire) {
        this.beneficiaire = beneficiaire;
    }

    public ConsommationCi beneficiaire(Beneficiaire beneficiaire) {
        this.setBeneficiaire(beneficiaire);
        return this;
    }

    public StrategieCi getStrategieCi() {
        return this.strategieCi;
    }

    public void setStrategieCi(StrategieCi strategieCi) {
        this.strategieCi = strategieCi;
    }

    public ConsommationCi strategieCi(StrategieCi strategieCi) {
        this.setStrategieCi(strategieCi);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ConsommationCi)) {
            return false;
        }
        return id != null && id.equals(((ConsommationCi) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ConsommationCi{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", montantCi=" + getMontantCi() +
            ", montantRecuperable=" + getMontantRecuperable() +
            "}";
    }
}
