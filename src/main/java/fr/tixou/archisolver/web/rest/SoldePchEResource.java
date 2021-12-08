package fr.tixou.archisolver.web.rest;

import fr.tixou.archisolver.domain.SoldePchE;
import fr.tixou.archisolver.repository.SoldePchERepository;
import fr.tixou.archisolver.service.SoldePchEService;
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
 * REST controller for managing {@link fr.tixou.archisolver.domain.SoldePchE}.
 */
@RestController
@RequestMapping("/api")
public class SoldePchEResource {

    private final Logger log = LoggerFactory.getLogger(SoldePchEResource.class);

    private static final String ENTITY_NAME = "soldePchE";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SoldePchEService soldePchEService;

    private final SoldePchERepository soldePchERepository;

    public SoldePchEResource(SoldePchEService soldePchEService, SoldePchERepository soldePchERepository) {
        this.soldePchEService = soldePchEService;
        this.soldePchERepository = soldePchERepository;
    }

    /**
     * {@code POST  /solde-pch-es} : Create a new soldePchE.
     *
     * @param soldePchE the soldePchE to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new soldePchE, or with status {@code 400 (Bad Request)} if the soldePchE has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/solde-pch-es")
    public ResponseEntity<SoldePchE> createSoldePchE(@RequestBody SoldePchE soldePchE) throws URISyntaxException {
        log.debug("REST request to save SoldePchE : {}", soldePchE);
        if (soldePchE.getId() != null) {
            throw new BadRequestAlertException("A new soldePchE cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SoldePchE result = soldePchEService.save(soldePchE);
        return ResponseEntity
            .created(new URI("/api/solde-pch-es/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /solde-pch-es/:id} : Updates an existing soldePchE.
     *
     * @param id the id of the soldePchE to save.
     * @param soldePchE the soldePchE to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated soldePchE,
     * or with status {@code 400 (Bad Request)} if the soldePchE is not valid,
     * or with status {@code 500 (Internal Server Error)} if the soldePchE couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/solde-pch-es/{id}")
    public ResponseEntity<SoldePchE> updateSoldePchE(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SoldePchE soldePchE
    ) throws URISyntaxException {
        log.debug("REST request to update SoldePchE : {}, {}", id, soldePchE);
        if (soldePchE.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, soldePchE.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!soldePchERepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        SoldePchE result = soldePchEService.save(soldePchE);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, soldePchE.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /solde-pch-es/:id} : Partial updates given fields of an existing soldePchE, field will ignore if it is null
     *
     * @param id the id of the soldePchE to save.
     * @param soldePchE the soldePchE to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated soldePchE,
     * or with status {@code 400 (Bad Request)} if the soldePchE is not valid,
     * or with status {@code 404 (Not Found)} if the soldePchE is not found,
     * or with status {@code 500 (Internal Server Error)} if the soldePchE couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/solde-pch-es/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SoldePchE> partialUpdateSoldePchE(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SoldePchE soldePchE
    ) throws URISyntaxException {
        log.debug("REST request to partial update SoldePchE partially : {}, {}", id, soldePchE);
        if (soldePchE.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, soldePchE.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!soldePchERepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SoldePchE> result = soldePchEService.partialUpdate(soldePchE);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, soldePchE.getId().toString())
        );
    }

    /**
     * {@code GET  /solde-pch-es} : get all the soldePchES.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of soldePchES in body.
     */
    @GetMapping("/solde-pch-es")
    public List<SoldePchE> getAllSoldePchES() {
        log.debug("REST request to get all SoldePchES");
        return soldePchEService.findAll();
    }

    /**
     * {@code GET  /solde-pch-es/:id} : get the "id" soldePchE.
     *
     * @param id the id of the soldePchE to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the soldePchE, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/solde-pch-es/{id}")
    public ResponseEntity<SoldePchE> getSoldePchE(@PathVariable Long id) {
        log.debug("REST request to get SoldePchE : {}", id);
        Optional<SoldePchE> soldePchE = soldePchEService.findOne(id);
        return ResponseUtil.wrapOrNotFound(soldePchE);
    }

    /**
     * {@code DELETE  /solde-pch-es/:id} : delete the "id" soldePchE.
     *
     * @param id the id of the soldePchE to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/solde-pch-es/{id}")
    public ResponseEntity<Void> deleteSoldePchE(@PathVariable Long id) {
        log.debug("REST request to delete SoldePchE : {}", id);
        soldePchEService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
