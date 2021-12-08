package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.SoldePch;
import fr.tixou.archisolver.repository.SoldePchRepository;
import fr.tixou.archisolver.service.SoldePchService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link SoldePch}.
 */
@Service
@Transactional
public class SoldePchServiceImpl implements SoldePchService {

    private final Logger log = LoggerFactory.getLogger(SoldePchServiceImpl.class);

    private final SoldePchRepository soldePchRepository;

    public SoldePchServiceImpl(SoldePchRepository soldePchRepository) {
        this.soldePchRepository = soldePchRepository;
    }

    @Override
    public SoldePch save(SoldePch soldePch) {
        log.debug("Request to save SoldePch : {}", soldePch);
        return soldePchRepository.save(soldePch);
    }

    @Override
    public Optional<SoldePch> partialUpdate(SoldePch soldePch) {
        log.debug("Request to partially update SoldePch : {}", soldePch);

        return soldePchRepository
            .findById(soldePch.getId())
            .map(existingSoldePch -> {
                if (soldePch.getAnnee() != null) {
                    existingSoldePch.setAnnee(soldePch.getAnnee());
                }
                if (soldePch.getMois() != null) {
                    existingSoldePch.setMois(soldePch.getMois());
                }
                if (soldePch.getSoldeMontantPch() != null) {
                    existingSoldePch.setSoldeMontantPch(soldePch.getSoldeMontantPch());
                }
                if (soldePch.getSoldeHeurePch() != null) {
                    existingSoldePch.setSoldeHeurePch(soldePch.getSoldeHeurePch());
                }

                return existingSoldePch;
            })
            .map(soldePchRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SoldePch> findAll() {
        log.debug("Request to get all SoldePches");
        return soldePchRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<SoldePch> findOne(Long id) {
        log.debug("Request to get SoldePch : {}", id);
        return soldePchRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete SoldePch : {}", id);
        soldePchRepository.deleteById(id);
    }
}
