package fr.tixou.archisolver.service;

import fr.tixou.archisolver.domain.StrategieCi;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link StrategieCi}.
 */
public interface StrategieCiService {
    /**
     * Save a strategieCi.
     *
     * @param strategieCi the entity to save.
     * @return the persisted entity.
     */
    StrategieCi save(StrategieCi strategieCi);

    /**
     * Partially updates a strategieCi.
     *
     * @param strategieCi the entity to update partially.
     * @return the persisted entity.
     */
    Optional<StrategieCi> partialUpdate(StrategieCi strategieCi);

    /**
     * Get all the strategieCis.
     *
     * @return the list of entities.
     */
    List<StrategieCi> findAll();

    /**
     * Get the "id" strategieCi.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<StrategieCi> findOne(Long id);

    /**
     * Delete the "id" strategieCi.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
