package fr.tixou.archisolver.web.rest;

import fr.tixou.archisolver.domain.SoldeApa;
import fr.tixou.archisolver.repository.SoldeApaRepository;
import fr.tixou.archisolver.service.SoldeApaService;
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
 * REST controller for managing {@link fr.tixou.archisolver.domain.SoldeApa}.
 */
@RestController
@RequestMapping("/api")
public class SoldeApaResource {

    private final Logger log = LoggerFactory.getLogger(SoldeApaResource.class);

    private static final String ENTITY_NAME = "soldeApa";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SoldeApaService soldeApaService;

    private final SoldeApaRepository soldeApaRepository;

    public SoldeApaResource(SoldeApaService soldeApaService, SoldeApaRepository soldeApaRepository) {
        this.soldeApaService = soldeApaService;
        this.soldeApaRepository = soldeApaRepository;
    }

    /**
     * {@code POST  /solde-apas} : Create a new soldeApa.
     *
     * @param soldeApa the soldeApa to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new soldeApa, or with status {@code 400 (Bad Request)} if the soldeApa has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/solde-apas")
    public ResponseEntity<SoldeApa> createSoldeApa(@RequestBody SoldeApa soldeApa) throws URISyntaxException {
        log.debug("REST request to save SoldeApa : {}", soldeApa);
        if (soldeApa.getId() != null) {
            throw new BadRequestAlertException("A new soldeApa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SoldeApa result = soldeApaService.save(soldeApa);
        return ResponseEntity
            .created(new URI("/api/solde-apas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /solde-apas/:id} : Updates an existing soldeApa.
     *
     * @param id the id of the soldeApa to save.
     * @param soldeApa the soldeApa to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated soldeApa,
     * or with status {@code 400 (Bad Request)} if the soldeApa is not valid,
     * or with status {@code 500 (Internal Server Error)} if the soldeApa couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/solde-apas/{id}")
    public ResponseEntity<SoldeApa> updateSoldeApa(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SoldeApa soldeApa
    ) throws URISyntaxException {
        log.debug("REST request to update SoldeApa : {}, {}", id, soldeApa);
        if (soldeApa.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, soldeApa.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!soldeApaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        SoldeApa result = soldeApaService.save(soldeApa);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, soldeApa.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /solde-apas/:id} : Partial updates given fields of an existing soldeApa, field will ignore if it is null
     *
     * @param id the id of the soldeApa to save.
     * @param soldeApa the soldeApa to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated soldeApa,
     * or with status {@code 400 (Bad Request)} if the soldeApa is not valid,
     * or with status {@code 404 (Not Found)} if the soldeApa is not found,
     * or with status {@code 500 (Internal Server Error)} if the soldeApa couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/solde-apas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SoldeApa> partialUpdateSoldeApa(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SoldeApa soldeApa
    ) throws URISyntaxException {
        log.debug("REST request to partial update SoldeApa partially : {}, {}", id, soldeApa);
        if (soldeApa.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, soldeApa.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!soldeApaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SoldeApa> result = soldeApaService.partialUpdate(soldeApa);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, soldeApa.getId().toString())
        );
    }

    /**
     * {@code GET  /solde-apas} : get all the soldeApas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of soldeApas in body.
     */
    @GetMapping("/solde-apas")
    public List<SoldeApa> getAllSoldeApas() {
        log.debug("REST request to get all SoldeApas");
        return soldeApaService.findAll();
    }

    /**
     * {@code GET  /solde-apas/:id} : get the "id" soldeApa.
     *
     * @param id the id of the soldeApa to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the soldeApa, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/solde-apas/{id}")
    public ResponseEntity<SoldeApa> getSoldeApa(@PathVariable Long id) {
        log.debug("REST request to get SoldeApa : {}", id);
        Optional<SoldeApa> soldeApa = soldeApaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(soldeApa);
    }

    /**
     * {@code DELETE  /solde-apas/:id} : delete the "id" soldeApa.
     *
     * @param id the id of the soldeApa to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/solde-apas/{id}")
    public ResponseEntity<Void> deleteSoldeApa(@PathVariable Long id) {
        log.debug("REST request to delete SoldeApa : {}", id);
        soldeApaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
