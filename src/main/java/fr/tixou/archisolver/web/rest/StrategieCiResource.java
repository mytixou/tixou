package fr.tixou.archisolver.web.rest;

import fr.tixou.archisolver.domain.StrategieCi;
import fr.tixou.archisolver.repository.StrategieCiRepository;
import fr.tixou.archisolver.service.StrategieCiService;
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
 * REST controller for managing {@link fr.tixou.archisolver.domain.StrategieCi}.
 */
@RestController
@RequestMapping("/api")
public class StrategieCiResource {

    private final Logger log = LoggerFactory.getLogger(StrategieCiResource.class);

    private static final String ENTITY_NAME = "strategieCi";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StrategieCiService strategieCiService;

    private final StrategieCiRepository strategieCiRepository;

    public StrategieCiResource(StrategieCiService strategieCiService, StrategieCiRepository strategieCiRepository) {
        this.strategieCiService = strategieCiService;
        this.strategieCiRepository = strategieCiRepository;
    }

    /**
     * {@code POST  /strategie-cis} : Create a new strategieCi.
     *
     * @param strategieCi the strategieCi to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new strategieCi, or with status {@code 400 (Bad Request)} if the strategieCi has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/strategie-cis")
    public ResponseEntity<StrategieCi> createStrategieCi(@RequestBody StrategieCi strategieCi) throws URISyntaxException {
        log.debug("REST request to save StrategieCi : {}", strategieCi);
        if (strategieCi.getId() != null) {
            throw new BadRequestAlertException("A new strategieCi cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StrategieCi result = strategieCiService.save(strategieCi);
        return ResponseEntity
            .created(new URI("/api/strategie-cis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /strategie-cis/:id} : Updates an existing strategieCi.
     *
     * @param id the id of the strategieCi to save.
     * @param strategieCi the strategieCi to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated strategieCi,
     * or with status {@code 400 (Bad Request)} if the strategieCi is not valid,
     * or with status {@code 500 (Internal Server Error)} if the strategieCi couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/strategie-cis/{id}")
    public ResponseEntity<StrategieCi> updateStrategieCi(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody StrategieCi strategieCi
    ) throws URISyntaxException {
        log.debug("REST request to update StrategieCi : {}, {}", id, strategieCi);
        if (strategieCi.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, strategieCi.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!strategieCiRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        StrategieCi result = strategieCiService.save(strategieCi);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, strategieCi.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /strategie-cis/:id} : Partial updates given fields of an existing strategieCi, field will ignore if it is null
     *
     * @param id the id of the strategieCi to save.
     * @param strategieCi the strategieCi to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated strategieCi,
     * or with status {@code 400 (Bad Request)} if the strategieCi is not valid,
     * or with status {@code 404 (Not Found)} if the strategieCi is not found,
     * or with status {@code 500 (Internal Server Error)} if the strategieCi couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/strategie-cis/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<StrategieCi> partialUpdateStrategieCi(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody StrategieCi strategieCi
    ) throws URISyntaxException {
        log.debug("REST request to partial update StrategieCi partially : {}, {}", id, strategieCi);
        if (strategieCi.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, strategieCi.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!strategieCiRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<StrategieCi> result = strategieCiService.partialUpdate(strategieCi);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, strategieCi.getId().toString())
        );
    }

    /**
     * {@code GET  /strategie-cis} : get all the strategieCis.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of strategieCis in body.
     */
    @GetMapping("/strategie-cis")
    public List<StrategieCi> getAllStrategieCis() {
        log.debug("REST request to get all StrategieCis");
        return strategieCiService.findAll();
    }

    /**
     * {@code GET  /strategie-cis/:id} : get the "id" strategieCi.
     *
     * @param id the id of the strategieCi to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the strategieCi, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/strategie-cis/{id}")
    public ResponseEntity<StrategieCi> getStrategieCi(@PathVariable Long id) {
        log.debug("REST request to get StrategieCi : {}", id);
        Optional<StrategieCi> strategieCi = strategieCiService.findOne(id);
        return ResponseUtil.wrapOrNotFound(strategieCi);
    }

    /**
     * {@code DELETE  /strategie-cis/:id} : delete the "id" strategieCi.
     *
     * @param id the id of the strategieCi to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/strategie-cis/{id}")
    public ResponseEntity<Void> deleteStrategieCi(@PathVariable Long id) {
        log.debug("REST request to delete StrategieCi : {}", id);
        strategieCiService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
