package fr.tixou.archisolver.web.rest;

import fr.tixou.archisolver.domain.SoldeCi;
import fr.tixou.archisolver.repository.SoldeCiRepository;
import fr.tixou.archisolver.service.SoldeCiService;
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
 * REST controller for managing {@link fr.tixou.archisolver.domain.SoldeCi}.
 */
@RestController
@RequestMapping("/api")
public class SoldeCiResource {

    private final Logger log = LoggerFactory.getLogger(SoldeCiResource.class);

    private static final String ENTITY_NAME = "soldeCi";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SoldeCiService soldeCiService;

    private final SoldeCiRepository soldeCiRepository;

    public SoldeCiResource(SoldeCiService soldeCiService, SoldeCiRepository soldeCiRepository) {
        this.soldeCiService = soldeCiService;
        this.soldeCiRepository = soldeCiRepository;
    }

    /**
     * {@code POST  /solde-cis} : Create a new soldeCi.
     *
     * @param soldeCi the soldeCi to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new soldeCi, or with status {@code 400 (Bad Request)} if the soldeCi has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/solde-cis")
    public ResponseEntity<SoldeCi> createSoldeCi(@RequestBody SoldeCi soldeCi) throws URISyntaxException {
        log.debug("REST request to save SoldeCi : {}", soldeCi);
        if (soldeCi.getId() != null) {
            throw new BadRequestAlertException("A new soldeCi cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SoldeCi result = soldeCiService.save(soldeCi);
        return ResponseEntity
            .created(new URI("/api/solde-cis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /solde-cis/:id} : Updates an existing soldeCi.
     *
     * @param id the id of the soldeCi to save.
     * @param soldeCi the soldeCi to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated soldeCi,
     * or with status {@code 400 (Bad Request)} if the soldeCi is not valid,
     * or with status {@code 500 (Internal Server Error)} if the soldeCi couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/solde-cis/{id}")
    public ResponseEntity<SoldeCi> updateSoldeCi(@PathVariable(value = "id", required = false) final Long id, @RequestBody SoldeCi soldeCi)
        throws URISyntaxException {
        log.debug("REST request to update SoldeCi : {}, {}", id, soldeCi);
        if (soldeCi.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, soldeCi.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!soldeCiRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        SoldeCi result = soldeCiService.save(soldeCi);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, soldeCi.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /solde-cis/:id} : Partial updates given fields of an existing soldeCi, field will ignore if it is null
     *
     * @param id the id of the soldeCi to save.
     * @param soldeCi the soldeCi to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated soldeCi,
     * or with status {@code 400 (Bad Request)} if the soldeCi is not valid,
     * or with status {@code 404 (Not Found)} if the soldeCi is not found,
     * or with status {@code 500 (Internal Server Error)} if the soldeCi couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/solde-cis/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SoldeCi> partialUpdateSoldeCi(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SoldeCi soldeCi
    ) throws URISyntaxException {
        log.debug("REST request to partial update SoldeCi partially : {}, {}", id, soldeCi);
        if (soldeCi.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, soldeCi.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!soldeCiRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SoldeCi> result = soldeCiService.partialUpdate(soldeCi);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, soldeCi.getId().toString())
        );
    }

    /**
     * {@code GET  /solde-cis} : get all the soldeCis.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of soldeCis in body.
     */
    @GetMapping("/solde-cis")
    public List<SoldeCi> getAllSoldeCis() {
        log.debug("REST request to get all SoldeCis");
        return soldeCiService.findAll();
    }

    /**
     * {@code GET  /solde-cis/:id} : get the "id" soldeCi.
     *
     * @param id the id of the soldeCi to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the soldeCi, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/solde-cis/{id}")
    public ResponseEntity<SoldeCi> getSoldeCi(@PathVariable Long id) {
        log.debug("REST request to get SoldeCi : {}", id);
        Optional<SoldeCi> soldeCi = soldeCiService.findOne(id);
        return ResponseUtil.wrapOrNotFound(soldeCi);
    }

    /**
     * {@code DELETE  /solde-cis/:id} : delete the "id" soldeCi.
     *
     * @param id the id of the soldeCi to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/solde-cis/{id}")
    public ResponseEntity<Void> deleteSoldeCi(@PathVariable Long id) {
        log.debug("REST request to delete SoldeCi : {}", id);
        soldeCiService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
