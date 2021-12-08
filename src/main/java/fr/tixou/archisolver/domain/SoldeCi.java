package fr.tixou.archisolver.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A SoldeCi.
 */
@Entity
@Table(name = "solde_ci")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SoldeCi implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "annee")
    private Integer annee;

    @Column(name = "solde_montant_ci", precision = 21, scale = 2)
    private BigDecimal soldeMontantCi;

    @Column(name = "solde_montant_ci_rec", precision = 21, scale = 2)
    private BigDecimal soldeMontantCiRec;

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

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public SoldeCi id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAnnee() {
        return this.annee;
    }

    public SoldeCi annee(Integer annee) {
        this.setAnnee(annee);
        return this;
    }

    public void setAnnee(Integer annee) {
        this.annee = annee;
    }

    public BigDecimal getSoldeMontantCi() {
        return this.soldeMontantCi;
    }

    public SoldeCi soldeMontantCi(BigDecimal soldeMontantCi) {
        this.setSoldeMontantCi(soldeMontantCi);
        return this;
    }

    public void setSoldeMontantCi(BigDecimal soldeMontantCi) {
        this.soldeMontantCi = soldeMontantCi;
    }

    public BigDecimal getSoldeMontantCiRec() {
        return this.soldeMontantCiRec;
    }

    public SoldeCi soldeMontantCiRec(BigDecimal soldeMontantCiRec) {
        this.setSoldeMontantCiRec(soldeMontantCiRec);
        return this;
    }

    public void setSoldeMontantCiRec(BigDecimal soldeMontantCiRec) {
        this.soldeMontantCiRec = soldeMontantCiRec;
    }

    public Beneficiaire getBeneficiaire() {
        return this.beneficiaire;
    }

    public void setBeneficiaire(Beneficiaire beneficiaire) {
        this.beneficiaire = beneficiaire;
    }

    public SoldeCi beneficiaire(Beneficiaire beneficiaire) {
        this.setBeneficiaire(beneficiaire);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SoldeCi)) {
            return false;
        }
        return id != null && id.equals(((SoldeCi) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SoldeCi{" +
            "id=" + getId() +
            ", annee=" + getAnnee() +
            ", soldeMontantCi=" + getSoldeMontantCi() +
            ", soldeMontantCiRec=" + getSoldeMontantCiRec() +
            "}";
    }
}
