package fr.tixou.archisolver.web.rest;

import fr.tixou.archisolver.domain.ConsommationPchE;
import fr.tixou.archisolver.repository.ConsommationPchERepository;
import fr.tixou.archisolver.service.ConsommationPchEService;
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
 * REST controller for managing {@link fr.tixou.archisolver.domain.ConsommationPchE}.
 */
@RestController
@RequestMapping("/api")
public class ConsommationPchEResource {

    private final Logger log = LoggerFactory.getLogger(ConsommationPchEResource.class);

    private static final String ENTITY_NAME = "consommationPchE";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConsommationPchEService consommationPchEService;

    private final ConsommationPchERepository consommationPchERepository;

    public ConsommationPchEResource(
        ConsommationPchEService consommationPchEService,
        ConsommationPchERepository consommationPchERepository
    ) {
        this.consommationPchEService = consommationPchEService;
        this.consommationPchERepository = consommationPchERepository;
    }

    /**
     * {@code POST  /consommation-pch-es} : Create a new consommationPchE.
     *
     * @param consommationPchE the consommationPchE to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new consommationPchE, or with status {@code 400 (Bad Request)} if the consommationPchE has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/consommation-pch-es")
    public ResponseEntity<ConsommationPchE> createConsommationPchE(@RequestBody ConsommationPchE consommationPchE)
        throws URISyntaxException {
        log.debug("REST request to save ConsommationPchE : {}", consommationPchE);
        if (consommationPchE.getId() != null) {
            throw new BadRequestAlertException("A new consommationPchE cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ConsommationPchE result = consommationPchEService.save(consommationPchE);
        return ResponseEntity
            .created(new URI("/api/consommation-pch-es/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /consommation-pch-es/:id} : Updates an existing consommationPchE.
     *
     * @param id the id of the consommationPchE to save.
     * @param consommationPchE the consommationPchE to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated consommationPchE,
     * or with status {@code 400 (Bad Request)} if the consommationPchE is not valid,
     * or with status {@code 500 (Internal Server Error)} if the consommationPchE couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/consommation-pch-es/{id}")
    public ResponseEntity<ConsommationPchE> updateConsommationPchE(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ConsommationPchE consommationPchE
    ) throws URISyntaxException {
        log.debug("REST request to update ConsommationPchE : {}, {}", id, consommationPchE);
        if (consommationPchE.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, consommationPchE.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!consommationPchERepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ConsommationPchE result = consommationPchEService.save(consommationPchE);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, consommationPchE.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /consommation-pch-es/:id} : Partial updates given fields of an existing consommationPchE, field will ignore if it is null
     *
     * @param id the id of the consommationPchE to save.
     * @param consommationPchE the consommationPchE to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated consommationPchE,
     * or with status {@code 400 (Bad Request)} if the consommationPchE is not valid,
     * or with status {@code 404 (Not Found)} if the consommationPchE is not found,
     * or with status {@code 500 (Internal Server Error)} if the consommationPchE couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/consommation-pch-es/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ConsommationPchE> partialUpdateConsommationPchE(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ConsommationPchE consommationPchE
    ) throws URISyntaxException {
        log.debug("REST request to partial update ConsommationPchE partially : {}, {}", id, consommationPchE);
        if (consommationPchE.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, consommationPchE.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!consommationPchERepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ConsommationPchE> result = consommationPchEService.partialUpdate(consommationPchE);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, consommationPchE.getId().toString())
        );
    }

    /**
     * {@code GET  /consommation-pch-es} : get all the consommationPchES.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of consommationPchES in body.
     */
    @GetMapping("/consommation-pch-es")
    public List<ConsommationPchE> getAllConsommationPchES() {
        log.debug("REST request to get all ConsommationPchES");
        return consommationPchEService.findAll();
    }

    /**
     * {@code GET  /consommation-pch-es/:id} : get the "id" consommationPchE.
     *
     * @param id the id of the consommationPchE to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the consommationPchE, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/consommation-pch-es/{id}")
    public ResponseEntity<ConsommationPchE> getConsommationPchE(@PathVariable Long id) {
        log.debug("REST request to get ConsommationPchE : {}", id);
        Optional<ConsommationPchE> consommationPchE = consommationPchEService.findOne(id);
        return ResponseUtil.wrapOrNotFound(consommationPchE);
    }

    /**
     * {@code DELETE  /consommation-pch-es/:id} : delete the "id" consommationPchE.
     *
     * @param id the id of the consommationPchE to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/consommation-pch-es/{id}")
    public ResponseEntity<Void> deleteConsommationPchE(@PathVariable Long id) {
        log.debug("REST request to delete ConsommationPchE : {}", id);
        consommationPchEService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
