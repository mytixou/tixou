package fr.tixou.archisolver.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import fr.tixou.archisolver.domain.enumeration.TypeDestination;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Question.
 */
@Entity
@Table(name = "question")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Question implements Serializable {

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

    @ManyToMany(mappedBy = "questions")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "dossier", "questions" }, allowSetters = true)
    private Set<Questionnaire> questionnaires = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Question id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDesignation() {
        return this.designation;
    }

    public Question designation(String designation) {
        this.setDesignation(designation);
        return this;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getExplication() {
        return this.explication;
    }

    public Question explication(String explication) {
        this.setExplication(explication);
        return this;
    }

    public void setExplication(String explication) {
        this.explication = explication;
    }

    public TypeDestination getTypeQuestion() {
        return this.typeQuestion;
    }

    public Question typeQuestion(TypeDestination typeQuestion) {
        this.setTypeQuestion(typeQuestion);
        return this;
    }

    public void setTypeQuestion(TypeDestination typeQuestion) {
        this.typeQuestion = typeQuestion;
    }

    public Set<Questionnaire> getQuestionnaires() {
        return this.questionnaires;
    }

    public void setQuestionnaires(Set<Questionnaire> questionnaires) {
        if (this.questionnaires != null) {
            this.questionnaires.forEach(i -> i.removeQuestion(this));
        }
        if (questionnaires != null) {
            questionnaires.forEach(i -> i.addQuestion(this));
        }
        this.questionnaires = questionnaires;
    }

    public Question questionnaires(Set<Questionnaire> questionnaires) {
        this.setQuestionnaires(questionnaires);
        return this;
    }

    public Question addQuestionnaire(Questionnaire questionnaire) {
        this.questionnaires.add(questionnaire);
        questionnaire.getQuestions().add(this);
        return this;
    }

    public Question removeQuestionnaire(Questionnaire questionnaire) {
        this.questionnaires.remove(questionnaire);
        questionnaire.getQuestions().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Question)) {
            return false;
        }
        return id != null && id.equals(((Question) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Question{" +
            "id=" + getId() +
            ", designation='" + getDesignation() + "'" +
            ", explication='" + getExplication() + "'" +
            ", typeQuestion='" + getTypeQuestion() + "'" +
            "}";
    }
}
