package fr.tixou.archisolver.service;

import fr.tixou.archisolver.domain.ChoixReponse;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link ChoixReponse}.
 */
public interface ChoixReponseService {
    /**
     * Save a choixReponse.
     *
     * @param choixReponse the entity to save.
     * @return the persisted entity.
     */
    ChoixReponse save(ChoixReponse choixReponse);

    /**
     * Partially updates a choixReponse.
     *
     * @param choixReponse the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ChoixReponse> partialUpdate(ChoixReponse choixReponse);

    /**
     * Get all the choixReponses.
     *
     * @return the list of entities.
     */
    List<ChoixReponse> findAll();

    /**
     * Get the "id" choixReponse.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ChoixReponse> findOne(Long id);

    /**
     * Delete the "id" choixReponse.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
