package fr.tixou.archisolver.service;

import fr.tixou.archisolver.domain.TiersFinanceur;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link TiersFinanceur}.
 */
public interface TiersFinanceurService {
    /**
     * Save a tiersFinanceur.
     *
     * @param tiersFinanceur the entity to save.
     * @return the persisted entity.
     */
    TiersFinanceur save(TiersFinanceur tiersFinanceur);

    /**
     * Partially updates a tiersFinanceur.
     *
     * @param tiersFinanceur the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TiersFinanceur> partialUpdate(TiersFinanceur tiersFinanceur);

    /**
     * Get all the tiersFinanceurs.
     *
     * @return the list of entities.
     */
    List<TiersFinanceur> findAll();

    /**
     * Get the "id" tiersFinanceur.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TiersFinanceur> findOne(Long id);

    /**
     * Delete the "id" tiersFinanceur.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
