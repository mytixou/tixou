package fr.tixou.archisolver.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ChoixReponse.
 */
@Entity
@Table(name = "choix_reponse")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ChoixReponse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "date_choix")
    private Instant dateChoix;

    @ManyToOne
    @JsonIgnoreProperties(value = { "commanditaire" }, allowSetters = true)
    private Dossier dossier;

    @ManyToOne
    @JsonIgnoreProperties(value = { "question" }, allowSetters = true)
    private Reponse reponse;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ChoixReponse id(Long id) {
        this.id = id;
        return this;
    }

    public Instant getDateChoix() {
        return this.dateChoix;
    }

    public ChoixReponse dateChoix(Instant dateChoix) {
        this.dateChoix = dateChoix;
        return this;
    }

    public void setDateChoix(Instant dateChoix) {
        this.dateChoix = dateChoix;
    }

    public Dossier getDossier() {
        return this.dossier;
    }

    public ChoixReponse dossier(Dossier dossier) {
        this.setDossier(dossier);
        return this;
    }

    public void setDossier(Dossier dossier) {
        this.dossier = dossier;
    }

    public Reponse getReponse() {
        return this.reponse;
    }

    public ChoixReponse reponse(Reponse reponse) {
        this.setReponse(reponse);
        return this;
    }

    public void setReponse(Reponse reponse) {
        this.reponse = reponse;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ChoixReponse)) {
            return false;
        }
        return id != null && id.equals(((ChoixReponse) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ChoixReponse{" +
            "id=" + getId() +
            ", dateChoix='" + getDateChoix() + "'" +
            "}";
    }
}
