package fr.tixou.archisolver.web.rest;

import fr.tixou.archisolver.domain.SoldePch;
import fr.tixou.archisolver.repository.SoldePchRepository;
import fr.tixou.archisolver.service.SoldePchService;
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
 * REST controller for managing {@link fr.tixou.archisolver.domain.SoldePch}.
 */
@RestController
@RequestMapping("/api")
public class SoldePchResource {

    private final Logger log = LoggerFactory.getLogger(SoldePchResource.class);

    private static final String ENTITY_NAME = "soldePch";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SoldePchService soldePchService;

    private final SoldePchRepository soldePchRepository;

    public SoldePchResource(SoldePchService soldePchService, SoldePchRepository soldePchRepository) {
        this.soldePchService = soldePchService;
        this.soldePchRepository = soldePchRepository;
    }

    /**
     * {@code POST  /solde-pches} : Create a new soldePch.
     *
     * @param soldePch the soldePch to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new soldePch, or with status {@code 400 (Bad Request)} if the soldePch has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/solde-pches")
    public ResponseEntity<SoldePch> createSoldePch(@RequestBody SoldePch soldePch) throws URISyntaxException {
        log.debug("REST request to save SoldePch : {}", soldePch);
        if (soldePch.getId() != null) {
            throw new BadRequestAlertException("A new soldePch cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SoldePch result = soldePchService.save(soldePch);
        return ResponseEntity
            .created(new URI("/api/solde-pches/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /solde-pches/:id} : Updates an existing soldePch.
     *
     * @param id the id of the soldePch to save.
     * @param soldePch the soldePch to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated soldePch,
     * or with status {@code 400 (Bad Request)} if the soldePch is not valid,
     * or with status {@code 500 (Internal Server Error)} if the soldePch couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/solde-pches/{id}")
    public ResponseEntity<SoldePch> updateSoldePch(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SoldePch soldePch
    ) throws URISyntaxException {
        log.debug("REST request to update SoldePch : {}, {}", id, soldePch);
        if (soldePch.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, soldePch.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!soldePchRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        SoldePch result = soldePchService.save(soldePch);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, soldePch.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /solde-pches/:id} : Partial updates given fields of an existing soldePch, field will ignore if it is null
     *
     * @param id the id of the soldePch to save.
     * @param soldePch the soldePch to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated soldePch,
     * or with status {@code 400 (Bad Request)} if the soldePch is not valid,
     * or with status {@code 404 (Not Found)} if the soldePch is not found,
     * or with status {@code 500 (Internal Server Error)} if the soldePch couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/solde-pches/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SoldePch> partialUpdateSoldePch(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SoldePch soldePch
    ) throws URISyntaxException {
        log.debug("REST request to partial update SoldePch partially : {}, {}", id, soldePch);
        if (soldePch.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, soldePch.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!soldePchRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SoldePch> result = soldePchService.partialUpdate(soldePch);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, soldePch.getId().toString())
        );
    }

    /**
     * {@code GET  /solde-pches} : get all the soldePches.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of soldePches in body.
     */
    @GetMapping("/solde-pches")
    public List<SoldePch> getAllSoldePches() {
        log.debug("REST request to get all SoldePches");
        return soldePchService.findAll();
    }

    /**
     * {@code GET  /solde-pches/:id} : get the "id" soldePch.
     *
     * @param id the id of the soldePch to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the soldePch, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/solde-pches/{id}")
    public ResponseEntity<SoldePch> getSoldePch(@PathVariable Long id) {
        log.debug("REST request to get SoldePch : {}", id);
        Optional<SoldePch> soldePch = soldePchService.findOne(id);
        return ResponseUtil.wrapOrNotFound(soldePch);
    }

    /**
     * {@code DELETE  /solde-pches/:id} : delete the "id" soldePch.
     *
     * @param id the id of the soldePch to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/solde-pches/{id}")
    public ResponseEntity<Void> deleteSoldePch(@PathVariable Long id) {
        log.debug("REST request to delete SoldePch : {}", id);
        soldePchService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
