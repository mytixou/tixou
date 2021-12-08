package fr.tixou.archisolver.service;

import fr.tixou.archisolver.domain.NatureActivite;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link NatureActivite}.
 */
public interface NatureActiviteService {
    /**
     * Save a natureActivite.
     *
     * @param natureActivite the entity to save.
     * @return the persisted entity.
     */
    NatureActivite save(NatureActivite natureActivite);

    /**
     * Partially updates a natureActivite.
     *
     * @param natureActivite the entity to update partially.
     * @return the persisted entity.
     */
    Optional<NatureActivite> partialUpdate(NatureActivite natureActivite);

    /**
     * Get all the natureActivites.
     *
     * @return the list of entities.
     */
    List<NatureActivite> findAll();

    /**
     * Get the "id" natureActivite.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<NatureActivite> findOne(Long id);

    /**
     * Delete the "id" natureActivite.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
