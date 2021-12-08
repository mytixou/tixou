package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.Commanditaire;
import fr.tixou.archisolver.repository.CommanditaireRepository;
import fr.tixou.archisolver.service.CommanditaireService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Commanditaire}.
 */
@Service
@Transactional
public class CommanditaireServiceImpl implements CommanditaireService {

    private final Logger log = LoggerFactory.getLogger(CommanditaireServiceImpl.class);

    private final CommanditaireRepository commanditaireRepository;

    public CommanditaireServiceImpl(CommanditaireRepository commanditaireRepository) {
        this.commanditaireRepository = commanditaireRepository;
    }

    @Override
    public Commanditaire save(Commanditaire commanditaire) {
        log.debug("Request to save Commanditaire : {}", commanditaire);
        return commanditaireRepository.save(commanditaire);
    }

    @Override
    public Optional<Commanditaire> partialUpdate(Commanditaire commanditaire) {
        log.debug("Request to partially update Commanditaire : {}", commanditaire);

        return commanditaireRepository
            .findById(commanditaire.getId())
            .map(existingCommanditaire -> {
                if (commanditaire.getIdMetierInterne() != null) {
                    existingCommanditaire.setIdMetierInterne(commanditaire.getIdMetierInterne());
                }
                if (commanditaire.getPrenom() != null) {
                    existingCommanditaire.setPrenom(commanditaire.getPrenom());
                }
                if (commanditaire.getNom() != null) {
                    existingCommanditaire.setNom(commanditaire.getNom());
                }
                if (commanditaire.getEmail() != null) {
                    existingCommanditaire.setEmail(commanditaire.getEmail());
                }
                if (commanditaire.getTelephoneFixe() != null) {
                    existingCommanditaire.setTelephoneFixe(commanditaire.getTelephoneFixe());
                }
                if (commanditaire.getTelephonePortable() != null) {
                    existingCommanditaire.setTelephonePortable(commanditaire.getTelephonePortable());
                }
                if (commanditaire.getConnuDepuis() != null) {
                    existingCommanditaire.setConnuDepuis(commanditaire.getConnuDepuis());
                }

                return existingCommanditaire;
            })
            .map(commanditaireRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Commanditaire> findAll() {
        log.debug("Request to get all Commanditaires");
        return commanditaireRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Commanditaire> findOne(Long id) {
        log.debug("Request to get Commanditaire : {}", id);
        return commanditaireRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Commanditaire : {}", id);
        commanditaireRepository.deleteById(id);
    }
}
