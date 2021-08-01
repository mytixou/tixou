package fr.tixou.archisolver.service;

import fr.tixou.archisolver.domain.Impact;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Impact}.
 */
public interface ImpactService {
    /**
     * Save a impact.
     *
     * @param impact the entity to save.
     * @return the persisted entity.
     */
    Impact save(Impact impact);

    /**
     * Partially updates a impact.
     *
     * @param impact the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Impact> partialUpdate(Impact impact);

    /**
     * Get all the impacts.
     *
     * @return the list of entities.
     */
    List<Impact> findAll();

    /**
     * Get the "id" impact.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Impact> findOne(Long id);

    /**
     * Delete the "id" impact.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
