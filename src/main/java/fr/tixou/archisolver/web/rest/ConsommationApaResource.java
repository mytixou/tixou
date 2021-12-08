package fr.tixou.archisolver.web.rest;

import fr.tixou.archisolver.domain.ConsommationApa;
import fr.tixou.archisolver.repository.ConsommationApaRepository;
import fr.tixou.archisolver.service.ConsommationApaService;
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
 * REST controller for managing {@link fr.tixou.archisolver.domain.ConsommationApa}.
 */
@RestController
@RequestMapping("/api")
public class ConsommationApaResource {

    private final Logger log = LoggerFactory.getLogger(ConsommationApaResource.class);

    private static final String ENTITY_NAME = "consommationApa";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConsommationApaService consommationApaService;

    private final ConsommationApaRepository consommationApaRepository;

    public ConsommationApaResource(ConsommationApaService consommationApaService, ConsommationApaRepository consommationApaRepository) {
        this.consommationApaService = consommationApaService;
        this.consommationApaRepository = consommationApaRepository;
    }

    /**
     * {@code POST  /consommation-apas} : Create a new consommationApa.
     *
     * @param consommationApa the consommationApa to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new consommationApa, or with status {@code 400 (Bad Request)} if the consommationApa has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/consommation-apas")
    public ResponseEntity<ConsommationApa> createConsommationApa(@RequestBody ConsommationApa consommationApa) throws URISyntaxException {
        log.debug("REST request to save ConsommationApa : {}", consommationApa);
        if (consommationApa.getId() != null) {
            throw new BadRequestAlertException("A new consommationApa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ConsommationApa result = consommationApaService.save(consommationApa);
        return ResponseEntity
            .created(new URI("/api/consommation-apas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /consommation-apas/:id} : Updates an existing consommationApa.
     *
     * @param id the id of the consommationApa to save.
     * @param consommationApa the consommationApa to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated consommationApa,
     * or with status {@code 400 (Bad Request)} if the consommationApa is not valid,
     * or with status {@code 500 (Internal Server Error)} if the consommationApa couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/consommation-apas/{id}")
    public ResponseEntity<ConsommationApa> updateConsommationApa(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ConsommationApa consommationApa
    ) throws URISyntaxException {
        log.debug("REST request to update ConsommationApa : {}, {}", id, consommationApa);
        if (consommationApa.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, consommationApa.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!consommationApaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ConsommationApa result = consommationApaService.save(consommationApa);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, consommationApa.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /consommation-apas/:id} : Partial updates given fields of an existing consommationApa, field will ignore if it is null
     *
     * @param id the id of the consommationApa to save.
     * @param consommationApa the consommationApa to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated consommationApa,
     * or with status {@code 400 (Bad Request)} if the consommationApa is not valid,
     * or with status {@code 404 (Not Found)} if the consommationApa is not found,
     * or with status {@code 500 (Internal Server Error)} if the consommationApa couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/consommation-apas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ConsommationApa> partialUpdateConsommationApa(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ConsommationApa consommationApa
    ) throws URISyntaxException {
        log.debug("REST request to partial update ConsommationApa partially : {}, {}", id, consommationApa);
        if (consommationApa.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, consommationApa.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!consommationApaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ConsommationApa> result = consommationApaService.partialUpdate(consommationApa);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, consommationApa.getId().toString())
        );
    }

    /**
     * {@code GET  /consommation-apas} : get all the consommationApas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of consommationApas in body.
     */
    @GetMapping("/consommation-apas")
    public List<ConsommationApa> getAllConsommationApas() {
        log.debug("REST request to get all ConsommationApas");
        return consommationApaService.findAll();
    }

    /**
     * {@code GET  /consommation-apas/:id} : get the "id" consommationApa.
     *
     * @param id the id of the consommationApa to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the consommationApa, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/consommation-apas/{id}")
    public ResponseEntity<ConsommationApa> getConsommationApa(@PathVariable Long id) {
        log.debug("REST request to get ConsommationApa : {}", id);
        Optional<ConsommationApa> consommationApa = consommationApaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(consommationApa);
    }

    /**
     * {@code DELETE  /consommation-apas/:id} : delete the "id" consommationApa.
     *
     * @param id the id of the consommationApa to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/consommation-apas/{id}")
    public ResponseEntity<Void> deleteConsommationApa(@PathVariable Long id) {
        log.debug("REST request to delete ConsommationApa : {}", id);
        consommationApaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
