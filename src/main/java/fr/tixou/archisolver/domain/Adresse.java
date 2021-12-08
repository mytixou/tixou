package fr.tixou.archisolver.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Adresse.
 */
@Entity
@Table(name = "adresse")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Adresse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "adresse_ligne_1")
    private String adresseLigne1;

    @Column(name = "adresse_ligne_2")
    private String adresseLigne2;

    @Column(name = "code_postal")
    private String codePostal;

    @Column(name = "ville")
    private String ville;

    @Column(name = "state_province")
    private String stateProvince;

    @ManyToOne
    @JsonIgnoreProperties(value = { "region" }, allowSetters = true)
    private Departement departement;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Adresse id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdresseLigne1() {
        return this.adresseLigne1;
    }

    public Adresse adresseLigne1(String adresseLigne1) {
        this.setAdresseLigne1(adresseLigne1);
        return this;
    }

    public void setAdresseLigne1(String adresseLigne1) {
        this.adresseLigne1 = adresseLigne1;
    }

    public String getAdresseLigne2() {
        return this.adresseLigne2;
    }

    public Adresse adresseLigne2(String adresseLigne2) {
        this.setAdresseLigne2(adresseLigne2);
        return this;
    }

    public void setAdresseLigne2(String adresseLigne2) {
        this.adresseLigne2 = adresseLigne2;
    }

    public String getCodePostal() {
        return this.codePostal;
    }

    public Adresse codePostal(String codePostal) {
        this.setCodePostal(codePostal);
        return this;
    }

    public void setCodePostal(String codePostal) {
        this.codePostal = codePostal;
    }

    public String getVille() {
        return this.ville;
    }

    public Adresse ville(String ville) {
        this.setVille(ville);
        return this;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getStateProvince() {
        return this.stateProvince;
    }

    public Adresse stateProvince(String stateProvince) {
        this.setStateProvince(stateProvince);
        return this;
    }

    public void setStateProvince(String stateProvince) {
        this.stateProvince = stateProvince;
    }

    public Departement getDepartement() {
        return this.departement;
    }

    public void setDepartement(Departement departement) {
        this.departement = departement;
    }

    public Adresse departement(Departement departement) {
        this.setDepartement(departement);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Adresse)) {
            return false;
        }
        return id != null && id.equals(((Adresse) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Adresse{" +
            "id=" + getId() +
            ", adresseLigne1='" + getAdresseLigne1() + "'" +
            ", adresseLigne2='" + getAdresseLigne2() + "'" +
            ", codePostal='" + getCodePostal() + "'" +
            ", ville='" + getVille() + "'" +
            ", stateProvince='" + getStateProvince() + "'" +
            "}";
    }
}
