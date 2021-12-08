package fr.tixou.archisolver.service;

import fr.tixou.archisolver.domain.ConsommationPchE;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link ConsommationPchE}.
 */
public interface ConsommationPchEService {
    /**
     * Save a consommationPchE.
     *
     * @param consommationPchE the entity to save.
     * @return the persisted entity.
     */
    ConsommationPchE save(ConsommationPchE consommationPchE);

    /**
     * Partially updates a consommationPchE.
     *
     * @param consommationPchE the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ConsommationPchE> partialUpdate(ConsommationPchE consommationPchE);

    /**
     * Get all the consommationPchES.
     *
     * @return the list of entities.
     */
    List<ConsommationPchE> findAll();

    /**
     * Get the "id" consommationPchE.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ConsommationPchE> findOne(Long id);

    /**
     * Delete the "id" consommationPchE.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
