package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.StrategiePchE;
import fr.tixou.archisolver.repository.StrategiePchERepository;
import fr.tixou.archisolver.service.StrategiePchEService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link StrategiePchE}.
 */
@Service
@Transactional
public class StrategiePchEServiceImpl implements StrategiePchEService {

    private final Logger log = LoggerFactory.getLogger(StrategiePchEServiceImpl.class);

    private final StrategiePchERepository strategiePchERepository;

    public StrategiePchEServiceImpl(StrategiePchERepository strategiePchERepository) {
        this.strategiePchERepository = strategiePchERepository;
    }

    @Override
    public StrategiePchE save(StrategiePchE strategiePchE) {
        log.debug("Request to save StrategiePchE : {}", strategiePchE);
        return strategiePchERepository.save(strategiePchE);
    }

    @Override
    public Optional<StrategiePchE> partialUpdate(StrategiePchE strategiePchE) {
        log.debug("Request to partially update StrategiePchE : {}", strategiePchE);

        return strategiePchERepository
            .findById(strategiePchE.getId())
            .map(existingStrategiePchE -> {
                if (strategiePchE.getIsActif() != null) {
                    existingStrategiePchE.setIsActif(strategiePchE.getIsActif());
                }
                if (strategiePchE.getAnne() != null) {
                    existingStrategiePchE.setAnne(strategiePchE.getAnne());
                }
                if (strategiePchE.getMontantPlafond() != null) {
                    existingStrategiePchE.setMontantPlafond(strategiePchE.getMontantPlafond());
                }
                if (strategiePchE.getNbPlafondheure() != null) {
                    existingStrategiePchE.setNbPlafondheure(strategiePchE.getNbPlafondheure());
                }
                if (strategiePchE.getTaux() != null) {
                    existingStrategiePchE.setTaux(strategiePchE.getTaux());
                }

                return existingStrategiePchE;
            })
            .map(strategiePchERepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<StrategiePchE> findAll() {
        log.debug("Request to get all StrategiePchES");
        return strategiePchERepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<StrategiePchE> findOne(Long id) {
        log.debug("Request to get StrategiePchE : {}", id);
        return strategiePchERepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete StrategiePchE : {}", id);
        strategiePchERepository.deleteById(id);
    }
}
