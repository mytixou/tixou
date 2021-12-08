package fr.tixou.archisolver.web.rest;

import fr.tixou.archisolver.domain.ConsommationPch;
import fr.tixou.archisolver.repository.ConsommationPchRepository;
import fr.tixou.archisolver.service.ConsommationPchService;
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
 * REST controller for managing {@link fr.tixou.archisolver.domain.ConsommationPch}.
 */
@RestController
@RequestMapping("/api")
public class ConsommationPchResource {

    private final Logger log = LoggerFactory.getLogger(ConsommationPchResource.class);

    private static final String ENTITY_NAME = "consommationPch";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConsommationPchService consommationPchService;

    private final ConsommationPchRepository consommationPchRepository;

    public ConsommationPchResource(ConsommationPchService consommationPchService, ConsommationPchRepository consommationPchRepository) {
        this.consommationPchService = consommationPchService;
        this.consommationPchRepository = consommationPchRepository;
    }

    /**
     * {@code POST  /consommation-pches} : Create a new consommationPch.
     *
     * @param consommationPch the consommationPch to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new consommationPch, or with status {@code 400 (Bad Request)} if the consommationPch has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/consommation-pches")
    public ResponseEntity<ConsommationPch> createConsommationPch(@RequestBody ConsommationPch consommationPch) throws URISyntaxException {
        log.debug("REST request to save ConsommationPch : {}", consommationPch);
        if (consommationPch.getId() != null) {
            throw new BadRequestAlertException("A new consommationPch cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ConsommationPch result = consommationPchService.save(consommationPch);
        return ResponseEntity
            .created(new URI("/api/consommation-pches/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /consommation-pches/:id} : Updates an existing consommationPch.
     *
     * @param id the id of the consommationPch to save.
     * @param consommationPch the consommationPch to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated consommationPch,
     * or with status {@code 400 (Bad Request)} if the consommationPch is not valid,
     * or with status {@code 500 (Internal Server Error)} if the consommationPch couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/consommation-pches/{id}")
    public ResponseEntity<ConsommationPch> updateConsommationPch(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ConsommationPch consommationPch
    ) throws URISyntaxException {
        log.debug("REST request to update ConsommationPch : {}, {}", id, consommationPch);
        if (consommationPch.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, consommationPch.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!consommationPchRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ConsommationPch result = consommationPchService.save(consommationPch);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, consommationPch.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /consommation-pches/:id} : Partial updates given fields of an existing consommationPch, field will ignore if it is null
     *
     * @param id the id of the consommationPch to save.
     * @param consommationPch the consommationPch to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated consommationPch,
     * or with status {@code 400 (Bad Request)} if the consommationPch is not valid,
     * or with status {@code 404 (Not Found)} if the consommationPch is not found,
     * or with status {@code 500 (Internal Server Error)} if the consommationPch couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/consommation-pches/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ConsommationPch> partialUpdateConsommationPch(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ConsommationPch consommationPch
    ) throws URISyntaxException {
        log.debug("REST request to partial update ConsommationPch partially : {}, {}", id, consommationPch);
        if (consommationPch.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, consommationPch.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!consommationPchRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ConsommationPch> result = consommationPchService.partialUpdate(consommationPch);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, consommationPch.getId().toString())
        );
    }

    /**
     * {@code GET  /consommation-pches} : get all the consommationPches.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of consommationPches in body.
     */
    @GetMapping("/consommation-pches")
    public List<ConsommationPch> getAllConsommationPches() {
        log.debug("REST request to get all ConsommationPches");
        return consommationPchService.findAll();
    }

    /**
     * {@code GET  /consommation-pches/:id} : get the "id" consommationPch.
     *
     * @param id the id of the consommationPch to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the consommationPch, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/consommation-pches/{id}")
    public ResponseEntity<ConsommationPch> getConsommationPch(@PathVariable Long id) {
        log.debug("REST request to get ConsommationPch : {}", id);
        Optional<ConsommationPch> consommationPch = consommationPchService.findOne(id);
        return ResponseUtil.wrapOrNotFound(consommationPch);
    }

    /**
     * {@code DELETE  /consommation-pches/:id} : delete the "id" consommationPch.
     *
     * @param id the id of the consommationPch to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/consommation-pches/{id}")
    public ResponseEntity<Void> deleteConsommationPch(@PathVariable Long id) {
        log.debug("REST request to delete ConsommationPch : {}", id);
        consommationPchService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
