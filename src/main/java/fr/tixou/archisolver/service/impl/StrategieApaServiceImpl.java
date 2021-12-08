package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.StrategieApa;
import fr.tixou.archisolver.repository.StrategieApaRepository;
import fr.tixou.archisolver.service.StrategieApaService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link StrategieApa}.
 */
@Service
@Transactional
public class StrategieApaServiceImpl implements StrategieApaService {

    private final Logger log = LoggerFactory.getLogger(StrategieApaServiceImpl.class);

    private final StrategieApaRepository strategieApaRepository;

    public StrategieApaServiceImpl(StrategieApaRepository strategieApaRepository) {
        this.strategieApaRepository = strategieApaRepository;
    }

    @Override
    public StrategieApa save(StrategieApa strategieApa) {
        log.debug("Request to save StrategieApa : {}", strategieApa);
        return strategieApaRepository.save(strategieApa);
    }

    @Override
    public Optional<StrategieApa> partialUpdate(StrategieApa strategieApa) {
        log.debug("Request to partially update StrategieApa : {}", strategieApa);

        return strategieApaRepository
            .findById(strategieApa.getId())
            .map(existingStrategieApa -> {
                if (strategieApa.getIsActif() != null) {
                    existingStrategieApa.setIsActif(strategieApa.getIsActif());
                }
                if (strategieApa.getAnne() != null) {
                    existingStrategieApa.setAnne(strategieApa.getAnne());
                }
                if (strategieApa.getMontantPlafond() != null) {
                    existingStrategieApa.setMontantPlafond(strategieApa.getMontantPlafond());
                }
                if (strategieApa.getNbPlafondheure() != null) {
                    existingStrategieApa.setNbPlafondheure(strategieApa.getNbPlafondheure());
                }
                if (strategieApa.getTaux() != null) {
                    existingStrategieApa.setTaux(strategieApa.getTaux());
                }

                return existingStrategieApa;
            })
            .map(strategieApaRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<StrategieApa> findAll() {
        log.debug("Request to get all StrategieApas");
        return strategieApaRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<StrategieApa> findOne(Long id) {
        log.debug("Request to get StrategieApa : {}", id);
        return strategieApaRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete StrategieApa : {}", id);
        strategieApaRepository.deleteById(id);
    }
}
