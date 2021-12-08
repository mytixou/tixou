package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.StrategieCi;
import fr.tixou.archisolver.repository.StrategieCiRepository;
import fr.tixou.archisolver.service.StrategieCiService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link StrategieCi}.
 */
@Service
@Transactional
public class StrategieCiServiceImpl implements StrategieCiService {

    private final Logger log = LoggerFactory.getLogger(StrategieCiServiceImpl.class);

    private final StrategieCiRepository strategieCiRepository;

    public StrategieCiServiceImpl(StrategieCiRepository strategieCiRepository) {
        this.strategieCiRepository = strategieCiRepository;
    }

    @Override
    public StrategieCi save(StrategieCi strategieCi) {
        log.debug("Request to save StrategieCi : {}", strategieCi);
        return strategieCiRepository.save(strategieCi);
    }

    @Override
    public Optional<StrategieCi> partialUpdate(StrategieCi strategieCi) {
        log.debug("Request to partially update StrategieCi : {}", strategieCi);

        return strategieCiRepository
            .findById(strategieCi.getId())
            .map(existingStrategieCi -> {
                if (strategieCi.getIsActif() != null) {
                    existingStrategieCi.setIsActif(strategieCi.getIsActif());
                }
                if (strategieCi.getAnne() != null) {
                    existingStrategieCi.setAnne(strategieCi.getAnne());
                }
                if (strategieCi.getMontantPlafond() != null) {
                    existingStrategieCi.setMontantPlafond(strategieCi.getMontantPlafond());
                }
                if (strategieCi.getTaux() != null) {
                    existingStrategieCi.setTaux(strategieCi.getTaux());
                }

                return existingStrategieCi;
            })
            .map(strategieCiRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<StrategieCi> findAll() {
        log.debug("Request to get all StrategieCis");
        return strategieCiRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<StrategieCi> findOne(Long id) {
        log.debug("Request to get StrategieCi : {}", id);
        return strategieCiRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete StrategieCi : {}", id);
        strategieCiRepository.deleteById(id);
    }
}
