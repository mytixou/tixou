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
 * A Questionnaire.
 */
@Entity
@Table(name = "questionnaire")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Questionnaire implements Serializable {

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
    @Column(name = "type_questionnaire")
    private TypeDestination typeQuestionnaire;

    @ManyToOne
    @JsonIgnoreProperties(value = { "commanditaire" }, allowSetters = true)
    private Dossier dossier;

    @ManyToMany
    @JoinTable(
        name = "rel_questionnaire__question",
        joinColumns = @JoinColumn(name = "questionnaire_id"),
        inverseJoinColumns = @JoinColumn(name = "question_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "questionnaires" }, allowSetters = true)
    private Set<Question> questions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Questionnaire id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDesignation() {
        return this.designation;
    }

    public Questionnaire designation(String designation) {
        this.setDesignation(designation);
        return this;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getExplication() {
        return this.explication;
    }

    public Questionnaire explication(String explication) {
        this.setExplication(explication);
        return this;
    }

    public void setExplication(String explication) {
        this.explication = explication;
    }

    public TypeDestination getTypeQuestionnaire() {
        return this.typeQuestionnaire;
    }

    public Questionnaire typeQuestionnaire(TypeDestination typeQuestionnaire) {
        this.setTypeQuestionnaire(typeQuestionnaire);
        return this;
    }

    public void setTypeQuestionnaire(TypeDestination typeQuestionnaire) {
        this.typeQuestionnaire = typeQuestionnaire;
    }

    public Dossier getDossier() {
        return this.dossier;
    }

    public void setDossier(Dossier dossier) {
        this.dossier = dossier;
    }

    public Questionnaire dossier(Dossier dossier) {
        this.setDossier(dossier);
        return this;
    }

    public Set<Question> getQuestions() {
        return this.questions;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }

    public Questionnaire questions(Set<Question> questions) {
        this.setQuestions(questions);
        return this;
    }

    public Questionnaire addQuestion(Question question) {
        this.questions.add(question);
        question.getQuestionnaires().add(this);
        return this;
    }

    public Questionnaire removeQuestion(Question question) {
        this.questions.remove(question);
        question.getQuestionnaires().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Questionnaire)) {
            return false;
        }
        return id != null && id.equals(((Questionnaire) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Questionnaire{" +
            "id=" + getId() +
            ", designation='" + getDesignation() + "'" +
            ", explication='" + getExplication() + "'" +
            ", typeQuestionnaire='" + getTypeQuestionnaire() + "'" +
            "}";
    }
}
