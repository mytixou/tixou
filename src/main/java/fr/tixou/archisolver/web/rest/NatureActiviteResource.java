package fr.tixou.archisolver.web.rest;

import fr.tixou.archisolver.domain.NatureActivite;
import fr.tixou.archisolver.repository.NatureActiviteRepository;
import fr.tixou.archisolver.service.NatureActiviteService;
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
 * REST controller for managing {@link fr.tixou.archisolver.domain.NatureActivite}.
 */
@RestController
@RequestMapping("/api")
public class NatureActiviteResource {

    private final Logger log = LoggerFactory.getLogger(NatureActiviteResource.class);

    private static final String ENTITY_NAME = "natureActivite";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NatureActiviteService natureActiviteService;

    private final NatureActiviteRepository natureActiviteRepository;

    public NatureActiviteResource(NatureActiviteService natureActiviteService, NatureActiviteRepository natureActiviteRepository) {
        this.natureActiviteService = natureActiviteService;
        this.natureActiviteRepository = natureActiviteRepository;
    }

    /**
     * {@code POST  /nature-activites} : Create a new natureActivite.
     *
     * @param natureActivite the natureActivite to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new natureActivite, or with status {@code 400 (Bad Request)} if the natureActivite has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/nature-activites")
    public ResponseEntity<NatureActivite> createNatureActivite(@RequestBody NatureActivite natureActivite) throws URISyntaxException {
        log.debug("REST request to save NatureActivite : {}", natureActivite);
        if (natureActivite.getId() != null) {
            throw new BadRequestAlertException("A new natureActivite cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NatureActivite result = natureActiviteService.save(natureActivite);
        return ResponseEntity
            .created(new URI("/api/nature-activites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /nature-activites/:id} : Updates an existing natureActivite.
     *
     * @param id the id of the natureActivite to save.
     * @param natureActivite the natureActivite to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated natureActivite,
     * or with status {@code 400 (Bad Request)} if the natureActivite is not valid,
     * or with status {@code 500 (Internal Server Error)} if the natureActivite couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/nature-activites/{id}")
    public ResponseEntity<NatureActivite> updateNatureActivite(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody NatureActivite natureActivite
    ) throws URISyntaxException {
        log.debug("REST request to update NatureActivite : {}, {}", id, natureActivite);
        if (natureActivite.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, natureActivite.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!natureActiviteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        NatureActivite result = natureActiviteService.save(natureActivite);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, natureActivite.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /nature-activites/:id} : Partial updates given fields of an existing natureActivite, field will ignore if it is null
     *
     * @param id the id of the natureActivite to save.
     * @param natureActivite the natureActivite to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated natureActivite,
     * or with status {@code 400 (Bad Request)} if the natureActivite is not valid,
     * or with status {@code 404 (Not Found)} if the natureActivite is not found,
     * or with status {@code 500 (Internal Server Error)} if the natureActivite couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/nature-activites/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<NatureActivite> partialUpdateNatureActivite(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody NatureActivite natureActivite
    ) throws URISyntaxException {
        log.debug("REST request to partial update NatureActivite partially : {}, {}", id, natureActivite);
        if (natureActivite.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, natureActivite.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!natureActiviteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<NatureActivite> result = natureActiviteService.partialUpdate(natureActivite);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, natureActivite.getId().toString())
        );
    }

    /**
     * {@code GET  /nature-activites} : get all the natureActivites.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of natureActivites in body.
     */
    @GetMapping("/nature-activites")
    public List<NatureActivite> getAllNatureActivites() {
        log.debug("REST request to get all NatureActivites");
        return natureActiviteService.findAll();
    }

    /**
     * {@code GET  /nature-activites/:id} : get the "id" natureActivite.
     *
     * @param id the id of the natureActivite to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the natureActivite, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/nature-activites/{id}")
    public ResponseEntity<NatureActivite> getNatureActivite(@PathVariable Long id) {
        log.debug("REST request to get NatureActivite : {}", id);
        Optional<NatureActivite> natureActivite = natureActiviteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(natureActivite);
    }

    /**
     * {@code DELETE  /nature-activites/:id} : delete the "id" natureActivite.
     *
     * @param id the id of the natureActivite to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/nature-activites/{id}")
    public ResponseEntity<Void> deleteNatureActivite(@PathVariable Long id) {
        log.debug("REST request to delete NatureActivite : {}", id);
        natureActiviteService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
