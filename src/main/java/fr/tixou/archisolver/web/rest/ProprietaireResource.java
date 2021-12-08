package fr.tixou.archisolver.web.rest;

import fr.tixou.archisolver.domain.Proprietaire;
import fr.tixou.archisolver.repository.ProprietaireRepository;
import fr.tixou.archisolver.service.ProprietaireService;
import fr.tixou.archisolver.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link fr.tixou.archisolver.domain.Proprietaire}.
 */
@RestController
@RequestMapping("/api")
public class ProprietaireResource {

    private final Logger log = LoggerFactory.getLogger(ProprietaireResource.class);

    private static final String ENTITY_NAME = "proprietaire";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProprietaireService proprietaireService;

    private final ProprietaireRepository proprietaireRepository;

    public ProprietaireResource(ProprietaireService proprietaireService, ProprietaireRepository proprietaireRepository) {
        this.proprietaireService = proprietaireService;
        this.proprietaireRepository = proprietaireRepository;
    }

    /**
     * {@code POST  /proprietaires} : Create a new proprietaire.
     *
     * @param proprietaire the proprietaire to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new proprietaire, or with status {@code 400 (Bad Request)} if the proprietaire has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/proprietaires")
    public ResponseEntity<Proprietaire> createProprietaire(@RequestBody Proprietaire proprietaire) throws URISyntaxException {
        log.debug("REST request to save Proprietaire : {}", proprietaire);
        if (proprietaire.getId() != null) {
            throw new BadRequestAlertException("A new proprietaire cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Proprietaire result = proprietaireService.save(proprietaire);
        return ResponseEntity
            .created(new URI("/api/proprietaires/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /proprietaires/:id} : Updates an existing proprietaire.
     *
     * @param id the id of the proprietaire to save.
     * @param proprietaire the proprietaire to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated proprietaire,
     * or with status {@code 400 (Bad Request)} if the proprietaire is not valid,
     * or with status {@code 500 (Internal Server Error)} if the proprietaire couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/proprietaires/{id}")
    public ResponseEntity<Proprietaire> updateProprietaire(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Proprietaire proprietaire
    ) throws URISyntaxException {
        log.debug("REST request to update Proprietaire : {}, {}", id, proprietaire);
        if (proprietaire.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, proprietaire.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!proprietaireRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Proprietaire result = proprietaireService.save(proprietaire);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, proprietaire.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /proprietaires/:id} : Partial updates given fields of an existing proprietaire, field will ignore if it is null
     *
     * @param id the id of the proprietaire to save.
     * @param proprietaire the proprietaire to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated proprietaire,
     * or with status {@code 400 (Bad Request)} if the proprietaire is not valid,
     * or with status {@code 404 (Not Found)} if the proprietaire is not found,
     * or with status {@code 500 (Internal Server Error)} if the proprietaire couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/proprietaires/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Proprietaire> partialUpdateProprietaire(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Proprietaire proprietaire
    ) throws URISyntaxException {
        log.debug("REST request to partial update Proprietaire partially : {}, {}", id, proprietaire);
        if (proprietaire.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, proprietaire.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!proprietaireRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Proprietaire> result = proprietaireService.partialUpdate(proprietaire);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, proprietaire.getId().toString())
        );
    }

    /**
     * {@code GET  /proprietaires} : get all the proprietaires.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of proprietaires in body.
     */
    @GetMapping("/proprietaires")
    public ResponseEntity<List<Proprietaire>> getAllProprietaires(
        Pageable pageable,
        @RequestParam(required = false, defaultValue = "false") boolean eagerload
    ) {
        log.debug("REST request to get a page of Proprietaires");
        Page<Proprietaire> page;
        if (eagerload) {
            page = proprietaireService.findAllWithEagerRelationships(pageable);
        } else {
            page = proprietaireService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /proprietaires/:id} : get the "id" proprietaire.
     *
     * @param id the id of the proprietaire to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the proprietaire, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/proprietaires/{id}")
    public ResponseEntity<Proprietaire> getProprietaire(@PathVariable Long id) {
        log.debug("REST request to get Proprietaire : {}", id);
        Optional<Proprietaire> proprietaire = proprietaireService.findOne(id);
        return ResponseUtil.wrapOrNotFound(proprietaire);
    }

    /**
     * {@code DELETE  /proprietaires/:id} : delete the "id" proprietaire.
     *
     * @param id the id of the proprietaire to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/proprietaires/{id}")
    public ResponseEntity<Void> deleteProprietaire(@PathVariable Long id) {
        log.debug("REST request to delete Proprietaire : {}", id);
        proprietaireService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
