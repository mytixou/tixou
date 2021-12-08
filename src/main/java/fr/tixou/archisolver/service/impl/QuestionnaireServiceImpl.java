package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.Questionnaire;
import fr.tixou.archisolver.repository.QuestionnaireRepository;
import fr.tixou.archisolver.service.QuestionnaireService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Questionnaire}.
 */
@Service
@Transactional
public class QuestionnaireServiceImpl implements QuestionnaireService {

    private final Logger log = LoggerFactory.getLogger(QuestionnaireServiceImpl.class);

    private final QuestionnaireRepository questionnaireRepository;

    public QuestionnaireServiceImpl(QuestionnaireRepository questionnaireRepository) {
        this.questionnaireRepository = questionnaireRepository;
    }

    @Override
    public Questionnaire save(Questionnaire questionnaire) {
        log.debug("Request to save Questionnaire : {}", questionnaire);
        return questionnaireRepository.save(questionnaire);
    }

    @Override
    public Optional<Questionnaire> partialUpdate(Questionnaire questionnaire) {
        log.debug("Request to partially update Questionnaire : {}", questionnaire);

        return questionnaireRepository
            .findById(questionnaire.getId())
            .map(existingQuestionnaire -> {
                if (questionnaire.getDesignation() != null) {
                    existingQuestionnaire.setDesignation(questionnaire.getDesignation());
                }
                if (questionnaire.getExplication() != null) {
                    existingQuestionnaire.setExplication(questionnaire.getExplication());
                }
                if (questionnaire.getTypeQuestionnaire() != null) {
                    existingQuestionnaire.setTypeQuestionnaire(questionnaire.getTypeQuestionnaire());
                }

                return existingQuestionnaire;
            })
            .map(questionnaireRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Questionnaire> findAll() {
        log.debug("Request to get all Questionnaires");
        return questionnaireRepository.findAllWithEagerRelationships();
    }

    public Page<Questionnaire> findAllWithEagerRelationships(Pageable pageable) {
        return questionnaireRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Questionnaire> findOne(Long id) {
        log.debug("Request to get Questionnaire : {}", id);
        return questionnaireRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Questionnaire : {}", id);
        questionnaireRepository.deleteById(id);
    }
}
