package fr.tixou.archisolver.domain;

import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Commanditaire.
 */
@Entity
@Table(name = "commanditaire")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Commanditaire implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_metier_interne")
    private String idMetierInterne;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "nom")
    private String nom;

    @Column(name = "email")
    private String email;

    @Column(name = "telephone_fixe")
    private String telephoneFixe;

    @Column(name = "telephone_portable")
    private String telephonePortable;

    @Column(name = "connu_depuis")
    private LocalDate connuDepuis;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Commanditaire id(Long id) {
        this.id = id;
        return this;
    }

    public String getIdMetierInterne() {
        return this.idMetierInterne;
    }

    public Commanditaire idMetierInterne(String idMetierInterne) {
        this.idMetierInterne = idMetierInterne;
        return this;
    }

    public void setIdMetierInterne(String idMetierInterne) {
        this.idMetierInterne = idMetierInterne;
    }

    public String getPrenom() {
        return this.prenom;
    }

    public Commanditaire prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return this.nom;
    }

    public Commanditaire nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getEmail() {
        return this.email;
    }

    public Commanditaire email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephoneFixe() {
        return this.telephoneFixe;
    }

    public Commanditaire telephoneFixe(String telephoneFixe) {
        this.telephoneFixe = telephoneFixe;
        return this;
    }

    public void setTelephoneFixe(String telephoneFixe) {
        this.telephoneFixe = telephoneFixe;
    }

    public String getTelephonePortable() {
        return this.telephonePortable;
    }

    public Commanditaire telephonePortable(String telephonePortable) {
        this.telephonePortable = telephonePortable;
        return this;
    }

    public void setTelephonePortable(String telephonePortable) {
        this.telephonePortable = telephonePortable;
    }

    public LocalDate getConnuDepuis() {
        return this.connuDepuis;
    }

    public Commanditaire connuDepuis(LocalDate connuDepuis) {
        this.connuDepuis = connuDepuis;
        return this;
    }

    public void setConnuDepuis(LocalDate connuDepuis) {
        this.connuDepuis = connuDepuis;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Commanditaire)) {
            return false;
        }
        return id != null && id.equals(((Commanditaire) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Commanditaire{" +
            "id=" + getId() +
            ", idMetierInterne='" + getIdMetierInterne() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", nom='" + getNom() + "'" +
            ", email='" + getEmail() + "'" +
            ", telephoneFixe='" + getTelephoneFixe() + "'" +
            ", telephonePortable='" + getTelephonePortable() + "'" +
            ", connuDepuis='" + getConnuDepuis() + "'" +
            "}";
    }
}
