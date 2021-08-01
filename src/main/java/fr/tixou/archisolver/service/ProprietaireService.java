package fr.tixou.archisolver.service;

import fr.tixou.archisolver.domain.Proprietaire;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Proprietaire}.
 */
public interface ProprietaireService {
    /**
     * Save a proprietaire.
     *
     * @param proprietaire the entity to save.
     * @return the persisted entity.
     */
    Proprietaire save(Proprietaire proprietaire);

    /**
     * Partially updates a proprietaire.
     *
     * @param proprietaire the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Proprietaire> partialUpdate(Proprietaire proprietaire);

    /**
     * Get all the proprietaires.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Proprietaire> findAll(Pageable pageable);

    /**
     * Get all the proprietaires with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Proprietaire> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" proprietaire.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Proprietaire> findOne(Long id);

    /**
     * Delete the "id" proprietaire.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
