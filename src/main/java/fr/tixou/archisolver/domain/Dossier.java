package fr.tixou.archisolver.domain;

import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Dossier.
 */
@Entity
@Table(name = "dossier")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Dossier implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "designation")
    private String designation;

    @Column(name = "description")
    private String description;

    @Column(name = "date_creation")
    private Instant dateCreation;

    @Column(name = "date_cloture")
    private Instant dateCloture;

    @ManyToOne
    private Commanditaire commanditaire;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Dossier id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDesignation() {
        return this.designation;
    }

    public Dossier designation(String designation) {
        this.setDesignation(designation);
        return this;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getDescription() {
        return this.description;
    }

    public Dossier description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getDateCreation() {
        return this.dateCreation;
    }

    public Dossier dateCreation(Instant dateCreation) {
        this.setDateCreation(dateCreation);
        return this;
    }

    public void setDateCreation(Instant dateCreation) {
        this.dateCreation = dateCreation;
    }

    public Instant getDateCloture() {
        return this.dateCloture;
    }

    public Dossier dateCloture(Instant dateCloture) {
        this.setDateCloture(dateCloture);
        return this;
    }

    public void setDateCloture(Instant dateCloture) {
        this.dateCloture = dateCloture;
    }

    public Commanditaire getCommanditaire() {
        return this.commanditaire;
    }

    public void setCommanditaire(Commanditaire commanditaire) {
        this.commanditaire = commanditaire;
    }

    public Dossier commanditaire(Commanditaire commanditaire) {
        this.setCommanditaire(commanditaire);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Dossier)) {
            return false;
        }
        return id != null && id.equals(((Dossier) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Dossier{" +
            "id=" + getId() +
            ", designation='" + getDesignation() + "'" +
            ", description='" + getDescription() + "'" +
            ", dateCreation='" + getDateCreation() + "'" +
            ", dateCloture='" + getDateCloture() + "'" +
            "}";
    }
}
