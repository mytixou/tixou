package fr.tixou.archisolver.service;

import fr.tixou.archisolver.domain.RefContrainte;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link RefContrainte}.
 */
public interface RefContrainteService {
    /**
     * Save a refContrainte.
     *
     * @param refContrainte the entity to save.
     * @return the persisted entity.
     */
    RefContrainte save(RefContrainte refContrainte);

    /**
     * Partially updates a refContrainte.
     *
     * @param refContrainte the entity to update partially.
     * @return the persisted entity.
     */
    Optional<RefContrainte> partialUpdate(RefContrainte refContrainte);

    /**
     * Get all the refContraintes.
     *
     * @return the list of entities.
     */
    List<RefContrainte> findAll();

    /**
     * Get the "id" refContrainte.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RefContrainte> findOne(Long id);

    /**
     * Delete the "id" refContrainte.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
