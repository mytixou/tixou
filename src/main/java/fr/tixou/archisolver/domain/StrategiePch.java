package fr.tixou.archisolver.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A StrategiePch.
 */
@Entity
@Table(name = "strategie_pch")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class StrategiePch implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "is_actif")
    private Boolean isActif;

    @Column(name = "anne")
    private Integer anne;

    @Column(name = "montant_plafond", precision = 21, scale = 2)
    private BigDecimal montantPlafond;

    @Column(name = "nb_plafondheure", precision = 21, scale = 2)
    private BigDecimal nbPlafondheure;

    @Column(name = "taux", precision = 21, scale = 2)
    private BigDecimal taux;

    @OneToMany(mappedBy = "strategie")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "strategie", "strategie", "strategie", "strategie" }, allowSetters = true)
    private Set<TiersFinanceur> tiersFinanceurs = new HashSet<>();

    @OneToMany(mappedBy = "strategie")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "strategie", "strategie", "strategie", "strategie" }, allowSetters = true)
    private Set<NatureActivite> natureActivites = new HashSet<>();

    @OneToMany(mappedBy = "strategie")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "strategie", "strategie", "strategie", "strategie" }, allowSetters = true)
    private Set<NatureMontant> natureMontants = new HashSet<>();

    @OneToMany(mappedBy = "strategiePch")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "beneficiaire", "strategiePch" }, allowSetters = true)
    private Set<ConsommationPch> consommationPches = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "strategieCis", "strategieApas", "strategiePches", "strategiePchES" }, allowSetters = true)
    private Aide aide;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public StrategiePch id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getIsActif() {
        return this.isActif;
    }

    public StrategiePch isActif(Boolean isActif) {
        this.setIsActif(isActif);
        return this;
    }

    public void setIsActif(Boolean isActif) {
        this.isActif = isActif;
    }

    public Integer getAnne() {
        return this.anne;
    }

    public StrategiePch anne(Integer anne) {
        this.setAnne(anne);
        return this;
    }

    public void setAnne(Integer anne) {
        this.anne = anne;
    }

    public BigDecimal getMontantPlafond() {
        return this.montantPlafond;
    }

    public StrategiePch montantPlafond(BigDecimal montantPlafond) {
        this.setMontantPlafond(montantPlafond);
        return this;
    }

    public void setMontantPlafond(BigDecimal montantPlafond) {
        this.montantPlafond = montantPlafond;
    }

    public BigDecimal getNbPlafondheure() {
        return this.nbPlafondheure;
    }

    public StrategiePch nbPlafondheure(BigDecimal nbPlafondheure) {
        this.setNbPlafondheure(nbPlafondheure);
        return this;
    }

    public void setNbPlafondheure(BigDecimal nbPlafondheure) {
        this.nbPlafondheure = nbPlafondheure;
    }

    public BigDecimal getTaux() {
        return this.taux;
    }

    public StrategiePch taux(BigDecimal taux) {
        this.setTaux(taux);
        return this;
    }

    public void setTaux(BigDecimal taux) {
        this.taux = taux;
    }

    public Set<TiersFinanceur> getTiersFinanceurs() {
        return this.tiersFinanceurs;
    }

    public void setTiersFinanceurs(Set<TiersFinanceur> tiersFinanceurs) {
        if (this.tiersFinanceurs != null) {
            this.tiersFinanceurs.forEach(i -> i.setStrategie(null));
        }
        if (tiersFinanceurs != null) {
            tiersFinanceurs.forEach(i -> i.setStrategie(this));
        }
        this.tiersFinanceurs = tiersFinanceurs;
    }

    public StrategiePch tiersFinanceurs(Set<TiersFinanceur> tiersFinanceurs) {
        this.setTiersFinanceurs(tiersFinanceurs);
        return this;
    }

    public StrategiePch addTiersFinanceur(TiersFinanceur tiersFinanceur) {
        this.tiersFinanceurs.add(tiersFinanceur);
        tiersFinanceur.setStrategie(this);
        return this;
    }

    public StrategiePch removeTiersFinanceur(TiersFinanceur tiersFinanceur) {
        this.tiersFinanceurs.remove(tiersFinanceur);
        tiersFinanceur.setStrategie(null);
        return this;
    }

    public Set<NatureActivite> getNatureActivites() {
        return this.natureActivites;
    }

    public void setNatureActivites(Set<NatureActivite> natureActivites) {
        if (this.natureActivites != null) {
            this.natureActivites.forEach(i -> i.setStrategie(null));
        }
        if (natureActivites != null) {
            natureActivites.forEach(i -> i.setStrategie(this));
        }
        this.natureActivites = natureActivites;
    }

    public StrategiePch natureActivites(Set<NatureActivite> natureActivites) {
        this.setNatureActivites(natureActivites);
        return this;
    }

    public StrategiePch addNatureActivite(NatureActivite natureActivite) {
        this.natureActivites.add(natureActivite);
        natureActivite.setStrategie(this);
        return this;
    }

    public StrategiePch removeNatureActivite(NatureActivite natureActivite) {
        this.natureActivites.remove(natureActivite);
        natureActivite.setStrategie(null);
        return this;
    }

    public Set<NatureMontant> getNatureMontants() {
        return this.natureMontants;
    }

    public void setNatureMontants(Set<NatureMontant> natureMontants) {
        if (this.natureMontants != null) {
            this.natureMontants.forEach(i -> i.setStrategie(null));
        }
        if (natureMontants != null) {
            natureMontants.forEach(i -> i.setStrategie(this));
        }
        this.natureMontants = natureMontants;
    }

    public StrategiePch natureMontants(Set<NatureMontant> natureMontants) {
        this.setNatureMontants(natureMontants);
        return this;
    }

    public StrategiePch addNatureMontant(NatureMontant natureMontant) {
        this.natureMontants.add(natureMontant);
        natureMontant.setStrategie(this);
        return this;
    }

    public StrategiePch removeNatureMontant(NatureMontant natureMontant) {
        this.natureMontants.remove(natureMontant);
        natureMontant.setStrategie(null);
        return this;
    }

    public Set<ConsommationPch> getConsommationPches() {
        return this.consommationPches;
    }

    public void setConsommationPches(Set<ConsommationPch> consommationPches) {
        if (this.consommationPches != null) {
            this.consommationPches.forEach(i -> i.setStrategiePch(null));
        }
        if (consommationPches != null) {
            consommationPches.forEach(i -> i.setStrategiePch(this));
        }
        this.consommationPches = consommationPches;
    }

    public StrategiePch consommationPches(Set<ConsommationPch> consommationPches) {
        this.setConsommationPches(consommationPches);
        return this;
    }

    public StrategiePch addConsommationPch(ConsommationPch consommationPch) {
        this.consommationPches.add(consommationPch);
        consommationPch.setStrategiePch(this);
        return this;
    }

    public StrategiePch removeConsommationPch(ConsommationPch consommationPch) {
        this.consommationPches.remove(consommationPch);
        consommationPch.setStrategiePch(null);
        return this;
    }

    public Aide getAide() {
        return this.aide;
    }

    public void setAide(Aide aide) {
        this.aide = aide;
    }

    public StrategiePch aide(Aide aide) {
        this.setAide(aide);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StrategiePch)) {
            return false;
        }
        return id != null && id.equals(((StrategiePch) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StrategiePch{" +
            "id=" + getId() +
            ", isActif='" + getIsActif() + "'" +
            ", anne=" + getAnne() +
            ", montantPlafond=" + getMontantPlafond() +
            ", nbPlafondheure=" + getNbPlafondheure() +
            ", taux=" + getTaux() +
            "}";
    }
}
