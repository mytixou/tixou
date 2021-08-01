package fr.tixou.archisolver.service;

import fr.tixou.archisolver.domain.Adresse;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Adresse}.
 */
public interface AdresseService {
    /**
     * Save a adresse.
     *
     * @param adresse the entity to save.
     * @return the persisted entity.
     */
    Adresse save(Adresse adresse);

    /**
     * Partially updates a adresse.
     *
     * @param adresse the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Adresse> partialUpdate(Adresse adresse);

    /**
     * Get all the adresses.
     *
     * @return the list of entities.
     */
    List<Adresse> findAll();

    /**
     * Get the "id" adresse.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Adresse> findOne(Long id);

    /**
     * Delete the "id" adresse.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
