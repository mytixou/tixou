package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.Impact;
import fr.tixou.archisolver.repository.ImpactRepository;
import fr.tixou.archisolver.service.ImpactService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Impact}.
 */
@Service
@Transactional
public class ImpactServiceImpl implements ImpactService {

    private final Logger log = LoggerFactory.getLogger(ImpactServiceImpl.class);

    private final ImpactRepository impactRepository;

    public ImpactServiceImpl(ImpactRepository impactRepository) {
        this.impactRepository = impactRepository;
    }

    @Override
    public Impact save(Impact impact) {
        log.debug("Request to save Impact : {}", impact);
        return impactRepository.save(impact);
    }

    @Override
    public Optional<Impact> partialUpdate(Impact impact) {
        log.debug("Request to partially update Impact : {}", impact);

        return impactRepository
            .findById(impact.getId())
            .map(
                existingImpact -> {
                    if (impact.getDesignation() != null) {
                        existingImpact.setDesignation(impact.getDesignation());
                    }
                    if (impact.getExplication() != null) {
                        existingImpact.setExplication(impact.getExplication());
                    }
                    if (impact.getTypeImpact() != null) {
                        existingImpact.setTypeImpact(impact.getTypeImpact());
                    }

                    return existingImpact;
                }
            )
            .map(impactRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Impact> findAll() {
        log.debug("Request to get all Impacts");
        return impactRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Impact> findOne(Long id) {
        log.debug("Request to get Impact : {}", id);
        return impactRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Impact : {}", id);
        impactRepository.deleteById(id);
    }
}
