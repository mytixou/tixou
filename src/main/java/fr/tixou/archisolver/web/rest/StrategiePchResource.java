package fr.tixou.archisolver.web.rest;

import fr.tixou.archisolver.domain.StrategiePch;
import fr.tixou.archisolver.repository.StrategiePchRepository;
import fr.tixou.archisolver.service.StrategiePchService;
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
 * REST controller for managing {@link fr.tixou.archisolver.domain.StrategiePch}.
 */
@RestController
@RequestMapping("/api")
public class StrategiePchResource {

    private final Logger log = LoggerFactory.getLogger(StrategiePchResource.class);

    private static final String ENTITY_NAME = "strategiePch";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StrategiePchService strategiePchService;

    private final StrategiePchRepository strategiePchRepository;

    public StrategiePchResource(StrategiePchService strategiePchService, StrategiePchRepository strategiePchRepository) {
        this.strategiePchService = strategiePchService;
        this.strategiePchRepository = strategiePchRepository;
    }

    /**
     * {@code POST  /strategie-pches} : Create a new strategiePch.
     *
     * @param strategiePch the strategiePch to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new strategiePch, or with status {@code 400 (Bad Request)} if the strategiePch has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/strategie-pches")
    public ResponseEntity<StrategiePch> createStrategiePch(@RequestBody StrategiePch strategiePch) throws URISyntaxException {
        log.debug("REST request to save StrategiePch : {}", strategiePch);
        if (strategiePch.getId() != null) {
            throw new BadRequestAlertException("A new strategiePch cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StrategiePch result = strategiePchService.save(strategiePch);
        return ResponseEntity
            .created(new URI("/api/strategie-pches/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /strategie-pches/:id} : Updates an existing strategiePch.
     *
     * @param id the id of the strategiePch to save.
     * @param strategiePch the strategiePch to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated strategiePch,
     * or with status {@code 400 (Bad Request)} if the strategiePch is not valid,
     * or with status {@code 500 (Internal Server Error)} if the strategiePch couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/strategie-pches/{id}")
    public ResponseEntity<StrategiePch> updateStrategiePch(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody StrategiePch strategiePch
    ) throws URISyntaxException {
        log.debug("REST request to update StrategiePch : {}, {}", id, strategiePch);
        if (strategiePch.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, strategiePch.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!strategiePchRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        StrategiePch result = strategiePchService.save(strategiePch);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, strategiePch.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /strategie-pches/:id} : Partial updates given fields of an existing strategiePch, field will ignore if it is null
     *
     * @param id the id of the strategiePch to save.
     * @param strategiePch the strategiePch to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated strategiePch,
     * or with status {@code 400 (Bad Request)} if the strategiePch is not valid,
     * or with status {@code 404 (Not Found)} if the strategiePch is not found,
     * or with status {@code 500 (Internal Server Error)} if the strategiePch couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/strategie-pches/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<StrategiePch> partialUpdateStrategiePch(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody StrategiePch strategiePch
    ) throws URISyntaxException {
        log.debug("REST request to partial update StrategiePch partially : {}, {}", id, strategiePch);
        if (strategiePch.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, strategiePch.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!strategiePchRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<StrategiePch> result = strategiePchService.partialUpdate(strategiePch);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, strategiePch.getId().toString())
        );
    }

    /**
     * {@code GET  /strategie-pches} : get all the strategiePches.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of strategiePches in body.
     */
    @GetMapping("/strategie-pches")
    public List<StrategiePch> getAllStrategiePches() {
        log.debug("REST request to get all StrategiePches");
        return strategiePchService.findAll();
    }

    /**
     * {@code GET  /strategie-pches/:id} : get the "id" strategiePch.
     *
     * @param id the id of the strategiePch to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the strategiePch, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/strategie-pches/{id}")
    public ResponseEntity<StrategiePch> getStrategiePch(@PathVariable Long id) {
        log.debug("REST request to get StrategiePch : {}", id);
        Optional<StrategiePch> strategiePch = strategiePchService.findOne(id);
        return ResponseUtil.wrapOrNotFound(strategiePch);
    }

    /**
     * {@code DELETE  /strategie-pches/:id} : delete the "id" strategiePch.
     *
     * @param id the id of the strategiePch to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/strategie-pches/{id}")
    public ResponseEntity<Void> deleteStrategiePch(@PathVariable Long id) {
        log.debug("REST request to delete StrategiePch : {}", id);
        strategiePchService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
