package fr.tixou.archisolver.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A SoldePch.
 */
@Entity
@Table(name = "solde_pch")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SoldePch implements Serializable {

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

    @Column(name = "solde_montant_pch", precision = 21, scale = 2)
    private BigDecimal soldeMontantPch;

    @Column(name = "solde_heure_pch", precision = 21, scale = 2)
    private BigDecimal soldeHeurePch;

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

    public SoldePch id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAnnee() {
        return this.annee;
    }

    public SoldePch annee(Integer annee) {
        this.setAnnee(annee);
        return this;
    }

    public void setAnnee(Integer annee) {
        this.annee = annee;
    }

    public Integer getMois() {
        return this.mois;
    }

    public SoldePch mois(Integer mois) {
        this.setMois(mois);
        return this;
    }

    public void setMois(Integer mois) {
        this.mois = mois;
    }

    public BigDecimal getSoldeMontantPch() {
        return this.soldeMontantPch;
    }

    public SoldePch soldeMontantPch(BigDecimal soldeMontantPch) {
        this.setSoldeMontantPch(soldeMontantPch);
        return this;
    }

    public void setSoldeMontantPch(BigDecimal soldeMontantPch) {
        this.soldeMontantPch = soldeMontantPch;
    }

    public BigDecimal getSoldeHeurePch() {
        return this.soldeHeurePch;
    }

    public SoldePch soldeHeurePch(BigDecimal soldeHeurePch) {
        this.setSoldeHeurePch(soldeHeurePch);
        return this;
    }

    public void setSoldeHeurePch(BigDecimal soldeHeurePch) {
        this.soldeHeurePch = soldeHeurePch;
    }

    public Beneficiaire getBeneficiaire() {
        return this.beneficiaire;
    }

    public void setBeneficiaire(Beneficiaire beneficiaire) {
        this.beneficiaire = beneficiaire;
    }

    public SoldePch beneficiaire(Beneficiaire beneficiaire) {
        this.setBeneficiaire(beneficiaire);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SoldePch)) {
            return false;
        }
        return id != null && id.equals(((SoldePch) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SoldePch{" +
            "id=" + getId() +
            ", annee=" + getAnnee() +
            ", mois=" + getMois() +
            ", soldeMontantPch=" + getSoldeMontantPch() +
            ", soldeHeurePch=" + getSoldeHeurePch() +
            "}";
    }
}
