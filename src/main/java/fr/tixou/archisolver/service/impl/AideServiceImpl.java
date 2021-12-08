package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.Aide;
import fr.tixou.archisolver.repository.AideRepository;
import fr.tixou.archisolver.service.AideService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Aide}.
 */
@Service
@Transactional
public class AideServiceImpl implements AideService {

    private final Logger log = LoggerFactory.getLogger(AideServiceImpl.class);

    private final AideRepository aideRepository;

    public AideServiceImpl(AideRepository aideRepository) {
        this.aideRepository = aideRepository;
    }

    @Override
    public Aide save(Aide aide) {
        log.debug("Request to save Aide : {}", aide);
        return aideRepository.save(aide);
    }

    @Override
    public Optional<Aide> partialUpdate(Aide aide) {
        log.debug("Request to partially update Aide : {}", aide);

        return aideRepository
            .findById(aide.getId())
            .map(existingAide -> {
                if (aide.getNom() != null) {
                    existingAide.setNom(aide.getNom());
                }
                if (aide.getIsActif() != null) {
                    existingAide.setIsActif(aide.getIsActif());
                }
                if (aide.getDateLancement() != null) {
                    existingAide.setDateLancement(aide.getDateLancement());
                }
                if (aide.getAnneLancement() != null) {
                    existingAide.setAnneLancement(aide.getAnneLancement());
                }
                if (aide.getMoisLancement() != null) {
                    existingAide.setMoisLancement(aide.getMoisLancement());
                }
                if (aide.getDateArret() != null) {
                    existingAide.setDateArret(aide.getDateArret());
                }
                if (aide.getDerniereAnnee() != null) {
                    existingAide.setDerniereAnnee(aide.getDerniereAnnee());
                }
                if (aide.getDernierMois() != null) {
                    existingAide.setDernierMois(aide.getDernierMois());
                }

                return existingAide;
            })
            .map(aideRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Aide> findAll() {
        log.debug("Request to get all Aides");
        return aideRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Aide> findOne(Long id) {
        log.debug("Request to get Aide : {}", id);
        return aideRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Aide : {}", id);
        aideRepository.deleteById(id);
    }
}
