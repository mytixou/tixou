package fr.tixou.archisolver.service;

import fr.tixou.archisolver.domain.ConsommationPch;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link ConsommationPch}.
 */
public interface ConsommationPchService {
    /**
     * Save a consommationPch.
     *
     * @param consommationPch the entity to save.
     * @return the persisted entity.
     */
    ConsommationPch save(ConsommationPch consommationPch);

    /**
     * Partially updates a consommationPch.
     *
     * @param consommationPch the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ConsommationPch> partialUpdate(ConsommationPch consommationPch);

    /**
     * Get all the consommationPches.
     *
     * @return the list of entities.
     */
    List<ConsommationPch> findAll();

    /**
     * Get the "id" consommationPch.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ConsommationPch> findOne(Long id);

    /**
     * Delete the "id" consommationPch.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
