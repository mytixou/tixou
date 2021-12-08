package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.RefContrainte;
import fr.tixou.archisolver.repository.RefContrainteRepository;
import fr.tixou.archisolver.service.RefContrainteService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link RefContrainte}.
 */
@Service
@Transactional
public class RefContrainteServiceImpl implements RefContrainteService {

    private final Logger log = LoggerFactory.getLogger(RefContrainteServiceImpl.class);

    private final RefContrainteRepository refContrainteRepository;

    public RefContrainteServiceImpl(RefContrainteRepository refContrainteRepository) {
        this.refContrainteRepository = refContrainteRepository;
    }

    @Override
    public RefContrainte save(RefContrainte refContrainte) {
        log.debug("Request to save RefContrainte : {}", refContrainte);
        return refContrainteRepository.save(refContrainte);
    }

    @Override
    public Optional<RefContrainte> partialUpdate(RefContrainte refContrainte) {
        log.debug("Request to partially update RefContrainte : {}", refContrainte);

        return refContrainteRepository
            .findById(refContrainte.getId())
            .map(existingRefContrainte -> {
                if (refContrainte.getDesignation() != null) {
                    existingRefContrainte.setDesignation(refContrainte.getDesignation());
                }
                if (refContrainte.getTypeContrainte() != null) {
                    existingRefContrainte.setTypeContrainte(refContrainte.getTypeContrainte());
                }
                if (refContrainte.getTypeDestination() != null) {
                    existingRefContrainte.setTypeDestination(refContrainte.getTypeDestination());
                }
                if (refContrainte.getExplication() != null) {
                    existingRefContrainte.setExplication(refContrainte.getExplication());
                }

                return existingRefContrainte;
            })
            .map(refContrainteRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RefContrainte> findAll() {
        log.debug("Request to get all RefContraintes");
        return refContrainteRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<RefContrainte> findOne(Long id) {
        log.debug("Request to get RefContrainte : {}", id);
        return refContrainteRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete RefContrainte : {}", id);
        refContrainteRepository.deleteById(id);
    }
}
