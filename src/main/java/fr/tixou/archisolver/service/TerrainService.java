package fr.tixou.archisolver.service;

import fr.tixou.archisolver.domain.Terrain;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Terrain}.
 */
public interface TerrainService {
    /**
     * Save a terrain.
     *
     * @param terrain the entity to save.
     * @return the persisted entity.
     */
    Terrain save(Terrain terrain);

    /**
     * Partially updates a terrain.
     *
     * @param terrain the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Terrain> partialUpdate(Terrain terrain);

    /**
     * Get all the terrains.
     *
     * @return the list of entities.
     */
    List<Terrain> findAll();

    /**
     * Get the "id" terrain.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Terrain> findOne(Long id);

    /**
     * Delete the "id" terrain.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
