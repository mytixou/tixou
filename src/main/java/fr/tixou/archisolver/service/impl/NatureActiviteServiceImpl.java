package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.NatureActivite;
import fr.tixou.archisolver.repository.NatureActiviteRepository;
import fr.tixou.archisolver.service.NatureActiviteService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link NatureActivite}.
 */
@Service
@Transactional
public class NatureActiviteServiceImpl implements NatureActiviteService {

    private final Logger log = LoggerFactory.getLogger(NatureActiviteServiceImpl.class);

    private final NatureActiviteRepository natureActiviteRepository;

    public NatureActiviteServiceImpl(NatureActiviteRepository natureActiviteRepository) {
        this.natureActiviteRepository = natureActiviteRepository;
    }

    @Override
    public NatureActivite save(NatureActivite natureActivite) {
        log.debug("Request to save NatureActivite : {}", natureActivite);
        return natureActiviteRepository.save(natureActivite);
    }

    @Override
    public Optional<NatureActivite> partialUpdate(NatureActivite natureActivite) {
        log.debug("Request to partially update NatureActivite : {}", natureActivite);

        return natureActiviteRepository
            .findById(natureActivite.getId())
            .map(existingNatureActivite -> {
                if (natureActivite.getCode() != null) {
                    existingNatureActivite.setCode(natureActivite.getCode());
                }
                if (natureActivite.getLibelle() != null) {
                    existingNatureActivite.setLibelle(natureActivite.getLibelle());
                }
                if (natureActivite.getDescription() != null) {
                    existingNatureActivite.setDescription(natureActivite.getDescription());
                }

                return existingNatureActivite;
            })
            .map(natureActiviteRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<NatureActivite> findAll() {
        log.debug("Request to get all NatureActivites");
        return natureActiviteRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<NatureActivite> findOne(Long id) {
        log.debug("Request to get NatureActivite : {}", id);
        return natureActiviteRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete NatureActivite : {}", id);
        natureActiviteRepository.deleteById(id);
    }
}
