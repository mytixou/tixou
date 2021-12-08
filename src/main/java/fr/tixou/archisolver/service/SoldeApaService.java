package fr.tixou.archisolver.service;

import fr.tixou.archisolver.domain.SoldeApa;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link SoldeApa}.
 */
public interface SoldeApaService {
    /**
     * Save a soldeApa.
     *
     * @param soldeApa the entity to save.
     * @return the persisted entity.
     */
    SoldeApa save(SoldeApa soldeApa);

    /**
     * Partially updates a soldeApa.
     *
     * @param soldeApa the entity to update partially.
     * @return the persisted entity.
     */
    Optional<SoldeApa> partialUpdate(SoldeApa soldeApa);

    /**
     * Get all the soldeApas.
     *
     * @return the list of entities.
     */
    List<SoldeApa> findAll();

    /**
     * Get the "id" soldeApa.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SoldeApa> findOne(Long id);

    /**
     * Delete the "id" soldeApa.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
