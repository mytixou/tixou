package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.Proprietaire;
import fr.tixou.archisolver.repository.ProprietaireRepository;
import fr.tixou.archisolver.service.ProprietaireService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Proprietaire}.
 */
@Service
@Transactional
public class ProprietaireServiceImpl implements ProprietaireService {

    private final Logger log = LoggerFactory.getLogger(ProprietaireServiceImpl.class);

    private final ProprietaireRepository proprietaireRepository;

    public ProprietaireServiceImpl(ProprietaireRepository proprietaireRepository) {
        this.proprietaireRepository = proprietaireRepository;
    }

    @Override
    public Proprietaire save(Proprietaire proprietaire) {
        log.debug("Request to save Proprietaire : {}", proprietaire);
        return proprietaireRepository.save(proprietaire);
    }

    @Override
    public Optional<Proprietaire> partialUpdate(Proprietaire proprietaire) {
        log.debug("Request to partially update Proprietaire : {}", proprietaire);

        return proprietaireRepository
            .findById(proprietaire.getId())
            .map(
                existingProprietaire -> {
                    if (proprietaire.getPrenom() != null) {
                        existingProprietaire.setPrenom(proprietaire.getPrenom());
                    }
                    if (proprietaire.getNom() != null) {
                        existingProprietaire.setNom(proprietaire.getNom());
                    }
                    if (proprietaire.getEmail() != null) {
                        existingProprietaire.setEmail(proprietaire.getEmail());
                    }
                    if (proprietaire.getTelephoneFixe() != null) {
                        existingProprietaire.setTelephoneFixe(proprietaire.getTelephoneFixe());
                    }
                    if (proprietaire.getTelephonePortable() != null) {
                        existingProprietaire.setTelephonePortable(proprietaire.getTelephonePortable());
                    }
                    if (proprietaire.getDepuis() != null) {
                        existingProprietaire.setDepuis(proprietaire.getDepuis());
                    }
                    if (proprietaire.getHabiteLocal() != null) {
                        existingProprietaire.setHabiteLocal(proprietaire.getHabiteLocal());
                    }
                    if (proprietaire.getFinLe() != null) {
                        existingProprietaire.setFinLe(proprietaire.getFinLe());
                    }

                    return existingProprietaire;
                }
            )
            .map(proprietaireRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Proprietaire> findAll(Pageable pageable) {
        log.debug("Request to get all Proprietaires");
        return proprietaireRepository.findAll(pageable);
    }

    public Page<Proprietaire> findAllWithEagerRelationships(Pageable pageable) {
        return proprietaireRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Proprietaire> findOne(Long id) {
        log.debug("Request to get Proprietaire : {}", id);
        return proprietaireRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Proprietaire : {}", id);
        proprietaireRepository.deleteById(id);
    }
}
