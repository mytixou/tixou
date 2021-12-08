package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.TiersFinanceur;
import fr.tixou.archisolver.repository.TiersFinanceurRepository;
import fr.tixou.archisolver.service.TiersFinanceurService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link TiersFinanceur}.
 */
@Service
@Transactional
public class TiersFinanceurServiceImpl implements TiersFinanceurService {

    private final Logger log = LoggerFactory.getLogger(TiersFinanceurServiceImpl.class);

    private final TiersFinanceurRepository tiersFinanceurRepository;

    public TiersFinanceurServiceImpl(TiersFinanceurRepository tiersFinanceurRepository) {
        this.tiersFinanceurRepository = tiersFinanceurRepository;
    }

    @Override
    public TiersFinanceur save(TiersFinanceur tiersFinanceur) {
        log.debug("Request to save TiersFinanceur : {}", tiersFinanceur);
        return tiersFinanceurRepository.save(tiersFinanceur);
    }

    @Override
    public Optional<TiersFinanceur> partialUpdate(TiersFinanceur tiersFinanceur) {
        log.debug("Request to partially update TiersFinanceur : {}", tiersFinanceur);

        return tiersFinanceurRepository
            .findById(tiersFinanceur.getId())
            .map(existingTiersFinanceur -> {
                if (tiersFinanceur.getNom() != null) {
                    existingTiersFinanceur.setNom(tiersFinanceur.getNom());
                }
                if (tiersFinanceur.getLocalisation() != null) {
                    existingTiersFinanceur.setLocalisation(tiersFinanceur.getLocalisation());
                }
                if (tiersFinanceur.getIsActif() != null) {
                    existingTiersFinanceur.setIsActif(tiersFinanceur.getIsActif());
                }
                if (tiersFinanceur.getDateInscription() != null) {
                    existingTiersFinanceur.setDateInscription(tiersFinanceur.getDateInscription());
                }
                if (tiersFinanceur.getAnneLancement() != null) {
                    existingTiersFinanceur.setAnneLancement(tiersFinanceur.getAnneLancement());
                }
                if (tiersFinanceur.getMoisLancement() != null) {
                    existingTiersFinanceur.setMoisLancement(tiersFinanceur.getMoisLancement());
                }
                if (tiersFinanceur.getDateResiliation() != null) {
                    existingTiersFinanceur.setDateResiliation(tiersFinanceur.getDateResiliation());
                }
                if (tiersFinanceur.getDerniereAnnee() != null) {
                    existingTiersFinanceur.setDerniereAnnee(tiersFinanceur.getDerniereAnnee());
                }
                if (tiersFinanceur.getDernierMois() != null) {
                    existingTiersFinanceur.setDernierMois(tiersFinanceur.getDernierMois());
                }

                return existingTiersFinanceur;
            })
            .map(tiersFinanceurRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TiersFinanceur> findAll() {
        log.debug("Request to get all TiersFinanceurs");
        return tiersFinanceurRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TiersFinanceur> findOne(Long id) {
        log.debug("Request to get TiersFinanceur : {}", id);
        return tiersFinanceurRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TiersFinanceur : {}", id);
        tiersFinanceurRepository.deleteById(id);
    }
}
