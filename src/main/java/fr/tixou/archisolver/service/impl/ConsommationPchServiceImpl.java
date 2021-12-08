package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.ConsommationPch;
import fr.tixou.archisolver.repository.ConsommationPchRepository;
import fr.tixou.archisolver.service.ConsommationPchService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ConsommationPch}.
 */
@Service
@Transactional
public class ConsommationPchServiceImpl implements ConsommationPchService {

    private final Logger log = LoggerFactory.getLogger(ConsommationPchServiceImpl.class);

    private final ConsommationPchRepository consommationPchRepository;

    public ConsommationPchServiceImpl(ConsommationPchRepository consommationPchRepository) {
        this.consommationPchRepository = consommationPchRepository;
    }

    @Override
    public ConsommationPch save(ConsommationPch consommationPch) {
        log.debug("Request to save ConsommationPch : {}", consommationPch);
        return consommationPchRepository.save(consommationPch);
    }

    @Override
    public Optional<ConsommationPch> partialUpdate(ConsommationPch consommationPch) {
        log.debug("Request to partially update ConsommationPch : {}", consommationPch);

        return consommationPchRepository
            .findById(consommationPch.getId())
            .map(existingConsommationPch -> {
                if (consommationPch.getDate() != null) {
                    existingConsommationPch.setDate(consommationPch.getDate());
                }
                if (consommationPch.getMontantCotisations() != null) {
                    existingConsommationPch.setMontantCotisations(consommationPch.getMontantCotisations());
                }
                if (consommationPch.getNbHeures() != null) {
                    existingConsommationPch.setNbHeures(consommationPch.getNbHeures());
                }

                return existingConsommationPch;
            })
            .map(consommationPchRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ConsommationPch> findAll() {
        log.debug("Request to get all ConsommationPches");
        return consommationPchRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ConsommationPch> findOne(Long id) {
        log.debug("Request to get ConsommationPch : {}", id);
        return consommationPchRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ConsommationPch : {}", id);
        consommationPchRepository.deleteById(id);
    }
}
