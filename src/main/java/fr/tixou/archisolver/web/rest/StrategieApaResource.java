package fr.tixou.archisolver.web.rest;

import fr.tixou.archisolver.domain.StrategieApa;
import fr.tixou.archisolver.repository.StrategieApaRepository;
import fr.tixou.archisolver.service.StrategieApaService;
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
 * REST controller for managing {@link fr.tixou.archisolver.domain.StrategieApa}.
 */
@RestController
@RequestMapping("/api")
public class StrategieApaResource {

    private final Logger log = LoggerFactory.getLogger(StrategieApaResource.class);

    private static final String ENTITY_NAME = "strategieApa";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StrategieApaService strategieApaService;

    private final StrategieApaRepository strategieApaRepository;

    public StrategieApaResource(StrategieApaService strategieApaService, StrategieApaRepository strategieApaRepository) {
        this.strategieApaService = strategieApaService;
        this.strategieApaRepository = strategieApaRepository;
    }

    /**
     * {@code POST  /strategie-apas} : Create a new strategieApa.
     *
     * @param strategieApa the strategieApa to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new strategieApa, or with status {@code 400 (Bad Request)} if the strategieApa has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/strategie-apas")
    public ResponseEntity<StrategieApa> createStrategieApa(@RequestBody StrategieApa strategieApa) throws URISyntaxException {
        log.debug("REST request to save StrategieApa : {}", strategieApa);
        if (strategieApa.getId() != null) {
            throw new BadRequestAlertException("A new strategieApa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StrategieApa result = strategieApaService.save(strategieApa);
        return ResponseEntity
            .created(new URI("/api/strategie-apas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /strategie-apas/:id} : Updates an existing strategieApa.
     *
     * @param id the id of the strategieApa to save.
     * @param strategieApa the strategieApa to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated strategieApa,
     * or with status {@code 400 (Bad Request)} if the strategieApa is not valid,
     * or with status {@code 500 (Internal Server Error)} if the strategieApa couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/strategie-apas/{id}")
    public ResponseEntity<StrategieApa> updateStrategieApa(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody StrategieApa strategieApa
    ) throws URISyntaxException {
        log.debug("REST request to update StrategieApa : {}, {}", id, strategieApa);
        if (strategieApa.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, strategieApa.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!strategieApaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        StrategieApa result = strategieApaService.save(strategieApa);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, strategieApa.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /strategie-apas/:id} : Partial updates given fields of an existing strategieApa, field will ignore if it is null
     *
     * @param id the id of the strategieApa to save.
     * @param strategieApa the strategieApa to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated strategieApa,
     * or with status {@code 400 (Bad Request)} if the strategieApa is not valid,
     * or with status {@code 404 (Not Found)} if the strategieApa is not found,
     * or with status {@code 500 (Internal Server Error)} if the strategieApa couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/strategie-apas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<StrategieApa> partialUpdateStrategieApa(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody StrategieApa strategieApa
    ) throws URISyntaxException {
        log.debug("REST request to partial update StrategieApa partially : {}, {}", id, strategieApa);
        if (strategieApa.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, strategieApa.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!strategieApaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<StrategieApa> result = strategieApaService.partialUpdate(strategieApa);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, strategieApa.getId().toString())
        );
    }

    /**
     * {@code GET  /strategie-apas} : get all the strategieApas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of strategieApas in body.
     */
    @GetMapping("/strategie-apas")
    public List<StrategieApa> getAllStrategieApas() {
        log.debug("REST request to get all StrategieApas");
        return strategieApaService.findAll();
    }

    /**
     * {@code GET  /strategie-apas/:id} : get the "id" strategieApa.
     *
     * @param id the id of the strategieApa to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the strategieApa, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/strategie-apas/{id}")
    public ResponseEntity<StrategieApa> getStrategieApa(@PathVariable Long id) {
        log.debug("REST request to get StrategieApa : {}", id);
        Optional<StrategieApa> strategieApa = strategieApaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(strategieApa);
    }

    /**
     * {@code DELETE  /strategie-apas/:id} : delete the "id" strategieApa.
     *
     * @param id the id of the strategieApa to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/strategie-apas/{id}")
    public ResponseEntity<Void> deleteStrategieApa(@PathVariable Long id) {
        log.debug("REST request to delete StrategieApa : {}", id);
        strategieApaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
