package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.NatureMontant;
import fr.tixou.archisolver.repository.NatureMontantRepository;
import fr.tixou.archisolver.service.NatureMontantService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link NatureMontant}.
 */
@Service
@Transactional
public class NatureMontantServiceImpl implements NatureMontantService {

    private final Logger log = LoggerFactory.getLogger(NatureMontantServiceImpl.class);

    private final NatureMontantRepository natureMontantRepository;

    public NatureMontantServiceImpl(NatureMontantRepository natureMontantRepository) {
        this.natureMontantRepository = natureMontantRepository;
    }

    @Override
    public NatureMontant save(NatureMontant natureMontant) {
        log.debug("Request to save NatureMontant : {}", natureMontant);
        return natureMontantRepository.save(natureMontant);
    }

    @Override
    public Optional<NatureMontant> partialUpdate(NatureMontant natureMontant) {
        log.debug("Request to partially update NatureMontant : {}", natureMontant);

        return natureMontantRepository
            .findById(natureMontant.getId())
            .map(existingNatureMontant -> {
                if (natureMontant.getCode() != null) {
                    existingNatureMontant.setCode(natureMontant.getCode());
                }
                if (natureMontant.getLibelle() != null) {
                    existingNatureMontant.setLibelle(natureMontant.getLibelle());
                }
                if (natureMontant.getDescription() != null) {
                    existingNatureMontant.setDescription(natureMontant.getDescription());
                }

                return existingNatureMontant;
            })
            .map(natureMontantRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<NatureMontant> findAll() {
        log.debug("Request to get all NatureMontants");
        return natureMontantRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<NatureMontant> findOne(Long id) {
        log.debug("Request to get NatureMontant : {}", id);
        return natureMontantRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete NatureMontant : {}", id);
        natureMontantRepository.deleteById(id);
    }
}
