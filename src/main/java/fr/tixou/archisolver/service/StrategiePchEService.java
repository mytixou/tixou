package fr.tixou.archisolver.service;

import fr.tixou.archisolver.domain.StrategiePchE;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link StrategiePchE}.
 */
public interface StrategiePchEService {
    /**
     * Save a strategiePchE.
     *
     * @param strategiePchE the entity to save.
     * @return the persisted entity.
     */
    StrategiePchE save(StrategiePchE strategiePchE);

    /**
     * Partially updates a strategiePchE.
     *
     * @param strategiePchE the entity to update partially.
     * @return the persisted entity.
     */
    Optional<StrategiePchE> partialUpdate(StrategiePchE strategiePchE);

    /**
     * Get all the strategiePchES.
     *
     * @return the list of entities.
     */
    List<StrategiePchE> findAll();

    /**
     * Get the "id" strategiePchE.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<StrategiePchE> findOne(Long id);

    /**
     * Delete the "id" strategiePchE.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
