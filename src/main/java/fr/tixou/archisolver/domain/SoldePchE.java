package fr.tixou.archisolver.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A SoldePchE.
 */
@Entity
@Table(name = "solde_pch_e")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SoldePchE implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "annee")
    private Integer annee;

    @Column(name = "mois")
    private Integer mois;

    @Column(name = "solde_montant_pch_e", precision = 21, scale = 2)
    private BigDecimal soldeMontantPchE;

    @Column(name = "solde_heure_pch_e", precision = 21, scale = 2)
    private BigDecimal soldeHeurePchE;

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

    public SoldePchE id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAnnee() {
        return this.annee;
    }

    public SoldePchE annee(Integer annee) {
        this.setAnnee(annee);
        return this;
    }

    public void setAnnee(Integer annee) {
        this.annee = annee;
    }

    public Integer getMois() {
        return this.mois;
    }

    public SoldePchE mois(Integer mois) {
        this.setMois(mois);
        return this;
    }

    public void setMois(Integer mois) {
        this.mois = mois;
    }

    public BigDecimal getSoldeMontantPchE() {
        return this.soldeMontantPchE;
    }

    public SoldePchE soldeMontantPchE(BigDecimal soldeMontantPchE) {
        this.setSoldeMontantPchE(soldeMontantPchE);
        return this;
    }

    public void setSoldeMontantPchE(BigDecimal soldeMontantPchE) {
        this.soldeMontantPchE = soldeMontantPchE;
    }

    public BigDecimal getSoldeHeurePchE() {
        return this.soldeHeurePchE;
    }

    public SoldePchE soldeHeurePchE(BigDecimal soldeHeurePchE) {
        this.setSoldeHeurePchE(soldeHeurePchE);
        return this;
    }

    public void setSoldeHeurePchE(BigDecimal soldeHeurePchE) {
        this.soldeHeurePchE = soldeHeurePchE;
    }

    public Beneficiaire getBeneficiaire() {
        return this.beneficiaire;
    }

    public void setBeneficiaire(Beneficiaire beneficiaire) {
        this.beneficiaire = beneficiaire;
    }

    public SoldePchE beneficiaire(Beneficiaire beneficiaire) {
        this.setBeneficiaire(beneficiaire);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SoldePchE)) {
            return false;
        }
        return id != null && id.equals(((SoldePchE) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SoldePchE{" +
            "id=" + getId() +
            ", annee=" + getAnnee() +
            ", mois=" + getMois() +
            ", soldeMontantPchE=" + getSoldeMontantPchE() +
            ", soldeHeurePchE=" + getSoldeHeurePchE() +
            "}";
    }
}
