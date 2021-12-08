package fr.tixou.archisolver.web.rest;

import fr.tixou.archisolver.domain.Aide;
import fr.tixou.archisolver.repository.AideRepository;
import fr.tixou.archisolver.service.AideService;
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
 * REST controller for managing {@link fr.tixou.archisolver.domain.Aide}.
 */
@RestController
@RequestMapping("/api")
public class AideResource {

    private final Logger log = LoggerFactory.getLogger(AideResource.class);

    private static final String ENTITY_NAME = "aide";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AideService aideService;

    private final AideRepository aideRepository;

    public AideResource(AideService aideService, AideRepository aideRepository) {
        this.aideService = aideService;
        this.aideRepository = aideRepository;
    }

    /**
     * {@code POST  /aides} : Create a new aide.
     *
     * @param aide the aide to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new aide, or with status {@code 400 (Bad Request)} if the aide has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/aides")
    public ResponseEntity<Aide> createAide(@RequestBody Aide aide) throws URISyntaxException {
        log.debug("REST request to save Aide : {}", aide);
        if (aide.getId() != null) {
            throw new BadRequestAlertException("A new aide cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Aide result = aideService.save(aide);
        return ResponseEntity
            .created(new URI("/api/aides/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /aides/:id} : Updates an existing aide.
     *
     * @param id the id of the aide to save.
     * @param aide the aide to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated aide,
     * or with status {@code 400 (Bad Request)} if the aide is not valid,
     * or with status {@code 500 (Internal Server Error)} if the aide couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/aides/{id}")
    public ResponseEntity<Aide> updateAide(@PathVariable(value = "id", required = false) final Long id, @RequestBody Aide aide)
        throws URISyntaxException {
        log.debug("REST request to update Aide : {}, {}", id, aide);
        if (aide.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, aide.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!aideRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Aide result = aideService.save(aide);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, aide.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /aides/:id} : Partial updates given fields of an existing aide, field will ignore if it is null
     *
     * @param id the id of the aide to save.
     * @param aide the aide to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated aide,
     * or with status {@code 400 (Bad Request)} if the aide is not valid,
     * or with status {@code 404 (Not Found)} if the aide is not found,
     * or with status {@code 500 (Internal Server Error)} if the aide couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/aides/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Aide> partialUpdateAide(@PathVariable(value = "id", required = false) final Long id, @RequestBody Aide aide)
        throws URISyntaxException {
        log.debug("REST request to partial update Aide partially : {}, {}", id, aide);
        if (aide.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, aide.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!aideRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Aide> result = aideService.partialUpdate(aide);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, aide.getId().toString())
        );
    }

    /**
     * {@code GET  /aides} : get all the aides.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of aides in body.
     */
    @GetMapping("/aides")
    public List<Aide> getAllAides() {
        log.debug("REST request to get all Aides");
        return aideService.findAll();
    }

    /**
     * {@code GET  /aides/:id} : get the "id" aide.
     *
     * @param id the id of the aide to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the aide, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/aides/{id}")
    public ResponseEntity<Aide> getAide(@PathVariable Long id) {
        log.debug("REST request to get Aide : {}", id);
        Optional<Aide> aide = aideService.findOne(id);
        return ResponseUtil.wrapOrNotFound(aide);
    }

    /**
     * {@code DELETE  /aides/:id} : delete the "id" aide.
     *
     * @param id the id of the aide to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/aides/{id}")
    public ResponseEntity<Void> deleteAide(@PathVariable Long id) {
        log.debug("REST request to delete Aide : {}", id);
        aideService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
