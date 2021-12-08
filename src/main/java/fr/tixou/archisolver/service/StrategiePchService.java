package fr.tixou.archisolver.service;

import fr.tixou.archisolver.domain.StrategiePch;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link StrategiePch}.
 */
public interface StrategiePchService {
    /**
     * Save a strategiePch.
     *
     * @param strategiePch the entity to save.
     * @return the persisted entity.
     */
    StrategiePch save(StrategiePch strategiePch);

    /**
     * Partially updates a strategiePch.
     *
     * @param strategiePch the entity to update partially.
     * @return the persisted entity.
     */
    Optional<StrategiePch> partialUpdate(StrategiePch strategiePch);

    /**
     * Get all the strategiePches.
     *
     * @return the list of entities.
     */
    List<StrategiePch> findAll();

    /**
     * Get the "id" strategiePch.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<StrategiePch> findOne(Long id);

    /**
     * Delete the "id" strategiePch.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
