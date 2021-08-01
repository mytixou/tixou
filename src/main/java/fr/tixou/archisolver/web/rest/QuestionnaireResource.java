package fr.tixou.archisolver.web.rest;

import fr.tixou.archisolver.domain.Questionnaire;
import fr.tixou.archisolver.repository.QuestionnaireRepository;
import fr.tixou.archisolver.service.QuestionnaireService;
import fr.tixou.archisolver.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link fr.tixou.archisolver.domain.Questionnaire}.
 */
@RestController
@RequestMapping("/api")
public class QuestionnaireResource {

    private final Logger log = LoggerFactory.getLogger(QuestionnaireResource.class);

    private static final String ENTITY_NAME = "questionnaire";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QuestionnaireService questionnaireService;

    private final QuestionnaireRepository questionnaireRepository;

    public QuestionnaireResource(QuestionnaireService questionnaireService, QuestionnaireRepository questionnaireRepository) {
        this.questionnaireService = questionnaireService;
        this.questionnaireRepository = questionnaireRepository;
    }

    /**
     * {@code POST  /questionnaires} : Create a new questionnaire.
     *
     * @param questionnaire the questionnaire to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new questionnaire, or with status {@code 400 (Bad Request)} if the questionnaire has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/questionnaires")
    public ResponseEntity<Questionnaire> createQuestionnaire(@RequestBody Questionnaire questionnaire) throws URISyntaxException {
        log.debug("REST request to save Questionnaire : {}", questionnaire);
        if (questionnaire.getId() != null) {
            throw new BadRequestAlertException("A new questionnaire cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Questionnaire result = questionnaireService.save(questionnaire);
        return ResponseEntity
            .created(new URI("/api/questionnaires/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /questionnaires/:id} : Updates an existing questionnaire.
     *
     * @param id the id of the questionnaire to save.
     * @param questionnaire the questionnaire to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated questionnaire,
     * or with status {@code 400 (Bad Request)} if the questionnaire is not valid,
     * or with status {@code 500 (Internal Server Error)} if the questionnaire couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/questionnaires/{id}")
    public ResponseEntity<Questionnaire> updateQuestionnaire(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Questionnaire questionnaire
    ) throws URISyntaxException {
        log.debug("REST request to update Questionnaire : {}, {}", id, questionnaire);
        if (questionnaire.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, questionnaire.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!questionnaireRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Questionnaire result = questionnaireService.save(questionnaire);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, questionnaire.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /questionnaires/:id} : Partial updates given fields of an existing questionnaire, field will ignore if it is null
     *
     * @param id the id of the questionnaire to save.
     * @param questionnaire the questionnaire to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated questionnaire,
     * or with status {@code 400 (Bad Request)} if the questionnaire is not valid,
     * or with status {@code 404 (Not Found)} if the questionnaire is not found,
     * or with status {@code 500 (Internal Server Error)} if the questionnaire couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/questionnaires/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Questionnaire> partialUpdateQuestionnaire(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Questionnaire questionnaire
    ) throws URISyntaxException {
        log.debug("REST request to partial update Questionnaire partially : {}, {}", id, questionnaire);
        if (questionnaire.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, questionnaire.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!questionnaireRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Questionnaire> result = questionnaireService.partialUpdate(questionnaire);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, questionnaire.getId().toString())
        );
    }

    /**
     * {@code GET  /questionnaires} : get all the questionnaires.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of questionnaires in body.
     */
    @GetMapping("/questionnaires")
    public List<Questionnaire> getAllQuestionnaires(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Questionnaires");
        return questionnaireService.findAll();
    }

    /**
     * {@code GET  /questionnaires/:id} : get the "id" questionnaire.
     *
     * @param id the id of the questionnaire to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the questionnaire, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/questionnaires/{id}")
    public ResponseEntity<Questionnaire> getQuestionnaire(@PathVariable Long id) {
        log.debug("REST request to get Questionnaire : {}", id);
        Optional<Questionnaire> questionnaire = questionnaireService.findOne(id);
        return ResponseUtil.wrapOrNotFound(questionnaire);
    }

    /**
     * {@code DELETE  /questionnaires/:id} : delete the "id" questionnaire.
     *
     * @param id the id of the questionnaire to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/questionnaires/{id}")
    public ResponseEntity<Void> deleteQuestionnaire(@PathVariable Long id) {
        log.debug("REST request to delete Questionnaire : {}", id);
        questionnaireService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
