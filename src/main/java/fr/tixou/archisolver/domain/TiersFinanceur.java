package fr.tixou.archisolver.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TiersFinanceur.
 */
@Entity
@Table(name = "tiers_financeur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TiersFinanceur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "localisation")
    private String localisation;

    @Column(name = "is_actif")
    private Boolean isActif;

    @Column(name = "date_inscription")
    private LocalDate dateInscription;

    @Column(name = "anne_lancement")
    private Integer anneLancement;

    @Column(name = "mois_lancement")
    private Integer moisLancement;

    @Column(name = "date_resiliation")
    private LocalDate dateResiliation;

    @Column(name = "derniere_annee")
    private Integer derniereAnnee;

    @Column(name = "dernier_mois")
    private Integer dernierMois;

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

    public TiersFinanceur id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return this.nom;
    }

    public TiersFinanceur nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getLocalisation() {
        return this.localisation;
    }

    public TiersFinanceur localisation(String localisation) {
        this.setLocalisation(localisation);
        return this;
    }

    public void setLocalisation(String localisation) {
        this.localisation = localisation;
    }

    public Boolean getIsActif() {
        return this.isActif;
    }

    public TiersFinanceur isActif(Boolean isActif) {
        this.setIsActif(isActif);
        return this;
    }

    public void setIsActif(Boolean isActif) {
        this.isActif = isActif;
    }

    public LocalDate getDateInscription() {
        return this.dateInscription;
    }

    public TiersFinanceur dateInscription(LocalDate dateInscription) {
        this.setDateInscription(dateInscription);
        return this;
    }

    public void setDateInscription(LocalDate dateInscription) {
        this.dateInscription = dateInscription;
    }

    public Integer getAnneLancement() {
        return this.anneLancement;
    }

    public TiersFinanceur anneLancement(Integer anneLancement) {
        this.setAnneLancement(anneLancement);
        return this;
    }

    public void setAnneLancement(Integer anneLancement) {
        this.anneLancement = anneLancement;
    }

    public Integer getMoisLancement() {
        return this.moisLancement;
    }

    public TiersFinanceur moisLancement(Integer moisLancement) {
        this.setMoisLancement(moisLancement);
        return this;
    }

    public void setMoisLancement(Integer moisLancement) {
        this.moisLancement = moisLancement;
    }

    public LocalDate getDateResiliation() {
        return this.dateResiliation;
    }

    public TiersFinanceur dateResiliation(LocalDate dateResiliation) {
        this.setDateResiliation(dateResiliation);
        return this;
    }

    public void setDateResiliation(LocalDate dateResiliation) {
        this.dateResiliation = dateResiliation;
    }

    public Integer getDerniereAnnee() {
        return this.derniereAnnee;
    }

    public TiersFinanceur derniereAnnee(Integer derniereAnnee) {
        this.setDerniereAnnee(derniereAnnee);
        return this;
    }

    public void setDerniereAnnee(Integer derniereAnnee) {
        this.derniereAnnee = derniereAnnee;
    }

    public Integer getDernierMois() {
        return this.dernierMois;
    }

    public TiersFinanceur dernierMois(Integer dernierMois) {
        this.setDernierMois(dernierMois);
        return this;
    }

    public void setDernierMois(Integer dernierMois) {
        this.dernierMois = dernierMois;
    }

    public StrategieCi getStrategie() {
        return this.strategie;
    }

    public void setStrategie(StrategieCi strategieCi) {
        this.strategie = strategieCi;
    }

    public TiersFinanceur strategie(StrategieCi strategieCi) {
        this.setStrategie(strategieCi);
        return this;
    }

    public StrategieApa getStrategie() {
        return this.strategie;
    }

    public void setStrategie(StrategieApa strategieApa) {
        this.strategie = strategieApa;
    }

    public TiersFinanceur strategie(StrategieApa strategieApa) {
        this.setStrategie(strategieApa);
        return this;
    }

    public StrategiePch getStrategie() {
        return this.strategie;
    }

    public void setStrategie(StrategiePch strategiePch) {
        this.strategie = strategiePch;
    }

    public TiersFinanceur strategie(StrategiePch strategiePch) {
        this.setStrategie(strategiePch);
        return this;
    }

    public StrategiePchE getStrategie() {
        return this.strategie;
    }

    public void setStrategie(StrategiePchE strategiePchE) {
        this.strategie = strategiePchE;
    }

    public TiersFinanceur strategie(StrategiePchE strategiePchE) {
        this.setStrategie(strategiePchE);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TiersFinanceur)) {
            return false;
        }
        return id != null && id.equals(((TiersFinanceur) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TiersFinanceur{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", localisation='" + getLocalisation() + "'" +
            ", isActif='" + getIsActif() + "'" +
            ", dateInscription='" + getDateInscription() + "'" +
            ", anneLancement=" + getAnneLancement() +
            ", moisLancement=" + getMoisLancement() +
            ", dateResiliation='" + getDateResiliation() + "'" +
            ", derniereAnnee=" + getDerniereAnnee() +
            ", dernierMois=" + getDernierMois() +
            "}";
    }
}
