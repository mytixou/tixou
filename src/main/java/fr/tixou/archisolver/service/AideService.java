package fr.tixou.archisolver.service;

import fr.tixou.archisolver.domain.Aide;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Aide}.
 */
public interface AideService {
    /**
     * Save a aide.
     *
     * @param aide the entity to save.
     * @return the persisted entity.
     */
    Aide save(Aide aide);

    /**
     * Partially updates a aide.
     *
     * @param aide the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Aide> partialUpdate(Aide aide);

    /**
     * Get all the aides.
     *
     * @return the list of entities.
     */
    List<Aide> findAll();

    /**
     * Get the "id" aide.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Aide> findOne(Long id);

    /**
     * Delete the "id" aide.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
