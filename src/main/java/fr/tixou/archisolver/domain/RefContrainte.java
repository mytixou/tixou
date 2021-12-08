package fr.tixou.archisolver.domain;

import fr.tixou.archisolver.domain.enumeration.TypeContrainte;
import fr.tixou.archisolver.domain.enumeration.TypeDestination;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A RefContrainte.
 */
@Entity
@Table(name = "ref_contrainte")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class RefContrainte implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "designation")
    private String designation;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_contrainte")
    private TypeContrainte typeContrainte;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_destination")
    private TypeDestination typeDestination;

    @Column(name = "explication")
    private String explication;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public RefContrainte id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDesignation() {
        return this.designation;
    }

    public RefContrainte designation(String designation) {
        this.setDesignation(designation);
        return this;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public TypeContrainte getTypeContrainte() {
        return this.typeContrainte;
    }

    public RefContrainte typeContrainte(TypeContrainte typeContrainte) {
        this.setTypeContrainte(typeContrainte);
        return this;
    }

    public void setTypeContrainte(TypeContrainte typeContrainte) {
        this.typeContrainte = typeContrainte;
    }

    public TypeDestination getTypeDestination() {
        return this.typeDestination;
    }

    public RefContrainte typeDestination(TypeDestination typeDestination) {
        this.setTypeDestination(typeDestination);
        return this;
    }

    public void setTypeDestination(TypeDestination typeDestination) {
        this.typeDestination = typeDestination;
    }

    public String getExplication() {
        return this.explication;
    }

    public RefContrainte explication(String explication) {
        this.setExplication(explication);
        return this;
    }

    public void setExplication(String explication) {
        this.explication = explication;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RefContrainte)) {
            return false;
        }
        return id != null && id.equals(((RefContrainte) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RefContrainte{" +
            "id=" + getId() +
            ", designation='" + getDesignation() + "'" +
            ", typeContrainte='" + getTypeContrainte() + "'" +
            ", typeDestination='" + getTypeDestination() + "'" +
            ", explication='" + getExplication() + "'" +
            "}";
    }
}
