package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.SoldeApa;
import fr.tixou.archisolver.repository.SoldeApaRepository;
import fr.tixou.archisolver.service.SoldeApaService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link SoldeApa}.
 */
@Service
@Transactional
public class SoldeApaServiceImpl implements SoldeApaService {

    private final Logger log = LoggerFactory.getLogger(SoldeApaServiceImpl.class);

    private final SoldeApaRepository soldeApaRepository;

    public SoldeApaServiceImpl(SoldeApaRepository soldeApaRepository) {
        this.soldeApaRepository = soldeApaRepository;
    }

    @Override
    public SoldeApa save(SoldeApa soldeApa) {
        log.debug("Request to save SoldeApa : {}", soldeApa);
        return soldeApaRepository.save(soldeApa);
    }

    @Override
    public Optional<SoldeApa> partialUpdate(SoldeApa soldeApa) {
        log.debug("Request to partially update SoldeApa : {}", soldeApa);

        return soldeApaRepository
            .findById(soldeApa.getId())
            .map(existingSoldeApa -> {
                if (soldeApa.getAnnee() != null) {
                    existingSoldeApa.setAnnee(soldeApa.getAnnee());
                }
                if (soldeApa.getMois() != null) {
                    existingSoldeApa.setMois(soldeApa.getMois());
                }
                if (soldeApa.getSoldeMontantApa() != null) {
                    existingSoldeApa.setSoldeMontantApa(soldeApa.getSoldeMontantApa());
                }
                if (soldeApa.getSoldeHeureApa() != null) {
                    existingSoldeApa.setSoldeHeureApa(soldeApa.getSoldeHeureApa());
                }

                return existingSoldeApa;
            })
            .map(soldeApaRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SoldeApa> findAll() {
        log.debug("Request to get all SoldeApas");
        return soldeApaRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<SoldeApa> findOne(Long id) {
        log.debug("Request to get SoldeApa : {}", id);
        return soldeApaRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete SoldeApa : {}", id);
        soldeApaRepository.deleteById(id);
    }
}
