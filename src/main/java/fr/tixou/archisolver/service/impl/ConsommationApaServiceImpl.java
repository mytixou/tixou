package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.ConsommationApa;
import fr.tixou.archisolver.repository.ConsommationApaRepository;
import fr.tixou.archisolver.service.ConsommationApaService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ConsommationApa}.
 */
@Service
@Transactional
public class ConsommationApaServiceImpl implements ConsommationApaService {

    private final Logger log = LoggerFactory.getLogger(ConsommationApaServiceImpl.class);

    private final ConsommationApaRepository consommationApaRepository;

    public ConsommationApaServiceImpl(ConsommationApaRepository consommationApaRepository) {
        this.consommationApaRepository = consommationApaRepository;
    }

    @Override
    public ConsommationApa save(ConsommationApa consommationApa) {
        log.debug("Request to save ConsommationApa : {}", consommationApa);
        return consommationApaRepository.save(consommationApa);
    }

    @Override
    public Optional<ConsommationApa> partialUpdate(ConsommationApa consommationApa) {
        log.debug("Request to partially update ConsommationApa : {}", consommationApa);

        return consommationApaRepository
            .findById(consommationApa.getId())
            .map(existingConsommationApa -> {
                if (consommationApa.getDate() != null) {
                    existingConsommationApa.setDate(consommationApa.getDate());
                }
                if (consommationApa.getMontantCotisations() != null) {
                    existingConsommationApa.setMontantCotisations(consommationApa.getMontantCotisations());
                }
                if (consommationApa.getNbHeures() != null) {
                    existingConsommationApa.setNbHeures(consommationApa.getNbHeures());
                }

                return existingConsommationApa;
            })
            .map(consommationApaRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ConsommationApa> findAll() {
        log.debug("Request to get all ConsommationApas");
        return consommationApaRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ConsommationApa> findOne(Long id) {
        log.debug("Request to get ConsommationApa : {}", id);
        return consommationApaRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ConsommationApa : {}", id);
        consommationApaRepository.deleteById(id);
    }
}
