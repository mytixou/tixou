package fr.tixou.archisolver.service;

import fr.tixou.archisolver.domain.NatureMontant;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link NatureMontant}.
 */
public interface NatureMontantService {
    /**
     * Save a natureMontant.
     *
     * @param natureMontant the entity to save.
     * @return the persisted entity.
     */
    NatureMontant save(NatureMontant natureMontant);

    /**
     * Partially updates a natureMontant.
     *
     * @param natureMontant the entity to update partially.
     * @return the persisted entity.
     */
    Optional<NatureMontant> partialUpdate(NatureMontant natureMontant);

    /**
     * Get all the natureMontants.
     *
     * @return the list of entities.
     */
    List<NatureMontant> findAll();

    /**
     * Get the "id" natureMontant.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<NatureMontant> findOne(Long id);

    /**
     * Delete the "id" natureMontant.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
