package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.Local;
import fr.tixou.archisolver.repository.LocalRepository;
import fr.tixou.archisolver.service.LocalService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Local}.
 */
@Service
@Transactional
public class LocalServiceImpl implements LocalService {

    private final Logger log = LoggerFactory.getLogger(LocalServiceImpl.class);

    private final LocalRepository localRepository;

    public LocalServiceImpl(LocalRepository localRepository) {
        this.localRepository = localRepository;
    }

    @Override
    public Local save(Local local) {
        log.debug("Request to save Local : {}", local);
        return localRepository.save(local);
    }

    @Override
    public Optional<Local> partialUpdate(Local local) {
        log.debug("Request to partially update Local : {}", local);

        return localRepository
            .findById(local.getId())
            .map(existingLocal -> {
                if (local.getDesignation() != null) {
                    existingLocal.setDesignation(local.getDesignation());
                }
                if (local.getSurface() != null) {
                    existingLocal.setSurface(local.getSurface());
                }
                if (local.getEtage() != null) {
                    existingLocal.setEtage(local.getEtage());
                }
                if (local.getTypelocal() != null) {
                    existingLocal.setTypelocal(local.getTypelocal());
                }

                return existingLocal;
            })
            .map(localRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Local> findAll(Pageable pageable) {
        log.debug("Request to get all Locals");
        return localRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Local> findOne(Long id) {
        log.debug("Request to get Local : {}", id);
        return localRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Local : {}", id);
        localRepository.deleteById(id);
    }
}
