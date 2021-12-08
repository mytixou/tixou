package fr.tixou.archisolver.web.rest;

import fr.tixou.archisolver.domain.TiersFinanceur;
import fr.tixou.archisolver.repository.TiersFinanceurRepository;
import fr.tixou.archisolver.service.TiersFinanceurService;
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
 * REST controller for managing {@link fr.tixou.archisolver.domain.TiersFinanceur}.
 */
@RestController
@RequestMapping("/api")
public class TiersFinanceurResource {

    private final Logger log = LoggerFactory.getLogger(TiersFinanceurResource.class);

    private static final String ENTITY_NAME = "tiersFinanceur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TiersFinanceurService tiersFinanceurService;

    private final TiersFinanceurRepository tiersFinanceurRepository;

    public TiersFinanceurResource(TiersFinanceurService tiersFinanceurService, TiersFinanceurRepository tiersFinanceurRepository) {
        this.tiersFinanceurService = tiersFinanceurService;
        this.tiersFinanceurRepository = tiersFinanceurRepository;
    }

    /**
     * {@code POST  /tiers-financeurs} : Create a new tiersFinanceur.
     *
     * @param tiersFinanceur the tiersFinanceur to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tiersFinanceur, or with status {@code 400 (Bad Request)} if the tiersFinanceur has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tiers-financeurs")
    public ResponseEntity<TiersFinanceur> createTiersFinanceur(@RequestBody TiersFinanceur tiersFinanceur) throws URISyntaxException {
        log.debug("REST request to save TiersFinanceur : {}", tiersFinanceur);
        if (tiersFinanceur.getId() != null) {
            throw new BadRequestAlertException("A new tiersFinanceur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TiersFinanceur result = tiersFinanceurService.save(tiersFinanceur);
        return ResponseEntity
            .created(new URI("/api/tiers-financeurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tiers-financeurs/:id} : Updates an existing tiersFinanceur.
     *
     * @param id the id of the tiersFinanceur to save.
     * @param tiersFinanceur the tiersFinanceur to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tiersFinanceur,
     * or with status {@code 400 (Bad Request)} if the tiersFinanceur is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tiersFinanceur couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tiers-financeurs/{id}")
    public ResponseEntity<TiersFinanceur> updateTiersFinanceur(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TiersFinanceur tiersFinanceur
    ) throws URISyntaxException {
        log.debug("REST request to update TiersFinanceur : {}, {}", id, tiersFinanceur);
        if (tiersFinanceur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tiersFinanceur.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tiersFinanceurRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TiersFinanceur result = tiersFinanceurService.save(tiersFinanceur);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tiersFinanceur.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /tiers-financeurs/:id} : Partial updates given fields of an existing tiersFinanceur, field will ignore if it is null
     *
     * @param id the id of the tiersFinanceur to save.
     * @param tiersFinanceur the tiersFinanceur to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tiersFinanceur,
     * or with status {@code 400 (Bad Request)} if the tiersFinanceur is not valid,
     * or with status {@code 404 (Not Found)} if the tiersFinanceur is not found,
     * or with status {@code 500 (Internal Server Error)} if the tiersFinanceur couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/tiers-financeurs/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TiersFinanceur> partialUpdateTiersFinanceur(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TiersFinanceur tiersFinanceur
    ) throws URISyntaxException {
        log.debug("REST request to partial update TiersFinanceur partially : {}, {}", id, tiersFinanceur);
        if (tiersFinanceur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tiersFinanceur.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tiersFinanceurRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TiersFinanceur> result = tiersFinanceurService.partialUpdate(tiersFinanceur);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tiersFinanceur.getId().toString())
        );
    }

    /**
     * {@code GET  /tiers-financeurs} : get all the tiersFinanceurs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tiersFinanceurs in body.
     */
    @GetMapping("/tiers-financeurs")
    public List<TiersFinanceur> getAllTiersFinanceurs() {
        log.debug("REST request to get all TiersFinanceurs");
        return tiersFinanceurService.findAll();
    }

    /**
     * {@code GET  /tiers-financeurs/:id} : get the "id" tiersFinanceur.
     *
     * @param id the id of the tiersFinanceur to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tiersFinanceur, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tiers-financeurs/{id}")
    public ResponseEntity<TiersFinanceur> getTiersFinanceur(@PathVariable Long id) {
        log.debug("REST request to get TiersFinanceur : {}", id);
        Optional<TiersFinanceur> tiersFinanceur = tiersFinanceurService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tiersFinanceur);
    }

    /**
     * {@code DELETE  /tiers-financeurs/:id} : delete the "id" tiersFinanceur.
     *
     * @param id the id of the tiersFinanceur to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tiers-financeurs/{id}")
    public ResponseEntity<Void> deleteTiersFinanceur(@PathVariable Long id) {
        log.debug("REST request to delete TiersFinanceur : {}", id);
        tiersFinanceurService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
