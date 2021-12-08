package fr.tixou.archisolver.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A SoldeApa.
 */
@Entity
@Table(name = "solde_apa")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SoldeApa implements Serializable {

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

    @Column(name = "solde_montant_apa", precision = 21, scale = 2)
    private BigDecimal soldeMontantApa;

    @Column(name = "solde_heure_apa", precision = 21, scale = 2)
    private BigDecimal soldeHeureApa;

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

    public SoldeApa id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAnnee() {
        return this.annee;
    }

    public SoldeApa annee(Integer annee) {
        this.setAnnee(annee);
        return this;
    }

    public void setAnnee(Integer annee) {
        this.annee = annee;
    }

    public Integer getMois() {
        return this.mois;
    }

    public SoldeApa mois(Integer mois) {
        this.setMois(mois);
        return this;
    }

    public void setMois(Integer mois) {
        this.mois = mois;
    }

    public BigDecimal getSoldeMontantApa() {
        return this.soldeMontantApa;
    }

    public SoldeApa soldeMontantApa(BigDecimal soldeMontantApa) {
        this.setSoldeMontantApa(soldeMontantApa);
        return this;
    }

    public void setSoldeMontantApa(BigDecimal soldeMontantApa) {
        this.soldeMontantApa = soldeMontantApa;
    }

    public BigDecimal getSoldeHeureApa() {
        return this.soldeHeureApa;
    }

    public SoldeApa soldeHeureApa(BigDecimal soldeHeureApa) {
        this.setSoldeHeureApa(soldeHeureApa);
        return this;
    }

    public void setSoldeHeureApa(BigDecimal soldeHeureApa) {
        this.soldeHeureApa = soldeHeureApa;
    }

    public Beneficiaire getBeneficiaire() {
        return this.beneficiaire;
    }

    public void setBeneficiaire(Beneficiaire beneficiaire) {
        this.beneficiaire = beneficiaire;
    }

    public SoldeApa beneficiaire(Beneficiaire beneficiaire) {
        this.setBeneficiaire(beneficiaire);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SoldeApa)) {
            return false;
        }
        return id != null && id.equals(((SoldeApa) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SoldeApa{" +
            "id=" + getId() +
            ", annee=" + getAnnee() +
            ", mois=" + getMois() +
            ", soldeMontantApa=" + getSoldeMontantApa() +
            ", soldeHeureApa=" + getSoldeHeureApa() +
            "}";
    }
}
