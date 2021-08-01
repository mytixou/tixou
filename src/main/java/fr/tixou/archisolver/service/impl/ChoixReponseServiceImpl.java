package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.ChoixReponse;
import fr.tixou.archisolver.repository.ChoixReponseRepository;
import fr.tixou.archisolver.service.ChoixReponseService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ChoixReponse}.
 */
@Service
@Transactional
public class ChoixReponseServiceImpl implements ChoixReponseService {

    private final Logger log = LoggerFactory.getLogger(ChoixReponseServiceImpl.class);

    private final ChoixReponseRepository choixReponseRepository;

    public ChoixReponseServiceImpl(ChoixReponseRepository choixReponseRepository) {
        this.choixReponseRepository = choixReponseRepository;
    }

    @Override
    public ChoixReponse save(ChoixReponse choixReponse) {
        log.debug("Request to save ChoixReponse : {}", choixReponse);
        return choixReponseRepository.save(choixReponse);
    }

    @Override
    public Optional<ChoixReponse> partialUpdate(ChoixReponse choixReponse) {
        log.debug("Request to partially update ChoixReponse : {}", choixReponse);

        return choixReponseRepository
            .findById(choixReponse.getId())
            .map(
                existingChoixReponse -> {
                    if (choixReponse.getDateChoix() != null) {
                        existingChoixReponse.setDateChoix(choixReponse.getDateChoix());
                    }

                    return existingChoixReponse;
                }
            )
            .map(choixReponseRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChoixReponse> findAll() {
        log.debug("Request to get all ChoixReponses");
        return choixReponseRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ChoixReponse> findOne(Long id) {
        log.debug("Request to get ChoixReponse : {}", id);
        return choixReponseRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ChoixReponse : {}", id);
        choixReponseRepository.deleteById(id);
    }
}
