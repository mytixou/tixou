package fr.tixou.archisolver.service;

import fr.tixou.archisolver.domain.StrategieApa;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link StrategieApa}.
 */
public interface StrategieApaService {
    /**
     * Save a strategieApa.
     *
     * @param strategieApa the entity to save.
     * @return the persisted entity.
     */
    StrategieApa save(StrategieApa strategieApa);

    /**
     * Partially updates a strategieApa.
     *
     * @param strategieApa the entity to update partially.
     * @return the persisted entity.
     */
    Optional<StrategieApa> partialUpdate(StrategieApa strategieApa);

    /**
     * Get all the strategieApas.
     *
     * @return the list of entities.
     */
    List<StrategieApa> findAll();

    /**
     * Get the "id" strategieApa.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<StrategieApa> findOne(Long id);

    /**
     * Delete the "id" strategieApa.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
