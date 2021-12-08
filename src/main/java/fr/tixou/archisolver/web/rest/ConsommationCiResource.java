package fr.tixou.archisolver.web.rest;

import fr.tixou.archisolver.domain.ConsommationCi;
import fr.tixou.archisolver.repository.ConsommationCiRepository;
import fr.tixou.archisolver.service.ConsommationCiService;
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
 * REST controller for managing {@link fr.tixou.archisolver.domain.ConsommationCi}.
 */
@RestController
@RequestMapping("/api")
public class ConsommationCiResource {

    private final Logger log = LoggerFactory.getLogger(ConsommationCiResource.class);

    private static final String ENTITY_NAME = "consommationCi";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConsommationCiService consommationCiService;

    private final ConsommationCiRepository consommationCiRepository;

    public ConsommationCiResource(ConsommationCiService consommationCiService, ConsommationCiRepository consommationCiRepository) {
        this.consommationCiService = consommationCiService;
        this.consommationCiRepository = consommationCiRepository;
    }

    /**
     * {@code POST  /consommation-cis} : Create a new consommationCi.
     *
     * @param consommationCi the consommationCi to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new consommationCi, or with status {@code 400 (Bad Request)} if the consommationCi has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/consommation-cis")
    public ResponseEntity<ConsommationCi> createConsommationCi(@RequestBody ConsommationCi consommationCi) throws URISyntaxException {
        log.debug("REST request to save ConsommationCi : {}", consommationCi);
        if (consommationCi.getId() != null) {
            throw new BadRequestAlertException("A new consommationCi cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ConsommationCi result = consommationCiService.save(consommationCi);
        return ResponseEntity
            .created(new URI("/api/consommation-cis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /consommation-cis/:id} : Updates an existing consommationCi.
     *
     * @param id the id of the consommationCi to save.
     * @param consommationCi the consommationCi to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated consommationCi,
     * or with status {@code 400 (Bad Request)} if the consommationCi is not valid,
     * or with status {@code 500 (Internal Server Error)} if the consommationCi couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/consommation-cis/{id}")
    public ResponseEntity<ConsommationCi> updateConsommationCi(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ConsommationCi consommationCi
    ) throws URISyntaxException {
        log.debug("REST request to update ConsommationCi : {}, {}", id, consommationCi);
        if (consommationCi.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, consommationCi.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!consommationCiRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ConsommationCi result = consommationCiService.save(consommationCi);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, consommationCi.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /consommation-cis/:id} : Partial updates given fields of an existing consommationCi, field will ignore if it is null
     *
     * @param id the id of the consommationCi to save.
     * @param consommationCi the consommationCi to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated consommationCi,
     * or with status {@code 400 (Bad Request)} if the consommationCi is not valid,
     * or with status {@code 404 (Not Found)} if the consommationCi is not found,
     * or with status {@code 500 (Internal Server Error)} if the consommationCi couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/consommation-cis/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ConsommationCi> partialUpdateConsommationCi(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ConsommationCi consommationCi
    ) throws URISyntaxException {
        log.debug("REST request to partial update ConsommationCi partially : {}, {}", id, consommationCi);
        if (consommationCi.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, consommationCi.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!consommationCiRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ConsommationCi> result = consommationCiService.partialUpdate(consommationCi);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, consommationCi.getId().toString())
        );
    }

    /**
     * {@code GET  /consommation-cis} : get all the consommationCis.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of consommationCis in body.
     */
    @GetMapping("/consommation-cis")
    public List<ConsommationCi> getAllConsommationCis() {
        log.debug("REST request to get all ConsommationCis");
        return consommationCiService.findAll();
    }

    /**
     * {@code GET  /consommation-cis/:id} : get the "id" consommationCi.
     *
     * @param id the id of the consommationCi to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the consommationCi, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/consommation-cis/{id}")
    public ResponseEntity<ConsommationCi> getConsommationCi(@PathVariable Long id) {
        log.debug("REST request to get ConsommationCi : {}", id);
        Optional<ConsommationCi> consommationCi = consommationCiService.findOne(id);
        return ResponseUtil.wrapOrNotFound(consommationCi);
    }

    /**
     * {@code DELETE  /consommation-cis/:id} : delete the "id" consommationCi.
     *
     * @param id the id of the consommationCi to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/consommation-cis/{id}")
    public ResponseEntity<Void> deleteConsommationCi(@PathVariable Long id) {
        log.debug("REST request to delete ConsommationCi : {}", id);
        consommationCiService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
