package fr.tixou.archisolver.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import fr.tixou.archisolver.domain.enumeration.TypeDestination;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Impact.
 */
@Entity
@Table(name = "impact")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Impact implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "designation")
    private String designation;

    @Column(name = "explication")
    private String explication;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_impact")
    private TypeDestination typeImpact;

    @ManyToOne
    @JsonIgnoreProperties(value = { "question" }, allowSetters = true)
    private Reponse reponse;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Impact id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDesignation() {
        return this.designation;
    }

    public Impact designation(String designation) {
        this.setDesignation(designation);
        return this;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getExplication() {
        return this.explication;
    }

    public Impact explication(String explication) {
        this.setExplication(explication);
        return this;
    }

    public void setExplication(String explication) {
        this.explication = explication;
    }

    public TypeDestination getTypeImpact() {
        return this.typeImpact;
    }

    public Impact typeImpact(TypeDestination typeImpact) {
        this.setTypeImpact(typeImpact);
        return this;
    }

    public void setTypeImpact(TypeDestination typeImpact) {
        this.typeImpact = typeImpact;
    }

    public Reponse getReponse() {
        return this.reponse;
    }

    public void setReponse(Reponse reponse) {
        this.reponse = reponse;
    }

    public Impact reponse(Reponse reponse) {
        this.setReponse(reponse);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Impact)) {
            return false;
        }
        return id != null && id.equals(((Impact) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Impact{" +
            "id=" + getId() +
            ", designation='" + getDesignation() + "'" +
            ", explication='" + getExplication() + "'" +
            ", typeImpact='" + getTypeImpact() + "'" +
            "}";
    }
}
