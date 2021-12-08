package fr.tixou.archisolver.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import fr.tixou.archisolver.domain.enumeration.TypeDestination;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Reponse.
 */
@Entity
@Table(name = "reponse")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Reponse implements Serializable {

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
    @Column(name = "type_question")
    private TypeDestination typeQuestion;

    @ManyToOne
    @JsonIgnoreProperties(value = { "questionnaires" }, allowSetters = true)
    private Question question;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Reponse id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDesignation() {
        return this.designation;
    }

    public Reponse designation(String designation) {
        this.setDesignation(designation);
        return this;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getExplication() {
        return this.explication;
    }

    public Reponse explication(String explication) {
        this.setExplication(explication);
        return this;
    }

    public void setExplication(String explication) {
        this.explication = explication;
    }

    public TypeDestination getTypeQuestion() {
        return this.typeQuestion;
    }

    public Reponse typeQuestion(TypeDestination typeQuestion) {
        this.setTypeQuestion(typeQuestion);
        return this;
    }

    public void setTypeQuestion(TypeDestination typeQuestion) {
        this.typeQuestion = typeQuestion;
    }

    public Question getQuestion() {
        return this.question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public Reponse question(Question question) {
        this.setQuestion(question);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Reponse)) {
            return false;
        }
        return id != null && id.equals(((Reponse) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Reponse{" +
            "id=" + getId() +
            ", designation='" + getDesignation() + "'" +
            ", explication='" + getExplication() + "'" +
            ", typeQuestion='" + getTypeQuestion() + "'" +
            "}";
    }
}
