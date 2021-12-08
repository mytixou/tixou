package fr.tixou.archisolver.web.rest;

import fr.tixou.archisolver.domain.Commanditaire;
import fr.tixou.archisolver.repository.CommanditaireRepository;
import fr.tixou.archisolver.service.CommanditaireService;
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
 * REST controller for managing {@link fr.tixou.archisolver.domain.Commanditaire}.
 */
@RestController
@RequestMapping("/api")
public class CommanditaireResource {

    private final Logger log = LoggerFactory.getLogger(CommanditaireResource.class);

    private static final String ENTITY_NAME = "commanditaire";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CommanditaireService commanditaireService;

    private final CommanditaireRepository commanditaireRepository;

    public CommanditaireResource(CommanditaireService commanditaireService, CommanditaireRepository commanditaireRepository) {
        this.commanditaireService = commanditaireService;
        this.commanditaireRepository = commanditaireRepository;
    }

    /**
     * {@code POST  /commanditaires} : Create a new commanditaire.
     *
     * @param commanditaire the commanditaire to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new commanditaire, or with status {@code 400 (Bad Request)} if the commanditaire has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/commanditaires")
    public ResponseEntity<Commanditaire> createCommanditaire(@RequestBody Commanditaire commanditaire) throws URISyntaxException {
        log.debug("REST request to save Commanditaire : {}", commanditaire);
        if (commanditaire.getId() != null) {
            throw new BadRequestAlertException("A new commanditaire cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Commanditaire result = commanditaireService.save(commanditaire);
        return ResponseEntity
            .created(new URI("/api/commanditaires/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /commanditaires/:id} : Updates an existing commanditaire.
     *
     * @param id the id of the commanditaire to save.
     * @param commanditaire the commanditaire to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated commanditaire,
     * or with status {@code 400 (Bad Request)} if the commanditaire is not valid,
     * or with status {@code 500 (Internal Server Error)} if the commanditaire couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/commanditaires/{id}")
    public ResponseEntity<Commanditaire> updateCommanditaire(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Commanditaire commanditaire
    ) throws URISyntaxException {
        log.debug("REST request to update Commanditaire : {}, {}", id, commanditaire);
        if (commanditaire.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, commanditaire.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!commanditaireRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Commanditaire result = commanditaireService.save(commanditaire);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, commanditaire.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /commanditaires/:id} : Partial updates given fields of an existing commanditaire, field will ignore if it is null
     *
     * @param id the id of the commanditaire to save.
     * @param commanditaire the commanditaire to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated commanditaire,
     * or with status {@code 400 (Bad Request)} if the commanditaire is not valid,
     * or with status {@code 404 (Not Found)} if the commanditaire is not found,
     * or with status {@code 500 (Internal Server Error)} if the commanditaire couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/commanditaires/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Commanditaire> partialUpdateCommanditaire(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Commanditaire commanditaire
    ) throws URISyntaxException {
        log.debug("REST request to partial update Commanditaire partially : {}, {}", id, commanditaire);
        if (commanditaire.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, commanditaire.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!commanditaireRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Commanditaire> result = commanditaireService.partialUpdate(commanditaire);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, commanditaire.getId().toString())
        );
    }

    /**
     * {@code GET  /commanditaires} : get all the commanditaires.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of commanditaires in body.
     */
    @GetMapping("/commanditaires")
    public List<Commanditaire> getAllCommanditaires() {
        log.debug("REST request to get all Commanditaires");
        return commanditaireService.findAll();
    }

    /**
     * {@code GET  /commanditaires/:id} : get the "id" commanditaire.
     *
     * @param id the id of the commanditaire to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the commanditaire, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/commanditaires/{id}")
    public ResponseEntity<Commanditaire> getCommanditaire(@PathVariable Long id) {
        log.debug("REST request to get Commanditaire : {}", id);
        Optional<Commanditaire> commanditaire = commanditaireService.findOne(id);
        return ResponseUtil.wrapOrNotFound(commanditaire);
    }

    /**
     * {@code DELETE  /commanditaires/:id} : delete the "id" commanditaire.
     *
     * @param id the id of the commanditaire to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/commanditaires/{id}")
    public ResponseEntity<Void> deleteCommanditaire(@PathVariable Long id) {
        log.debug("REST request to delete Commanditaire : {}", id);
        commanditaireService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
