package fr.tixou.archisolver.service;

import fr.tixou.archisolver.domain.SoldeCi;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link SoldeCi}.
 */
public interface SoldeCiService {
    /**
     * Save a soldeCi.
     *
     * @param soldeCi the entity to save.
     * @return the persisted entity.
     */
    SoldeCi save(SoldeCi soldeCi);

    /**
     * Partially updates a soldeCi.
     *
     * @param soldeCi the entity to update partially.
     * @return the persisted entity.
     */
    Optional<SoldeCi> partialUpdate(SoldeCi soldeCi);

    /**
     * Get all the soldeCis.
     *
     * @return the list of entities.
     */
    List<SoldeCi> findAll();

    /**
     * Get the "id" soldeCi.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SoldeCi> findOne(Long id);

    /**
     * Delete the "id" soldeCi.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
