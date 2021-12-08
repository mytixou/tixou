package fr.tixou.archisolver.web.rest;

import fr.tixou.archisolver.domain.StrategiePchE;
import fr.tixou.archisolver.repository.StrategiePchERepository;
import fr.tixou.archisolver.service.StrategiePchEService;
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
 * REST controller for managing {@link fr.tixou.archisolver.domain.StrategiePchE}.
 */
@RestController
@RequestMapping("/api")
public class StrategiePchEResource {

    private final Logger log = LoggerFactory.getLogger(StrategiePchEResource.class);

    private static final String ENTITY_NAME = "strategiePchE";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StrategiePchEService strategiePchEService;

    private final StrategiePchERepository strategiePchERepository;

    public StrategiePchEResource(StrategiePchEService strategiePchEService, StrategiePchERepository strategiePchERepository) {
        this.strategiePchEService = strategiePchEService;
        this.strategiePchERepository = strategiePchERepository;
    }

    /**
     * {@code POST  /strategie-pch-es} : Create a new strategiePchE.
     *
     * @param strategiePchE the strategiePchE to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new strategiePchE, or with status {@code 400 (Bad Request)} if the strategiePchE has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/strategie-pch-es")
    public ResponseEntity<StrategiePchE> createStrategiePchE(@RequestBody StrategiePchE strategiePchE) throws URISyntaxException {
        log.debug("REST request to save StrategiePchE : {}", strategiePchE);
        if (strategiePchE.getId() != null) {
            throw new BadRequestAlertException("A new strategiePchE cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StrategiePchE result = strategiePchEService.save(strategiePchE);
        return ResponseEntity
            .created(new URI("/api/strategie-pch-es/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /strategie-pch-es/:id} : Updates an existing strategiePchE.
     *
     * @param id the id of the strategiePchE to save.
     * @param strategiePchE the strategiePchE to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated strategiePchE,
     * or with status {@code 400 (Bad Request)} if the strategiePchE is not valid,
     * or with status {@code 500 (Internal Server Error)} if the strategiePchE couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/strategie-pch-es/{id}")
    public ResponseEntity<StrategiePchE> updateStrategiePchE(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody StrategiePchE strategiePchE
    ) throws URISyntaxException {
        log.debug("REST request to update StrategiePchE : {}, {}", id, strategiePchE);
        if (strategiePchE.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, strategiePchE.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!strategiePchERepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        StrategiePchE result = strategiePchEService.save(strategiePchE);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, strategiePchE.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /strategie-pch-es/:id} : Partial updates given fields of an existing strategiePchE, field will ignore if it is null
     *
     * @param id the id of the strategiePchE to save.
     * @param strategiePchE the strategiePchE to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated strategiePchE,
     * or with status {@code 400 (Bad Request)} if the strategiePchE is not valid,
     * or with status {@code 404 (Not Found)} if the strategiePchE is not found,
     * or with status {@code 500 (Internal Server Error)} if the strategiePchE couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/strategie-pch-es/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<StrategiePchE> partialUpdateStrategiePchE(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody StrategiePchE strategiePchE
    ) throws URISyntaxException {
        log.debug("REST request to partial update StrategiePchE partially : {}, {}", id, strategiePchE);
        if (strategiePchE.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, strategiePchE.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!strategiePchERepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<StrategiePchE> result = strategiePchEService.partialUpdate(strategiePchE);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, strategiePchE.getId().toString())
        );
    }

    /**
     * {@code GET  /strategie-pch-es} : get all the strategiePchES.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of strategiePchES in body.
     */
    @GetMapping("/strategie-pch-es")
    public List<StrategiePchE> getAllStrategiePchES() {
        log.debug("REST request to get all StrategiePchES");
        return strategiePchEService.findAll();
    }

    /**
     * {@code GET  /strategie-pch-es/:id} : get the "id" strategiePchE.
     *
     * @param id the id of the strategiePchE to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the strategiePchE, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/strategie-pch-es/{id}")
    public ResponseEntity<StrategiePchE> getStrategiePchE(@PathVariable Long id) {
        log.debug("REST request to get StrategiePchE : {}", id);
        Optional<StrategiePchE> strategiePchE = strategiePchEService.findOne(id);
        return ResponseUtil.wrapOrNotFound(strategiePchE);
    }

    /**
     * {@code DELETE  /strategie-pch-es/:id} : delete the "id" strategiePchE.
     *
     * @param id the id of the strategiePchE to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/strategie-pch-es/{id}")
    public ResponseEntity<Void> deleteStrategiePchE(@PathVariable Long id) {
        log.debug("REST request to delete StrategiePchE : {}", id);
        strategiePchEService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
