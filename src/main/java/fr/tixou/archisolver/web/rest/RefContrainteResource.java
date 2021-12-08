package fr.tixou.archisolver.web.rest;

import fr.tixou.archisolver.domain.RefContrainte;
import fr.tixou.archisolver.repository.RefContrainteRepository;
import fr.tixou.archisolver.service.RefContrainteService;
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
 * REST controller for managing {@link fr.tixou.archisolver.domain.RefContrainte}.
 */
@RestController
@RequestMapping("/api")
public class RefContrainteResource {

    private final Logger log = LoggerFactory.getLogger(RefContrainteResource.class);

    private static final String ENTITY_NAME = "refContrainte";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RefContrainteService refContrainteService;

    private final RefContrainteRepository refContrainteRepository;

    public RefContrainteResource(RefContrainteService refContrainteService, RefContrainteRepository refContrainteRepository) {
        this.refContrainteService = refContrainteService;
        this.refContrainteRepository = refContrainteRepository;
    }

    /**
     * {@code POST  /ref-contraintes} : Create a new refContrainte.
     *
     * @param refContrainte the refContrainte to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new refContrainte, or with status {@code 400 (Bad Request)} if the refContrainte has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ref-contraintes")
    public ResponseEntity<RefContrainte> createRefContrainte(@RequestBody RefContrainte refContrainte) throws URISyntaxException {
        log.debug("REST request to save RefContrainte : {}", refContrainte);
        if (refContrainte.getId() != null) {
            throw new BadRequestAlertException("A new refContrainte cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RefContrainte result = refContrainteService.save(refContrainte);
        return ResponseEntity
            .created(new URI("/api/ref-contraintes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ref-contraintes/:id} : Updates an existing refContrainte.
     *
     * @param id the id of the refContrainte to save.
     * @param refContrainte the refContrainte to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated refContrainte,
     * or with status {@code 400 (Bad Request)} if the refContrainte is not valid,
     * or with status {@code 500 (Internal Server Error)} if the refContrainte couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ref-contraintes/{id}")
    public ResponseEntity<RefContrainte> updateRefContrainte(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody RefContrainte refContrainte
    ) throws URISyntaxException {
        log.debug("REST request to update RefContrainte : {}, {}", id, refContrainte);
        if (refContrainte.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, refContrainte.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!refContrainteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        RefContrainte result = refContrainteService.save(refContrainte);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, refContrainte.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ref-contraintes/:id} : Partial updates given fields of an existing refContrainte, field will ignore if it is null
     *
     * @param id the id of the refContrainte to save.
     * @param refContrainte the refContrainte to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated refContrainte,
     * or with status {@code 400 (Bad Request)} if the refContrainte is not valid,
     * or with status {@code 404 (Not Found)} if the refContrainte is not found,
     * or with status {@code 500 (Internal Server Error)} if the refContrainte couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/ref-contraintes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<RefContrainte> partialUpdateRefContrainte(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody RefContrainte refContrainte
    ) throws URISyntaxException {
        log.debug("REST request to partial update RefContrainte partially : {}, {}", id, refContrainte);
        if (refContrainte.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, refContrainte.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!refContrainteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<RefContrainte> result = refContrainteService.partialUpdate(refContrainte);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, refContrainte.getId().toString())
        );
    }

    /**
     * {@code GET  /ref-contraintes} : get all the refContraintes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of refContraintes in body.
     */
    @GetMapping("/ref-contraintes")
    public List<RefContrainte> getAllRefContraintes() {
        log.debug("REST request to get all RefContraintes");
        return refContrainteService.findAll();
    }

    /**
     * {@code GET  /ref-contraintes/:id} : get the "id" refContrainte.
     *
     * @param id the id of the refContrainte to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the refContrainte, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ref-contraintes/{id}")
    public ResponseEntity<RefContrainte> getRefContrainte(@PathVariable Long id) {
        log.debug("REST request to get RefContrainte : {}", id);
        Optional<RefContrainte> refContrainte = refContrainteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(refContrainte);
    }

    /**
     * {@code DELETE  /ref-contraintes/:id} : delete the "id" refContrainte.
     *
     * @param id the id of the refContrainte to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ref-contraintes/{id}")
    public ResponseEntity<Void> deleteRefContrainte(@PathVariable Long id) {
        log.debug("REST request to delete RefContrainte : {}", id);
        refContrainteService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
