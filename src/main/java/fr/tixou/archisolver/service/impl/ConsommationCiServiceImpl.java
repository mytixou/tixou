package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.ConsommationCi;
import fr.tixou.archisolver.repository.ConsommationCiRepository;
import fr.tixou.archisolver.service.ConsommationCiService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ConsommationCi}.
 */
@Service
@Transactional
public class ConsommationCiServiceImpl implements ConsommationCiService {

    private final Logger log = LoggerFactory.getLogger(ConsommationCiServiceImpl.class);

    private final ConsommationCiRepository consommationCiRepository;

    public ConsommationCiServiceImpl(ConsommationCiRepository consommationCiRepository) {
        this.consommationCiRepository = consommationCiRepository;
    }

    @Override
    public ConsommationCi save(ConsommationCi consommationCi) {
        log.debug("Request to save ConsommationCi : {}", consommationCi);
        return consommationCiRepository.save(consommationCi);
    }

    @Override
    public Optional<ConsommationCi> partialUpdate(ConsommationCi consommationCi) {
        log.debug("Request to partially update ConsommationCi : {}", consommationCi);

        return consommationCiRepository
            .findById(consommationCi.getId())
            .map(existingConsommationCi -> {
                if (consommationCi.getDate() != null) {
                    existingConsommationCi.setDate(consommationCi.getDate());
                }
                if (consommationCi.getMontantCi() != null) {
                    existingConsommationCi.setMontantCi(consommationCi.getMontantCi());
                }
                if (consommationCi.getMontantRecuperable() != null) {
                    existingConsommationCi.setMontantRecuperable(consommationCi.getMontantRecuperable());
                }

                return existingConsommationCi;
            })
            .map(consommationCiRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ConsommationCi> findAll() {
        log.debug("Request to get all ConsommationCis");
        return consommationCiRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ConsommationCi> findOne(Long id) {
        log.debug("Request to get ConsommationCi : {}", id);
        return consommationCiRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ConsommationCi : {}", id);
        consommationCiRepository.deleteById(id);
    }
}
