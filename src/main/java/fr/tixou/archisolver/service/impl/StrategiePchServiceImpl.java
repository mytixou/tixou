package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.StrategiePch;
import fr.tixou.archisolver.repository.StrategiePchRepository;
import fr.tixou.archisolver.service.StrategiePchService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link StrategiePch}.
 */
@Service
@Transactional
public class StrategiePchServiceImpl implements StrategiePchService {

    private final Logger log = LoggerFactory.getLogger(StrategiePchServiceImpl.class);

    private final StrategiePchRepository strategiePchRepository;

    public StrategiePchServiceImpl(StrategiePchRepository strategiePchRepository) {
        this.strategiePchRepository = strategiePchRepository;
    }

    @Override
    public StrategiePch save(StrategiePch strategiePch) {
        log.debug("Request to save StrategiePch : {}", strategiePch);
        return strategiePchRepository.save(strategiePch);
    }

    @Override
    public Optional<StrategiePch> partialUpdate(StrategiePch strategiePch) {
        log.debug("Request to partially update StrategiePch : {}", strategiePch);

        return strategiePchRepository
            .findById(strategiePch.getId())
            .map(existingStrategiePch -> {
                if (strategiePch.getIsActif() != null) {
                    existingStrategiePch.setIsActif(strategiePch.getIsActif());
                }
                if (strategiePch.getAnne() != null) {
                    existingStrategiePch.setAnne(strategiePch.getAnne());
                }
                if (strategiePch.getMontantPlafond() != null) {
                    existingStrategiePch.setMontantPlafond(strategiePch.getMontantPlafond());
                }
                if (strategiePch.getNbPlafondheure() != null) {
                    existingStrategiePch.setNbPlafondheure(strategiePch.getNbPlafondheure());
                }
                if (strategiePch.getTaux() != null) {
                    existingStrategiePch.setTaux(strategiePch.getTaux());
                }

                return existingStrategiePch;
            })
            .map(strategiePchRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<StrategiePch> findAll() {
        log.debug("Request to get all StrategiePches");
        return strategiePchRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<StrategiePch> findOne(Long id) {
        log.debug("Request to get StrategiePch : {}", id);
        return strategiePchRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete StrategiePch : {}", id);
        strategiePchRepository.deleteById(id);
    }
}
