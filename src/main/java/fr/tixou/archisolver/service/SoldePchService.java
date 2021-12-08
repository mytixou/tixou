package fr.tixou.archisolver.service;

import fr.tixou.archisolver.domain.SoldePch;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link SoldePch}.
 */
public interface SoldePchService {
    /**
     * Save a soldePch.
     *
     * @param soldePch the entity to save.
     * @return the persisted entity.
     */
    SoldePch save(SoldePch soldePch);

    /**
     * Partially updates a soldePch.
     *
     * @param soldePch the entity to update partially.
     * @return the persisted entity.
     */
    Optional<SoldePch> partialUpdate(SoldePch soldePch);

    /**
     * Get all the soldePches.
     *
     * @return the list of entities.
     */
    List<SoldePch> findAll();

    /**
     * Get the "id" soldePch.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SoldePch> findOne(Long id);

    /**
     * Delete the "id" soldePch.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
