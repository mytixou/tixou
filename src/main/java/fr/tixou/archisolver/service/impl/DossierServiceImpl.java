package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.Dossier;
import fr.tixou.archisolver.repository.DossierRepository;
import fr.tixou.archisolver.service.DossierService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Dossier}.
 */
@Service
@Transactional
public class DossierServiceImpl implements DossierService {

    private final Logger log = LoggerFactory.getLogger(DossierServiceImpl.class);

    private final DossierRepository dossierRepository;

    public DossierServiceImpl(DossierRepository dossierRepository) {
        this.dossierRepository = dossierRepository;
    }

    @Override
    public Dossier save(Dossier dossier) {
        log.debug("Request to save Dossier : {}", dossier);
        return dossierRepository.save(dossier);
    }

    @Override
    public Optional<Dossier> partialUpdate(Dossier dossier) {
        log.debug("Request to partially update Dossier : {}", dossier);

        return dossierRepository
            .findById(dossier.getId())
            .map(existingDossier -> {
                if (dossier.getDesignation() != null) {
                    existingDossier.setDesignation(dossier.getDesignation());
                }
                if (dossier.getDescription() != null) {
                    existingDossier.setDescription(dossier.getDescription());
                }
                if (dossier.getDateCreation() != null) {
                    existingDossier.setDateCreation(dossier.getDateCreation());
                }
                if (dossier.getDateCloture() != null) {
                    existingDossier.setDateCloture(dossier.getDateCloture());
                }

                return existingDossier;
            })
            .map(dossierRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Dossier> findAll() {
        log.debug("Request to get all Dossiers");
        return dossierRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Dossier> findOne(Long id) {
        log.debug("Request to get Dossier : {}", id);
        return dossierRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Dossier : {}", id);
        dossierRepository.deleteById(id);
    }
}
