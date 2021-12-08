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
 * A StrategieCi.
 */
@Entity
@Table(name = "strategie_ci")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class StrategieCi implements Serializable {

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

    @OneToMany(mappedBy = "strategieCi")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "beneficiaire", "strategieCi" }, allowSetters = true)
    private Set<ConsommationCi> consommationCis = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "strategieCis", "strategieApas", "strategiePches", "strategiePchES" }, allowSetters = true)
    private Aide aide;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public StrategieCi id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getIsActif() {
        return this.isActif;
    }

    public StrategieCi isActif(Boolean isActif) {
        this.setIsActif(isActif);
        return this;
    }

    public void setIsActif(Boolean isActif) {
        this.isActif = isActif;
    }

    public Integer getAnne() {
        return this.anne;
    }

    public StrategieCi anne(Integer anne) {
        this.setAnne(anne);
        return this;
    }

    public void setAnne(Integer anne) {
        this.anne = anne;
    }

    public BigDecimal getMontantPlafond() {
        return this.montantPlafond;
    }

    public StrategieCi montantPlafond(BigDecimal montantPlafond) {
        this.setMontantPlafond(montantPlafond);
        return this;
    }

    public void setMontantPlafond(BigDecimal montantPlafond) {
        this.montantPlafond = montantPlafond;
    }

    public BigDecimal getTaux() {
        return this.taux;
    }

    public StrategieCi taux(BigDecimal taux) {
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

    public StrategieCi tiersFinanceurs(Set<TiersFinanceur> tiersFinanceurs) {
        this.setTiersFinanceurs(tiersFinanceurs);
        return this;
    }

    public StrategieCi addTiersFinanceur(TiersFinanceur tiersFinanceur) {
        this.tiersFinanceurs.add(tiersFinanceur);
        tiersFinanceur.setStrategie(this);
        return this;
    }

    public StrategieCi removeTiersFinanceur(TiersFinanceur tiersFinanceur) {
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

    public StrategieCi natureActivites(Set<NatureActivite> natureActivites) {
        this.setNatureActivites(natureActivites);
        return this;
    }

    public StrategieCi addNatureActivite(NatureActivite natureActivite) {
        this.natureActivites.add(natureActivite);
        natureActivite.setStrategie(this);
        return this;
    }

    public StrategieCi removeNatureActivite(NatureActivite natureActivite) {
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

    public StrategieCi natureMontants(Set<NatureMontant> natureMontants) {
        this.setNatureMontants(natureMontants);
        return this;
    }

    public StrategieCi addNatureMontant(NatureMontant natureMontant) {
        this.natureMontants.add(natureMontant);
        natureMontant.setStrategie(this);
        return this;
    }

    public StrategieCi removeNatureMontant(NatureMontant natureMontant) {
        this.natureMontants.remove(natureMontant);
        natureMontant.setStrategie(null);
        return this;
    }

    public Set<ConsommationCi> getConsommationCis() {
        return this.consommationCis;
    }

    public void setConsommationCis(Set<ConsommationCi> consommationCis) {
        if (this.consommationCis != null) {
            this.consommationCis.forEach(i -> i.setStrategieCi(null));
        }
        if (consommationCis != null) {
            consommationCis.forEach(i -> i.setStrategieCi(this));
        }
        this.consommationCis = consommationCis;
    }

    public StrategieCi consommationCis(Set<ConsommationCi> consommationCis) {
        this.setConsommationCis(consommationCis);
        return this;
    }

    public StrategieCi addConsommationCi(ConsommationCi consommationCi) {
        this.consommationCis.add(consommationCi);
        consommationCi.setStrategieCi(this);
        return this;
    }

    public StrategieCi removeConsommationCi(ConsommationCi consommationCi) {
        this.consommationCis.remove(consommationCi);
        consommationCi.setStrategieCi(null);
        return this;
    }

    public Aide getAide() {
        return this.aide;
    }

    public void setAide(Aide aide) {
        this.aide = aide;
    }

    public StrategieCi aide(Aide aide) {
        this.setAide(aide);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StrategieCi)) {
            return false;
        }
        return id != null && id.equals(((StrategieCi) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StrategieCi{" +
            "id=" + getId() +
            ", isActif='" + getIsActif() + "'" +
            ", anne=" + getAnne() +
            ", montantPlafond=" + getMontantPlafond() +
            ", taux=" + getTaux() +
            "}";
    }
}
