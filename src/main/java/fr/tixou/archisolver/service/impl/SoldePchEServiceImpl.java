package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.SoldePchE;
import fr.tixou.archisolver.repository.SoldePchERepository;
import fr.tixou.archisolver.service.SoldePchEService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link SoldePchE}.
 */
@Service
@Transactional
public class SoldePchEServiceImpl implements SoldePchEService {

    private final Logger log = LoggerFactory.getLogger(SoldePchEServiceImpl.class);

    private final SoldePchERepository soldePchERepository;

    public SoldePchEServiceImpl(SoldePchERepository soldePchERepository) {
        this.soldePchERepository = soldePchERepository;
    }

    @Override
    public SoldePchE save(SoldePchE soldePchE) {
        log.debug("Request to save SoldePchE : {}", soldePchE);
        return soldePchERepository.save(soldePchE);
    }

    @Override
    public Optional<SoldePchE> partialUpdate(SoldePchE soldePchE) {
        log.debug("Request to partially update SoldePchE : {}", soldePchE);

        return soldePchERepository
            .findById(soldePchE.getId())
            .map(existingSoldePchE -> {
                if (soldePchE.getAnnee() != null) {
                    existingSoldePchE.setAnnee(soldePchE.getAnnee());
                }
                if (soldePchE.getMois() != null) {
                    existingSoldePchE.setMois(soldePchE.getMois());
                }
                if (soldePchE.getSoldeMontantPchE() != null) {
                    existingSoldePchE.setSoldeMontantPchE(soldePchE.getSoldeMontantPchE());
                }
                if (soldePchE.getSoldeHeurePchE() != null) {
                    existingSoldePchE.setSoldeHeurePchE(soldePchE.getSoldeHeurePchE());
                }

                return existingSoldePchE;
            })
            .map(soldePchERepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SoldePchE> findAll() {
        log.debug("Request to get all SoldePchES");
        return soldePchERepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<SoldePchE> findOne(Long id) {
        log.debug("Request to get SoldePchE : {}", id);
        return soldePchERepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete SoldePchE : {}", id);
        soldePchERepository.deleteById(id);
    }
}
