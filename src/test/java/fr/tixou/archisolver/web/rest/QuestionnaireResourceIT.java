package fr.tixou.archisolver.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.tixou.archisolver.IntegrationTest;
import fr.tixou.archisolver.domain.Questionnaire;
import fr.tixou.archisolver.domain.enumeration.TypeDestination;
import fr.tixou.archisolver.repository.QuestionnaireRepository;
import fr.tixou.archisolver.service.QuestionnaireService;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link QuestionnaireResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class QuestionnaireResourceIT {

    private static final String DEFAULT_DESIGNATION = "AAAAAAAAAA";
    private static final String UPDATED_DESIGNATION = "BBBBBBBBBB";

    private static final String DEFAULT_EXPLICATION = "AAAAAAAAAA";
    private static final String UPDATED_EXPLICATION = "BBBBBBBBBB";

    private static final TypeDestination DEFAULT_TYPE_QUESTIONNAIRE = TypeDestination.TERRAIN;
    private static final TypeDestination UPDATED_TYPE_QUESTIONNAIRE = TypeDestination.BATIMENT;

    private static final String ENTITY_API_URL = "/api/questionnaires";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private QuestionnaireRepository questionnaireRepository;

    @Mock
    private QuestionnaireRepository questionnaireRepositoryMock;

    @Mock
    private QuestionnaireService questionnaireServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restQuestionnaireMockMvc;

    private Questionnaire questionnaire;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Questionnaire createEntity(EntityManager em) {
        Questionnaire questionnaire = new Questionnaire()
            .designation(DEFAULT_DESIGNATION)
            .explication(DEFAULT_EXPLICATION)
            .typeQuestionnaire(DEFAULT_TYPE_QUESTIONNAIRE);
        return questionnaire;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Questionnaire createUpdatedEntity(EntityManager em) {
        Questionnaire questionnaire = new Questionnaire()
            .designation(UPDATED_DESIGNATION)
            .explication(UPDATED_EXPLICATION)
            .typeQuestionnaire(UPDATED_TYPE_QUESTIONNAIRE);
        return questionnaire;
    }

    @BeforeEach
    public void initTest() {
        questionnaire = createEntity(em);
    }

    @Test
    @Transactional
    void createQuestionnaire() throws Exception {
        int databaseSizeBeforeCreate = questionnaireRepository.findAll().size();
        // Create the Questionnaire
        restQuestionnaireMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(questionnaire)))
            .andExpect(status().isCreated());

        // Validate the Questionnaire in the database
        List<Questionnaire> questionnaireList = questionnaireRepository.findAll();
        assertThat(questionnaireList).hasSize(databaseSizeBeforeCreate + 1);
        Questionnaire testQuestionnaire = questionnaireList.get(questionnaireList.size() - 1);
        assertThat(testQuestionnaire.getDesignation()).isEqualTo(DEFAULT_DESIGNATION);
        assertThat(testQuestionnaire.getExplication()).isEqualTo(DEFAULT_EXPLICATION);
        assertThat(testQuestionnaire.getTypeQuestionnaire()).isEqualTo(DEFAULT_TYPE_QUESTIONNAIRE);
    }

    @Test
    @Transactional
    void createQuestionnaireWithExistingId() throws Exception {
        // Create the Questionnaire with an existing ID
        questionnaire.setId(1L);

        int databaseSizeBeforeCreate = questionnaireRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuestionnaireMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(questionnaire)))
            .andExpect(status().isBadRequest());

        // Validate the Questionnaire in the database
        List<Questionnaire> questionnaireList = questionnaireRepository.findAll();
        assertThat(questionnaireList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllQuestionnaires() throws Exception {
        // Initialize the database
        questionnaireRepository.saveAndFlush(questionnaire);

        // Get all the questionnaireList
        restQuestionnaireMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(questionnaire.getId().intValue())))
            .andExpect(jsonPath("$.[*].designation").value(hasItem(DEFAULT_DESIGNATION)))
            .andExpect(jsonPath("$.[*].explication").value(hasItem(DEFAULT_EXPLICATION)))
            .andExpect(jsonPath("$.[*].typeQuestionnaire").value(hasItem(DEFAULT_TYPE_QUESTIONNAIRE.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllQuestionnairesWithEagerRelationshipsIsEnabled() throws Exception {
        when(questionnaireServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restQuestionnaireMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(questionnaireServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllQuestionnairesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(questionnaireServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restQuestionnaireMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(questionnaireServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    void getQuestionnaire() throws Exception {
        // Initialize the database
        questionnaireRepository.saveAndFlush(questionnaire);

        // Get the questionnaire
        restQuestionnaireMockMvc
            .perform(get(ENTITY_API_URL_ID, questionnaire.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(questionnaire.getId().intValue()))
            .andExpect(jsonPath("$.designation").value(DEFAULT_DESIGNATION))
            .andExpect(jsonPath("$.explication").value(DEFAULT_EXPLICATION))
            .andExpect(jsonPath("$.typeQuestionnaire").value(DEFAULT_TYPE_QUESTIONNAIRE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingQuestionnaire() throws Exception {
        // Get the questionnaire
        restQuestionnaireMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewQuestionnaire() throws Exception {
        // Initialize the database
        questionnaireRepository.saveAndFlush(questionnaire);

        int databaseSizeBeforeUpdate = questionnaireRepository.findAll().size();

        // Update the questionnaire
        Questionnaire updatedQuestionnaire = questionnaireRepository.findById(questionnaire.getId()).get();
        // Disconnect from session so that the updates on updatedQuestionnaire are not directly saved in db
        em.detach(updatedQuestionnaire);
        updatedQuestionnaire
            .designation(UPDATED_DESIGNATION)
            .explication(UPDATED_EXPLICATION)
            .typeQuestionnaire(UPDATED_TYPE_QUESTIONNAIRE);

        restQuestionnaireMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedQuestionnaire.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedQuestionnaire))
            )
            .andExpect(status().isOk());

        // Validate the Questionnaire in the database
        List<Questionnaire> questionnaireList = questionnaireRepository.findAll();
        assertThat(questionnaireList).hasSize(databaseSizeBeforeUpdate);
        Questionnaire testQuestionnaire = questionnaireList.get(questionnaireList.size() - 1);
        assertThat(testQuestionnaire.getDesignation()).isEqualTo(UPDATED_DESIGNATION);
        assertThat(testQuestionnaire.getExplication()).isEqualTo(UPDATED_EXPLICATION);
        assertThat(testQuestionnaire.getTypeQuestionnaire()).isEqualTo(UPDATED_TYPE_QUESTIONNAIRE);
    }

    @Test
    @Transactional
    void putNonExistingQuestionnaire() throws Exception {
        int databaseSizeBeforeUpdate = questionnaireRepository.findAll().size();
        questionnaire.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuestionnaireMockMvc
            .perform(
                put(ENTITY_API_URL_ID, questionnaire.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(questionnaire))
            )
            .andExpect(status().isBadRequest());

        // Validate the Questionnaire in the database
        List<Questionnaire> questionnaireList = questionnaireRepository.findAll();
        assertThat(questionnaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchQuestionnaire() throws Exception {
        int databaseSizeBeforeUpdate = questionnaireRepository.findAll().size();
        questionnaire.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuestionnaireMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(questionnaire))
            )
            .andExpect(status().isBadRequest());

        // Validate the Questionnaire in the database
        List<Questionnaire> questionnaireList = questionnaireRepository.findAll();
        assertThat(questionnaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamQuestionnaire() throws Exception {
        int databaseSizeBeforeUpdate = questionnaireRepository.findAll().size();
        questionnaire.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuestionnaireMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(questionnaire)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Questionnaire in the database
        List<Questionnaire> questionnaireList = questionnaireRepository.findAll();
        assertThat(questionnaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateQuestionnaireWithPatch() throws Exception {
        // Initialize the database
        questionnaireRepository.saveAndFlush(questionnaire);

        int databaseSizeBeforeUpdate = questionnaireRepository.findAll().size();

        // Update the questionnaire using partial update
        Questionnaire partialUpdatedQuestionnaire = new Questionnaire();
        partialUpdatedQuestionnaire.setId(questionnaire.getId());

        partialUpdatedQuestionnaire.explication(UPDATED_EXPLICATION);

        restQuestionnaireMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedQuestionnaire.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedQuestionnaire))
            )
            .andExpect(status().isOk());

        // Validate the Questionnaire in the database
        List<Questionnaire> questionnaireList = questionnaireRepository.findAll();
        assertThat(questionnaireList).hasSize(databaseSizeBeforeUpdate);
        Questionnaire testQuestionnaire = questionnaireList.get(questionnaireList.size() - 1);
        assertThat(testQuestionnaire.getDesignation()).isEqualTo(DEFAULT_DESIGNATION);
        assertThat(testQuestionnaire.getExplication()).isEqualTo(UPDATED_EXPLICATION);
        assertThat(testQuestionnaire.getTypeQuestionnaire()).isEqualTo(DEFAULT_TYPE_QUESTIONNAIRE);
    }

    @Test
    @Transactional
    void fullUpdateQuestionnaireWithPatch() throws Exception {
        // Initialize the database
        questionnaireRepository.saveAndFlush(questionnaire);

        int databaseSizeBeforeUpdate = questionnaireRepository.findAll().size();

        // Update the questionnaire using partial update
        Questionnaire partialUpdatedQuestionnaire = new Questionnaire();
        partialUpdatedQuestionnaire.setId(questionnaire.getId());

        partialUpdatedQuestionnaire
            .designation(UPDATED_DESIGNATION)
            .explication(UPDATED_EXPLICATION)
            .typeQuestionnaire(UPDATED_TYPE_QUESTIONNAIRE);

        restQuestionnaireMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedQuestionnaire.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedQuestionnaire))
            )
            .andExpect(status().isOk());

        // Validate the Questionnaire in the database
        List<Questionnaire> questionnaireList = questionnaireRepository.findAll();
        assertThat(questionnaireList).hasSize(databaseSizeBeforeUpdate);
        Questionnaire testQuestionnaire = questionnaireList.get(questionnaireList.size() - 1);
        assertThat(testQuestionnaire.getDesignation()).isEqualTo(UPDATED_DESIGNATION);
        assertThat(testQuestionnaire.getExplication()).isEqualTo(UPDATED_EXPLICATION);
        assertThat(testQuestionnaire.getTypeQuestionnaire()).isEqualTo(UPDATED_TYPE_QUESTIONNAIRE);
    }

    @Test
    @Transactional
    void patchNonExistingQuestionnaire() throws Exception {
        int databaseSizeBeforeUpdate = questionnaireRepository.findAll().size();
        questionnaire.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuestionnaireMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, questionnaire.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(questionnaire))
            )
            .andExpect(status().isBadRequest());

        // Validate the Questionnaire in the database
        List<Questionnaire> questionnaireList = questionnaireRepository.findAll();
        assertThat(questionnaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchQuestionnaire() throws Exception {
        int databaseSizeBeforeUpdate = questionnaireRepository.findAll().size();
        questionnaire.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuestionnaireMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(questionnaire))
            )
            .andExpect(status().isBadRequest());

        // Validate the Questionnaire in the database
        List<Questionnaire> questionnaireList = questionnaireRepository.findAll();
        assertThat(questionnaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamQuestionnaire() throws Exception {
        int databaseSizeBeforeUpdate = questionnaireRepository.findAll().size();
        questionnaire.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuestionnaireMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(questionnaire))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Questionnaire in the database
        List<Questionnaire> questionnaireList = questionnaireRepository.findAll();
        assertThat(questionnaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteQuestionnaire() throws Exception {
        // Initialize the database
        questionnaireRepository.saveAndFlush(questionnaire);

        int databaseSizeBeforeDelete = questionnaireRepository.findAll().size();

        // Delete the questionnaire
        restQuestionnaireMockMvc
            .perform(delete(ENTITY_API_URL_ID, questionnaire.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Questionnaire> questionnaireList = questionnaireRepository.findAll();
        assertThat(questionnaireList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
