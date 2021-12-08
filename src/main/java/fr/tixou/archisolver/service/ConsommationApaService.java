package fr.tixou.archisolver.service;

import fr.tixou.archisolver.domain.ConsommationApa;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link ConsommationApa}.
 */
public interface ConsommationApaService {
    /**
     * Save a consommationApa.
     *
     * @param consommationApa the entity to save.
     * @return the persisted entity.
     */
    ConsommationApa save(ConsommationApa consommationApa);

    /**
     * Partially updates a consommationApa.
     *
     * @param consommationApa the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ConsommationApa> partialUpdate(ConsommationApa consommationApa);

    /**
     * Get all the consommationApas.
     *
     * @return the list of entities.
     */
    List<ConsommationApa> findAll();

    /**
     * Get the "id" consommationApa.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ConsommationApa> findOne(Long id);

    /**
     * Delete the "id" consommationApa.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
