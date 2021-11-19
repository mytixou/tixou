package fr.tixou.archisolver.service;

import fr.tixou.archisolver.domain.Commanditaire;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Commanditaire}.
 */
public interface CommanditaireService {
    /**
     * Save a commanditaire.
     *
     * @param commanditaire the entity to save.
     * @return the persisted entity.
     */
    Commanditaire save(Commanditaire commanditaire);

    /**
     * Partially updates a commanditaire.
     *
     * @param commanditaire the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Commanditaire> partialUpdate(Commanditaire commanditaire);

    /**
     * Get all the commanditaires.
     *
     * @return the list of entities.
     */
    List<Commanditaire> findAll();

    /**
     * Get the "id" commanditaire.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Commanditaire> findOne(Long id);

    /**
     * Delete the "id" commanditaire.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
