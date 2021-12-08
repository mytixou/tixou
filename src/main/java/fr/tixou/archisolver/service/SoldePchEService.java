package fr.tixou.archisolver.service;

import fr.tixou.archisolver.domain.SoldePchE;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link SoldePchE}.
 */
public interface SoldePchEService {
    /**
     * Save a soldePchE.
     *
     * @param soldePchE the entity to save.
     * @return the persisted entity.
     */
    SoldePchE save(SoldePchE soldePchE);

    /**
     * Partially updates a soldePchE.
     *
     * @param soldePchE the entity to update partially.
     * @return the persisted entity.
     */
    Optional<SoldePchE> partialUpdate(SoldePchE soldePchE);

    /**
     * Get all the soldePchES.
     *
     * @return the list of entities.
     */
    List<SoldePchE> findAll();

    /**
     * Get the "id" soldePchE.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SoldePchE> findOne(Long id);

    /**
     * Delete the "id" soldePchE.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
