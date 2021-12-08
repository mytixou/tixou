package fr.tixou.archisolver.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Beneficiaire.
 */
@Entity
@Table(name = "beneficiaire")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Beneficiaire implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "externe_id")
    private String externeId;

    @Column(name = "is_actif")
    private Boolean isActif;

    @Column(name = "date_inscription")
    private LocalDate dateInscription;

    @Column(name = "date_resiliation")
    private LocalDate dateResiliation;

    @OneToMany(mappedBy = "beneficiaire")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "beneficiaire" }, allowSetters = true)
    private Set<SoldeCi> soldeCis = new HashSet<>();

    @OneToMany(mappedBy = "beneficiaire")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "beneficiaire" }, allowSetters = true)
    private Set<SoldeApa> soldeApas = new HashSet<>();

    @OneToMany(mappedBy = "beneficiaire")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "beneficiaire" }, allowSetters = true)
    private Set<SoldePch> soldePches = new HashSet<>();

    @OneToMany(mappedBy = "beneficiaire")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "beneficiaire" }, allowSetters = true)
    private Set<SoldePchE> soldePchES = new HashSet<>();

    @OneToMany(mappedBy = "beneficiaire")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "beneficiaire", "strategieCi" }, allowSetters = true)
    private Set<ConsommationCi> consommationCis = new HashSet<>();

    @OneToMany(mappedBy = "beneficiaire")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "beneficiaire", "strategieApa" }, allowSetters = true)
    private Set<ConsommationApa> consommationApas = new HashSet<>();

    @OneToMany(mappedBy = "beneficiaire")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "beneficiaire", "strategiePch" }, allowSetters = true)
    private Set<ConsommationPch> consommationPches = new HashSet<>();

    @OneToMany(mappedBy = "beneficiaire")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "beneficiaire", "strategiePchE" }, allowSetters = true)
    private Set<ConsommationPchE> consommationPchES = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Beneficiaire id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getExterneId() {
        return this.externeId;
    }

    public Beneficiaire externeId(String externeId) {
        this.setExterneId(externeId);
        return this;
    }

    public void setExterneId(String externeId) {
        this.externeId = externeId;
    }

    public Boolean getIsActif() {
        return this.isActif;
    }

    public Beneficiaire isActif(Boolean isActif) {
        this.setIsActif(isActif);
        return this;
    }

    public void setIsActif(Boolean isActif) {
        this.isActif = isActif;
    }

    public LocalDate getDateInscription() {
        return this.dateInscription;
    }

    public Beneficiaire dateInscription(LocalDate dateInscription) {
        this.setDateInscription(dateInscription);
        return this;
    }

    public void setDateInscription(LocalDate dateInscription) {
        this.dateInscription = dateInscription;
    }

    public LocalDate getDateResiliation() {
        return this.dateResiliation;
    }

    public Beneficiaire dateResiliation(LocalDate dateResiliation) {
        this.setDateResiliation(dateResiliation);
        return this;
    }

    public void setDateResiliation(LocalDate dateResiliation) {
        this.dateResiliation = dateResiliation;
    }

    public Set<SoldeCi> getSoldeCis() {
        return this.soldeCis;
    }

    public void setSoldeCis(Set<SoldeCi> soldeCis) {
        if (this.soldeCis != null) {
            this.soldeCis.forEach(i -> i.setBeneficiaire(null));
        }
        if (soldeCis != null) {
            soldeCis.forEach(i -> i.setBeneficiaire(this));
        }
        this.soldeCis = soldeCis;
    }

    public Beneficiaire soldeCis(Set<SoldeCi> soldeCis) {
        this.setSoldeCis(soldeCis);
        return this;
    }

    public Beneficiaire addSoldeCi(SoldeCi soldeCi) {
        this.soldeCis.add(soldeCi);
        soldeCi.setBeneficiaire(this);
        return this;
    }

    public Beneficiaire removeSoldeCi(SoldeCi soldeCi) {
        this.soldeCis.remove(soldeCi);
        soldeCi.setBeneficiaire(null);
        return this;
    }

    public Set<SoldeApa> getSoldeApas() {
        return this.soldeApas;
    }

    public void setSoldeApas(Set<SoldeApa> soldeApas) {
        if (this.soldeApas != null) {
            this.soldeApas.forEach(i -> i.setBeneficiaire(null));
        }
        if (soldeApas != null) {
            soldeApas.forEach(i -> i.setBeneficiaire(this));
        }
        this.soldeApas = soldeApas;
    }

    public Beneficiaire soldeApas(Set<SoldeApa> soldeApas) {
        this.setSoldeApas(soldeApas);
        return this;
    }

    public Beneficiaire addSoldeApa(SoldeApa soldeApa) {
        this.soldeApas.add(soldeApa);
        soldeApa.setBeneficiaire(this);
        return this;
    }

    public Beneficiaire removeSoldeApa(SoldeApa soldeApa) {
        this.soldeApas.remove(soldeApa);
        soldeApa.setBeneficiaire(null);
        return this;
    }

    public Set<SoldePch> getSoldePches() {
        return this.soldePches;
    }

    public void setSoldePches(Set<SoldePch> soldePches) {
        if (this.soldePches != null) {
            this.soldePches.forEach(i -> i.setBeneficiaire(null));
        }
        if (soldePches != null) {
            soldePches.forEach(i -> i.setBeneficiaire(this));
        }
        this.soldePches = soldePches;
    }

    public Beneficiaire soldePches(Set<SoldePch> soldePches) {
        this.setSoldePches(soldePches);
        return this;
    }

    public Beneficiaire addSoldePch(SoldePch soldePch) {
        this.soldePches.add(soldePch);
        soldePch.setBeneficiaire(this);
        return this;
    }

    public Beneficiaire removeSoldePch(SoldePch soldePch) {
        this.soldePches.remove(soldePch);
        soldePch.setBeneficiaire(null);
        return this;
    }

    public Set<SoldePchE> getSoldePchES() {
        return this.soldePchES;
    }

    public void setSoldePchES(Set<SoldePchE> soldePchES) {
        if (this.soldePchES != null) {
            this.soldePchES.forEach(i -> i.setBeneficiaire(null));
        }
        if (soldePchES != null) {
            soldePchES.forEach(i -> i.setBeneficiaire(this));
        }
        this.soldePchES = soldePchES;
    }

    public Beneficiaire soldePchES(Set<SoldePchE> soldePchES) {
        this.setSoldePchES(soldePchES);
        return this;
    }

    public Beneficiaire addSoldePchE(SoldePchE soldePchE) {
        this.soldePchES.add(soldePchE);
        soldePchE.setBeneficiaire(this);
        return this;
    }

    public Beneficiaire removeSoldePchE(SoldePchE soldePchE) {
        this.soldePchES.remove(soldePchE);
        soldePchE.setBeneficiaire(null);
        return this;
    }

    public Set<ConsommationCi> getConsommationCis() {
        return this.consommationCis;
    }

    public void setConsommationCis(Set<ConsommationCi> consommationCis) {
        if (this.consommationCis != null) {
            this.consommationCis.forEach(i -> i.setBeneficiaire(null));
        }
        if (consommationCis != null) {
            consommationCis.forEach(i -> i.setBeneficiaire(this));
        }
        this.consommationCis = consommationCis;
    }

    public Beneficiaire consommationCis(Set<ConsommationCi> consommationCis) {
        this.setConsommationCis(consommationCis);
        return this;
    }

    public Beneficiaire addConsommationCi(ConsommationCi consommationCi) {
        this.consommationCis.add(consommationCi);
        consommationCi.setBeneficiaire(this);
        return this;
    }

    public Beneficiaire removeConsommationCi(ConsommationCi consommationCi) {
        this.consommationCis.remove(consommationCi);
        consommationCi.setBeneficiaire(null);
        return this;
    }

    public Set<ConsommationApa> getConsommationApas() {
        return this.consommationApas;
    }

    public void setConsommationApas(Set<ConsommationApa> consommationApas) {
        if (this.consommationApas != null) {
            this.consommationApas.forEach(i -> i.setBeneficiaire(null));
        }
        if (consommationApas != null) {
            consommationApas.forEach(i -> i.setBeneficiaire(this));
        }
        this.consommationApas = consommationApas;
    }

    public Beneficiaire consommationApas(Set<ConsommationApa> consommationApas) {
        this.setConsommationApas(consommationApas);
        return this;
    }

    public Beneficiaire addConsommationApa(ConsommationApa consommationApa) {
        this.consommationApas.add(consommationApa);
        consommationApa.setBeneficiaire(this);
        return this;
    }

    public Beneficiaire removeConsommationApa(ConsommationApa consommationApa) {
        this.consommationApas.remove(consommationApa);
        consommationApa.setBeneficiaire(null);
        return this;
    }

    public Set<ConsommationPch> getConsommationPches() {
        return this.consommationPches;
    }

    public void setConsommationPches(Set<ConsommationPch> consommationPches) {
        if (this.consommationPches != null) {
            this.consommationPches.forEach(i -> i.setBeneficiaire(null));
        }
        if (consommationPches != null) {
            consommationPches.forEach(i -> i.setBeneficiaire(this));
        }
        this.consommationPches = consommationPches;
    }

    public Beneficiaire consommationPches(Set<ConsommationPch> consommationPches) {
        this.setConsommationPches(consommationPches);
        return this;
    }

    public Beneficiaire addConsommationPch(ConsommationPch consommationPch) {
        this.consommationPches.add(consommationPch);
        consommationPch.setBeneficiaire(this);
        return this;
    }

    public Beneficiaire removeConsommationPch(ConsommationPch consommationPch) {
        this.consommationPches.remove(consommationPch);
        consommationPch.setBeneficiaire(null);
        return this;
    }

    public Set<ConsommationPchE> getConsommationPchES() {
        return this.consommationPchES;
    }

    public void setConsommationPchES(Set<ConsommationPchE> consommationPchES) {
        if (this.consommationPchES != null) {
            this.consommationPchES.forEach(i -> i.setBeneficiaire(null));
        }
        if (consommationPchES != null) {
            consommationPchES.forEach(i -> i.setBeneficiaire(this));
        }
        this.consommationPchES = consommationPchES;
    }

    public Beneficiaire consommationPchES(Set<ConsommationPchE> consommationPchES) {
        this.setConsommationPchES(consommationPchES);
        return this;
    }

    public Beneficiaire addConsommationPchE(ConsommationPchE consommationPchE) {
        this.consommationPchES.add(consommationPchE);
        consommationPchE.setBeneficiaire(this);
        return this;
    }

    public Beneficiaire removeConsommationPchE(ConsommationPchE consommationPchE) {
        this.consommationPchES.remove(consommationPchE);
        consommationPchE.setBeneficiaire(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Beneficiaire)) {
            return false;
        }
        return id != null && id.equals(((Beneficiaire) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Beneficiaire{" +
            "id=" + getId() +
            ", externeId='" + getExterneId() + "'" +
            ", isActif='" + getIsActif() + "'" +
            ", dateInscription='" + getDateInscription() + "'" +
            ", dateResiliation='" + getDateResiliation() + "'" +
            "}";
    }
}
