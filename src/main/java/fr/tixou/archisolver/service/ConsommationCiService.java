package fr.tixou.archisolver.service;

import fr.tixou.archisolver.domain.ConsommationCi;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link ConsommationCi}.
 */
public interface ConsommationCiService {
    /**
     * Save a consommationCi.
     *
     * @param consommationCi the entity to save.
     * @return the persisted entity.
     */
    ConsommationCi save(ConsommationCi consommationCi);

    /**
     * Partially updates a consommationCi.
     *
     * @param consommationCi the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ConsommationCi> partialUpdate(ConsommationCi consommationCi);

    /**
     * Get all the consommationCis.
     *
     * @return the list of entities.
     */
    List<ConsommationCi> findAll();

    /**
     * Get the "id" consommationCi.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ConsommationCi> findOne(Long id);

    /**
     * Delete the "id" consommationCi.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
