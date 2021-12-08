package fr.tixou.archisolver.service;

import fr.tixou.archisolver.domain.Beneficiaire;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Beneficiaire}.
 */
public interface BeneficiaireService {
    /**
     * Save a beneficiaire.
     *
     * @param beneficiaire the entity to save.
     * @return the persisted entity.
     */
    Beneficiaire save(Beneficiaire beneficiaire);

    /**
     * Partially updates a beneficiaire.
     *
     * @param beneficiaire the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Beneficiaire> partialUpdate(Beneficiaire beneficiaire);

    /**
     * Get all the beneficiaires.
     *
     * @return the list of entities.
     */
    List<Beneficiaire> findAll();

    /**
     * Get the "id" beneficiaire.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Beneficiaire> findOne(String id);

    /**
     * Delete the "id" beneficiaire.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
