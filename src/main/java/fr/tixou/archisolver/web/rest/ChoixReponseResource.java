package fr.tixou.archisolver.web.rest;

import fr.tixou.archisolver.domain.ChoixReponse;
import fr.tixou.archisolver.repository.ChoixReponseRepository;
import fr.tixou.archisolver.service.ChoixReponseService;
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
 * REST controller for managing {@link fr.tixou.archisolver.domain.ChoixReponse}.
 */
@RestController
@RequestMapping("/api")
public class ChoixReponseResource {

    private final Logger log = LoggerFactory.getLogger(ChoixReponseResource.class);

    private static final String ENTITY_NAME = "choixReponse";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ChoixReponseService choixReponseService;

    private final ChoixReponseRepository choixReponseRepository;

    public ChoixReponseResource(ChoixReponseService choixReponseService, ChoixReponseRepository choixReponseRepository) {
        this.choixReponseService = choixReponseService;
        this.choixReponseRepository = choixReponseRepository;
    }

    /**
     * {@code POST  /choix-reponses} : Create a new choixReponse.
     *
     * @param choixReponse the choixReponse to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new choixReponse, or with status {@code 400 (Bad Request)} if the choixReponse has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/choix-reponses")
    public ResponseEntity<ChoixReponse> createChoixReponse(@RequestBody ChoixReponse choixReponse) throws URISyntaxException {
        log.debug("REST request to save ChoixReponse : {}", choixReponse);
        if (choixReponse.getId() != null) {
            throw new BadRequestAlertException("A new choixReponse cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ChoixReponse result = choixReponseService.save(choixReponse);
        return ResponseEntity
            .created(new URI("/api/choix-reponses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /choix-reponses/:id} : Updates an existing choixReponse.
     *
     * @param id the id of the choixReponse to save.
     * @param choixReponse the choixReponse to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated choixReponse,
     * or with status {@code 400 (Bad Request)} if the choixReponse is not valid,
     * or with status {@code 500 (Internal Server Error)} if the choixReponse couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/choix-reponses/{id}")
    public ResponseEntity<ChoixReponse> updateChoixReponse(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ChoixReponse choixReponse
    ) throws URISyntaxException {
        log.debug("REST request to update ChoixReponse : {}, {}", id, choixReponse);
        if (choixReponse.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, choixReponse.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!choixReponseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ChoixReponse result = choixReponseService.save(choixReponse);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, choixReponse.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /choix-reponses/:id} : Partial updates given fields of an existing choixReponse, field will ignore if it is null
     *
     * @param id the id of the choixReponse to save.
     * @param choixReponse the choixReponse to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated choixReponse,
     * or with status {@code 400 (Bad Request)} if the choixReponse is not valid,
     * or with status {@code 404 (Not Found)} if the choixReponse is not found,
     * or with status {@code 500 (Internal Server Error)} if the choixReponse couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/choix-reponses/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ChoixReponse> partialUpdateChoixReponse(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ChoixReponse choixReponse
    ) throws URISyntaxException {
        log.debug("REST request to partial update ChoixReponse partially : {}, {}", id, choixReponse);
        if (choixReponse.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, choixReponse.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!choixReponseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ChoixReponse> result = choixReponseService.partialUpdate(choixReponse);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, choixReponse.getId().toString())
        );
    }

    /**
     * {@code GET  /choix-reponses} : get all the choixReponses.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of choixReponses in body.
     */
    @GetMapping("/choix-reponses")
    public List<ChoixReponse> getAllChoixReponses() {
        log.debug("REST request to get all ChoixReponses");
        return choixReponseService.findAll();
    }

    /**
     * {@code GET  /choix-reponses/:id} : get the "id" choixReponse.
     *
     * @param id the id of the choixReponse to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the choixReponse, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/choix-reponses/{id}")
    public ResponseEntity<ChoixReponse> getChoixReponse(@PathVariable Long id) {
        log.debug("REST request to get ChoixReponse : {}", id);
        Optional<ChoixReponse> choixReponse = choixReponseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(choixReponse);
    }

    /**
     * {@code DELETE  /choix-reponses/:id} : delete the "id" choixReponse.
     *
     * @param id the id of the choixReponse to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/choix-reponses/{id}")
    public ResponseEntity<Void> deleteChoixReponse(@PathVariable Long id) {
        log.debug("REST request to delete ChoixReponse : {}", id);
        choixReponseService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
