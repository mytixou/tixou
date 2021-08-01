package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.Adresse;
import fr.tixou.archisolver.repository.AdresseRepository;
import fr.tixou.archisolver.service.AdresseService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Adresse}.
 */
@Service
@Transactional
public class AdresseServiceImpl implements AdresseService {

    private final Logger log = LoggerFactory.getLogger(AdresseServiceImpl.class);

    private final AdresseRepository adresseRepository;

    public AdresseServiceImpl(AdresseRepository adresseRepository) {
        this.adresseRepository = adresseRepository;
    }

    @Override
    public Adresse save(Adresse adresse) {
        log.debug("Request to save Adresse : {}", adresse);
        return adresseRepository.save(adresse);
    }

    @Override
    public Optional<Adresse> partialUpdate(Adresse adresse) {
        log.debug("Request to partially update Adresse : {}", adresse);

        return adresseRepository
            .findById(adresse.getId())
            .map(
                existingAdresse -> {
                    if (adresse.getAdresseLigne1() != null) {
                        existingAdresse.setAdresseLigne1(adresse.getAdresseLigne1());
                    }
                    if (adresse.getAdresseLigne2() != null) {
                        existingAdresse.setAdresseLigne2(adresse.getAdresseLigne2());
                    }
                    if (adresse.getCodePostal() != null) {
                        existingAdresse.setCodePostal(adresse.getCodePostal());
                    }
                    if (adresse.getVille() != null) {
                        existingAdresse.setVille(adresse.getVille());
                    }
                    if (adresse.getStateProvince() != null) {
                        existingAdresse.setStateProvince(adresse.getStateProvince());
                    }

                    return existingAdresse;
                }
            )
            .map(adresseRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Adresse> findAll() {
        log.debug("Request to get all Adresses");
        return adresseRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Adresse> findOne(Long id) {
        log.debug("Request to get Adresse : {}", id);
        return adresseRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Adresse : {}", id);
        adresseRepository.deleteById(id);
    }
}
