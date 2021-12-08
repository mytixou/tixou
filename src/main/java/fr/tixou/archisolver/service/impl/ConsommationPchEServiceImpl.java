package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.ConsommationPchE;
import fr.tixou.archisolver.repository.ConsommationPchERepository;
import fr.tixou.archisolver.service.ConsommationPchEService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ConsommationPchE}.
 */
@Service
@Transactional
public class ConsommationPchEServiceImpl implements ConsommationPchEService {

    private final Logger log = LoggerFactory.getLogger(ConsommationPchEServiceImpl.class);

    private final ConsommationPchERepository consommationPchERepository;

    public ConsommationPchEServiceImpl(ConsommationPchERepository consommationPchERepository) {
        this.consommationPchERepository = consommationPchERepository;
    }

    @Override
    public ConsommationPchE save(ConsommationPchE consommationPchE) {
        log.debug("Request to save ConsommationPchE : {}", consommationPchE);
        return consommationPchERepository.save(consommationPchE);
    }

    @Override
    public Optional<ConsommationPchE> partialUpdate(ConsommationPchE consommationPchE) {
        log.debug("Request to partially update ConsommationPchE : {}", consommationPchE);

        return consommationPchERepository
            .findById(consommationPchE.getId())
            .map(existingConsommationPchE -> {
                if (consommationPchE.getDate() != null) {
                    existingConsommationPchE.setDate(consommationPchE.getDate());
                }
                if (consommationPchE.getMontantCotisations() != null) {
                    existingConsommationPchE.setMontantCotisations(consommationPchE.getMontantCotisations());
                }
                if (consommationPchE.getNbHeures() != null) {
                    existingConsommationPchE.setNbHeures(consommationPchE.getNbHeures());
                }

                return existingConsommationPchE;
            })
            .map(consommationPchERepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ConsommationPchE> findAll() {
        log.debug("Request to get all ConsommationPchES");
        return consommationPchERepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ConsommationPchE> findOne(Long id) {
        log.debug("Request to get ConsommationPchE : {}", id);
        return consommationPchERepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ConsommationPchE : {}", id);
        consommationPchERepository.deleteById(id);
    }
}
