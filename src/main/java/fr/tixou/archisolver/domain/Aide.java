package fr.tixou.archisolver.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import fr.tixou.archisolver.domain.enumeration.TypeAide;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Aide.
 */
@Entity
@Table(name = "aide")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Aide implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "nom")
    private TypeAide nom;

    @Column(name = "is_actif")
    private Boolean isActif;

    @Column(name = "date_lancement")
    private LocalDate dateLancement;

    @Column(name = "anne_lancement")
    private Integer anneLancement;

    @Column(name = "mois_lancement")
    private Integer moisLancement;

    @Column(name = "date_arret")
    private LocalDate dateArret;

    @Column(name = "derniere_annee")
    private Integer derniereAnnee;

    @Column(name = "dernier_mois")
    private Integer dernierMois;

    @OneToMany(mappedBy = "aide")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(
        value = { "tiersFinanceurs", "natureActivites", "natureMontants", "consommationCis", "aide" },
        allowSetters = true
    )
    private Set<StrategieCi> strategieCis = new HashSet<>();

    @OneToMany(mappedBy = "aide")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(
        value = { "tiersFinanceurs", "natureActivites", "natureMontants", "consommationApas", "aide" },
        allowSetters = true
    )
    private Set<StrategieApa> strategieApas = new HashSet<>();

    @OneToMany(mappedBy = "aide")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(
        value = { "tiersFinanceurs", "natureActivites", "natureMontants", "consommationPches", "aide" },
        allowSetters = true
    )
    private Set<StrategiePch> strategiePches = new HashSet<>();

    @OneToMany(mappedBy = "aide")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(
        value = { "tiersFinanceurs", "natureActivites", "natureMontants", "consommationPchES", "aide" },
        allowSetters = true
    )
    private Set<StrategiePchE> strategiePchES = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Aide id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TypeAide getNom() {
        return this.nom;
    }

    public Aide nom(TypeAide nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(TypeAide nom) {
        this.nom = nom;
    }

    public Boolean getIsActif() {
        return this.isActif;
    }

    public Aide isActif(Boolean isActif) {
        this.setIsActif(isActif);
        return this;
    }

    public void setIsActif(Boolean isActif) {
        this.isActif = isActif;
    }

    public LocalDate getDateLancement() {
        return this.dateLancement;
    }

    public Aide dateLancement(LocalDate dateLancement) {
        this.setDateLancement(dateLancement);
        return this;
    }

    public void setDateLancement(LocalDate dateLancement) {
        this.dateLancement = dateLancement;
    }

    public Integer getAnneLancement() {
        return this.anneLancement;
    }

    public Aide anneLancement(Integer anneLancement) {
        this.setAnneLancement(anneLancement);
        return this;
    }

    public void setAnneLancement(Integer anneLancement) {
        this.anneLancement = anneLancement;
    }

    public Integer getMoisLancement() {
        return this.moisLancement;
    }

    public Aide moisLancement(Integer moisLancement) {
        this.setMoisLancement(moisLancement);
        return this;
    }

    public void setMoisLancement(Integer moisLancement) {
        this.moisLancement = moisLancement;
    }

    public LocalDate getDateArret() {
        return this.dateArret;
    }

    public Aide dateArret(LocalDate dateArret) {
        this.setDateArret(dateArret);
        return this;
    }

    public void setDateArret(LocalDate dateArret) {
        this.dateArret = dateArret;
    }

    public Integer getDerniereAnnee() {
        return this.derniereAnnee;
    }

    public Aide derniereAnnee(Integer derniereAnnee) {
        this.setDerniereAnnee(derniereAnnee);
        return this;
    }

    public void setDerniereAnnee(Integer derniereAnnee) {
        this.derniereAnnee = derniereAnnee;
    }

    public Integer getDernierMois() {
        return this.dernierMois;
    }

    public Aide dernierMois(Integer dernierMois) {
        this.setDernierMois(dernierMois);
        return this;
    }

    public void setDernierMois(Integer dernierMois) {
        this.dernierMois = dernierMois;
    }

    public Set<StrategieCi> getStrategieCis() {
        return this.strategieCis;
    }

    public void setStrategieCis(Set<StrategieCi> strategieCis) {
        if (this.strategieCis != null) {
            this.strategieCis.forEach(i -> i.setAide(null));
        }
        if (strategieCis != null) {
            strategieCis.forEach(i -> i.setAide(this));
        }
        this.strategieCis = strategieCis;
    }

    public Aide strategieCis(Set<StrategieCi> strategieCis) {
        this.setStrategieCis(strategieCis);
        return this;
    }

    public Aide addStrategieCi(StrategieCi strategieCi) {
        this.strategieCis.add(strategieCi);
        strategieCi.setAide(this);
        return this;
    }

    public Aide removeStrategieCi(StrategieCi strategieCi) {
        this.strategieCis.remove(strategieCi);
        strategieCi.setAide(null);
        return this;
    }

    public Set<StrategieApa> getStrategieApas() {
        return this.strategieApas;
    }

    public void setStrategieApas(Set<StrategieApa> strategieApas) {
        if (this.strategieApas != null) {
            this.strategieApas.forEach(i -> i.setAide(null));
        }
        if (strategieApas != null) {
            strategieApas.forEach(i -> i.setAide(this));
        }
        this.strategieApas = strategieApas;
    }

    public Aide strategieApas(Set<StrategieApa> strategieApas) {
        this.setStrategieApas(strategieApas);
        return this;
    }

    public Aide addStrategieApa(StrategieApa strategieApa) {
        this.strategieApas.add(strategieApa);
        strategieApa.setAide(this);
        return this;
    }

    public Aide removeStrategieApa(StrategieApa strategieApa) {
        this.strategieApas.remove(strategieApa);
        strategieApa.setAide(null);
        return this;
    }

    public Set<StrategiePch> getStrategiePches() {
        return this.strategiePches;
    }

    public void setStrategiePches(Set<StrategiePch> strategiePches) {
        if (this.strategiePches != null) {
            this.strategiePches.forEach(i -> i.setAide(null));
        }
        if (strategiePches != null) {
            strategiePches.forEach(i -> i.setAide(this));
        }
        this.strategiePches = strategiePches;
    }

    public Aide strategiePches(Set<StrategiePch> strategiePches) {
        this.setStrategiePches(strategiePches);
        return this;
    }

    public Aide addStrategiePch(StrategiePch strategiePch) {
        this.strategiePches.add(strategiePch);
        strategiePch.setAide(this);
        return this;
    }

    public Aide removeStrategiePch(StrategiePch strategiePch) {
        this.strategiePches.remove(strategiePch);
        strategiePch.setAide(null);
        return this;
    }

    public Set<StrategiePchE> getStrategiePchES() {
        return this.strategiePchES;
    }

    public void setStrategiePchES(Set<StrategiePchE> strategiePchES) {
        if (this.strategiePchES != null) {
            this.strategiePchES.forEach(i -> i.setAide(null));
        }
        if (strategiePchES != null) {
            strategiePchES.forEach(i -> i.setAide(this));
        }
        this.strategiePchES = strategiePchES;
    }

    public Aide strategiePchES(Set<StrategiePchE> strategiePchES) {
        this.setStrategiePchES(strategiePchES);
        return this;
    }

    public Aide addStrategiePchE(StrategiePchE strategiePchE) {
        this.strategiePchES.add(strategiePchE);
        strategiePchE.setAide(this);
        return this;
    }

    public Aide removeStrategiePchE(StrategiePchE strategiePchE) {
        this.strategiePchES.remove(strategiePchE);
        strategiePchE.setAide(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Aide)) {
            return false;
        }
        return id != null && id.equals(((Aide) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Aide{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", isActif='" + getIsActif() + "'" +
            ", dateLancement='" + getDateLancement() + "'" +
            ", anneLancement=" + getAnneLancement() +
            ", moisLancement=" + getMoisLancement() +
            ", dateArret='" + getDateArret() + "'" +
            ", derniereAnnee=" + getDerniereAnnee() +
            ", dernierMois=" + getDernierMois() +
            "}";
    }
}
