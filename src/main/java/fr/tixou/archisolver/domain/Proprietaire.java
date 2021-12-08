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
 * A Proprietaire.
 */
@Entity
@Table(name = "proprietaire")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Proprietaire implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

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

    @Column(name = "depuis")
    private LocalDate depuis;

    @Column(name = "habite_local")
    private Boolean habiteLocal;

    @Column(name = "fin_le")
    private LocalDate finLe;

    @ManyToMany
    @JoinTable(
        name = "rel_proprietaire__local",
        joinColumns = @JoinColumn(name = "proprietaire_id"),
        inverseJoinColumns = @JoinColumn(name = "local_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "batiment", "proprietaires" }, allowSetters = true)
    private Set<Local> locals = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Proprietaire id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrenom() {
        return this.prenom;
    }

    public Proprietaire prenom(String prenom) {
        this.setPrenom(prenom);
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return this.nom;
    }

    public Proprietaire nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getEmail() {
        return this.email;
    }

    public Proprietaire email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephoneFixe() {
        return this.telephoneFixe;
    }

    public Proprietaire telephoneFixe(String telephoneFixe) {
        this.setTelephoneFixe(telephoneFixe);
        return this;
    }

    public void setTelephoneFixe(String telephoneFixe) {
        this.telephoneFixe = telephoneFixe;
    }

    public String getTelephonePortable() {
        return this.telephonePortable;
    }

    public Proprietaire telephonePortable(String telephonePortable) {
        this.setTelephonePortable(telephonePortable);
        return this;
    }

    public void setTelephonePortable(String telephonePortable) {
        this.telephonePortable = telephonePortable;
    }

    public LocalDate getDepuis() {
        return this.depuis;
    }

    public Proprietaire depuis(LocalDate depuis) {
        this.setDepuis(depuis);
        return this;
    }

    public void setDepuis(LocalDate depuis) {
        this.depuis = depuis;
    }

    public Boolean getHabiteLocal() {
        return this.habiteLocal;
    }

    public Proprietaire habiteLocal(Boolean habiteLocal) {
        this.setHabiteLocal(habiteLocal);
        return this;
    }

    public void setHabiteLocal(Boolean habiteLocal) {
        this.habiteLocal = habiteLocal;
    }

    public LocalDate getFinLe() {
        return this.finLe;
    }

    public Proprietaire finLe(LocalDate finLe) {
        this.setFinLe(finLe);
        return this;
    }

    public void setFinLe(LocalDate finLe) {
        this.finLe = finLe;
    }

    public Set<Local> getLocals() {
        return this.locals;
    }

    public void setLocals(Set<Local> locals) {
        this.locals = locals;
    }

    public Proprietaire locals(Set<Local> locals) {
        this.setLocals(locals);
        return this;
    }

    public Proprietaire addLocal(Local local) {
        this.locals.add(local);
        local.getProprietaires().add(this);
        return this;
    }

    public Proprietaire removeLocal(Local local) {
        this.locals.remove(local);
        local.getProprietaires().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Proprietaire)) {
            return false;
        }
        return id != null && id.equals(((Proprietaire) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Proprietaire{" +
            "id=" + getId() +
            ", prenom='" + getPrenom() + "'" +
            ", nom='" + getNom() + "'" +
            ", email='" + getEmail() + "'" +
            ", telephoneFixe='" + getTelephoneFixe() + "'" +
            ", telephonePortable='" + getTelephonePortable() + "'" +
            ", depuis='" + getDepuis() + "'" +
            ", habiteLocal='" + getHabiteLocal() + "'" +
            ", finLe='" + getFinLe() + "'" +
            "}";
    }
}
