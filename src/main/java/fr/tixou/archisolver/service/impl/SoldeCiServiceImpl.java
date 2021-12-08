package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.SoldeCi;
import fr.tixou.archisolver.repository.SoldeCiRepository;
import fr.tixou.archisolver.service.SoldeCiService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link SoldeCi}.
 */
@Service
@Transactional
public class SoldeCiServiceImpl implements SoldeCiService {

    private final Logger log = LoggerFactory.getLogger(SoldeCiServiceImpl.class);

    private final SoldeCiRepository soldeCiRepository;

    public SoldeCiServiceImpl(SoldeCiRepository soldeCiRepository) {
        this.soldeCiRepository = soldeCiRepository;
    }

    @Override
    public SoldeCi save(SoldeCi soldeCi) {
        log.debug("Request to save SoldeCi : {}", soldeCi);
        return soldeCiRepository.save(soldeCi);
    }

    @Override
    public Optional<SoldeCi> partialUpdate(SoldeCi soldeCi) {
        log.debug("Request to partially update SoldeCi : {}", soldeCi);

        return soldeCiRepository
            .findById(soldeCi.getId())
            .map(existingSoldeCi -> {
                if (soldeCi.getAnnee() != null) {
                    existingSoldeCi.setAnnee(soldeCi.getAnnee());
                }
                if (soldeCi.getSoldeMontantCi() != null) {
                    existingSoldeCi.setSoldeMontantCi(soldeCi.getSoldeMontantCi());
                }
                if (soldeCi.getSoldeMontantCiRec() != null) {
                    existingSoldeCi.setSoldeMontantCiRec(soldeCi.getSoldeMontantCiRec());
                }

                return existingSoldeCi;
            })
            .map(soldeCiRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SoldeCi> findAll() {
        log.debug("Request to get all SoldeCis");
        return soldeCiRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<SoldeCi> findOne(Long id) {
        log.debug("Request to get SoldeCi : {}", id);
        return soldeCiRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete SoldeCi : {}", id);
        soldeCiRepository.deleteById(id);
    }
}
