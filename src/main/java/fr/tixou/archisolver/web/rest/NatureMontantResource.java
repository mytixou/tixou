package fr.tixou.archisolver.web.rest;

import fr.tixou.archisolver.domain.NatureMontant;
import fr.tixou.archisolver.repository.NatureMontantRepository;
import fr.tixou.archisolver.service.NatureMontantService;
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
 * REST controller for managing {@link fr.tixou.archisolver.domain.NatureMontant}.
 */
@RestController
@RequestMapping("/api")
public class NatureMontantResource {

    private final Logger log = LoggerFactory.getLogger(NatureMontantResource.class);

    private static final String ENTITY_NAME = "natureMontant";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NatureMontantService natureMontantService;

    private final NatureMontantRepository natureMontantRepository;

    public NatureMontantResource(NatureMontantService natureMontantService, NatureMontantRepository natureMontantRepository) {
        this.natureMontantService = natureMontantService;
        this.natureMontantRepository = natureMontantRepository;
    }

    /**
     * {@code POST  /nature-montants} : Create a new natureMontant.
     *
     * @param natureMontant the natureMontant to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new natureMontant, or with status {@code 400 (Bad Request)} if the natureMontant has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/nature-montants")
    public ResponseEntity<NatureMontant> createNatureMontant(@RequestBody NatureMontant natureMontant) throws URISyntaxException {
        log.debug("REST request to save NatureMontant : {}", natureMontant);
        if (natureMontant.getId() != null) {
            throw new BadRequestAlertException("A new natureMontant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NatureMontant result = natureMontantService.save(natureMontant);
        return ResponseEntity
            .created(new URI("/api/nature-montants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /nature-montants/:id} : Updates an existing natureMontant.
     *
     * @param id the id of the natureMontant to save.
     * @param natureMontant the natureMontant to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated natureMontant,
     * or with status {@code 400 (Bad Request)} if the natureMontant is not valid,
     * or with status {@code 500 (Internal Server Error)} if the natureMontant couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/nature-montants/{id}")
    public ResponseEntity<NatureMontant> updateNatureMontant(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody NatureMontant natureMontant
    ) throws URISyntaxException {
        log.debug("REST request to update NatureMontant : {}, {}", id, natureMontant);
        if (natureMontant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, natureMontant.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!natureMontantRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        NatureMontant result = natureMontantService.save(natureMontant);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, natureMontant.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /nature-montants/:id} : Partial updates given fields of an existing natureMontant, field will ignore if it is null
     *
     * @param id the id of the natureMontant to save.
     * @param natureMontant the natureMontant to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated natureMontant,
     * or with status {@code 400 (Bad Request)} if the natureMontant is not valid,
     * or with status {@code 404 (Not Found)} if the natureMontant is not found,
     * or with status {@code 500 (Internal Server Error)} if the natureMontant couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/nature-montants/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<NatureMontant> partialUpdateNatureMontant(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody NatureMontant natureMontant
    ) throws URISyntaxException {
        log.debug("REST request to partial update NatureMontant partially : {}, {}", id, natureMontant);
        if (natureMontant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, natureMontant.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!natureMontantRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<NatureMontant> result = natureMontantService.partialUpdate(natureMontant);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, natureMontant.getId().toString())
        );
    }

    /**
     * {@code GET  /nature-montants} : get all the natureMontants.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of natureMontants in body.
     */
    @GetMapping("/nature-montants")
    public List<NatureMontant> getAllNatureMontants() {
        log.debug("REST request to get all NatureMontants");
        return natureMontantService.findAll();
    }

    /**
     * {@code GET  /nature-montants/:id} : get the "id" natureMontant.
     *
     * @param id the id of the natureMontant to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the natureMontant, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/nature-montants/{id}")
    public ResponseEntity<NatureMontant> getNatureMontant(@PathVariable Long id) {
        log.debug("REST request to get NatureMontant : {}", id);
        Optional<NatureMontant> natureMontant = natureMontantService.findOne(id);
        return ResponseUtil.wrapOrNotFound(natureMontant);
    }

    /**
     * {@code DELETE  /nature-montants/:id} : delete the "id" natureMontant.
     *
     * @param id the id of the natureMontant to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/nature-montants/{id}")
    public ResponseEntity<Void> deleteNatureMontant(@PathVariable Long id) {
        log.debug("REST request to delete NatureMontant : {}", id);
        natureMontantService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
