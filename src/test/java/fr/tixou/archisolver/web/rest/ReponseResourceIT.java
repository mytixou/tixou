package fr.tixou.archisolver.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.tixou.archisolver.IntegrationTest;
import fr.tixou.archisolver.domain.Reponse;
import fr.tixou.archisolver.domain.enumeration.TypeDestination;
import fr.tixou.archisolver.repository.ReponseRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ReponseResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ReponseResourceIT {

    private static final String DEFAULT_DESIGNATION = "AAAAAAAAAA";
    private static final String UPDATED_DESIGNATION = "BBBBBBBBBB";

    private static final String DEFAULT_EXPLICATION = "AAAAAAAAAA";
    private static final String UPDATED_EXPLICATION = "BBBBBBBBBB";

    private static final TypeDestination DEFAULT_TYPE_QUESTION = TypeDestination.TERRAIN;
    private static final TypeDestination UPDATED_TYPE_QUESTION = TypeDestination.BATIMENT;

    private static final String ENTITY_API_URL = "/api/reponses";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ReponseRepository reponseRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restReponseMockMvc;

    private Reponse reponse;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reponse createEntity(EntityManager em) {
        Reponse reponse = new Reponse()
            .designation(DEFAULT_DESIGNATION)
            .explication(DEFAULT_EXPLICATION)
            .typeQuestion(DEFAULT_TYPE_QUESTION);
        return reponse;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reponse createUpdatedEntity(EntityManager em) {
        Reponse reponse = new Reponse()
            .designation(UPDATED_DESIGNATION)
            .explication(UPDATED_EXPLICATION)
            .typeQuestion(UPDATED_TYPE_QUESTION);
        return reponse;
    }

    @BeforeEach
    public void initTest() {
        reponse = createEntity(em);
    }

    @Test
    @Transactional
    void createReponse() throws Exception {
        int databaseSizeBeforeCreate = reponseRepository.findAll().size();
        // Create the Reponse
        restReponseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reponse)))
            .andExpect(status().isCreated());

        // Validate the Reponse in the database
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeCreate + 1);
        Reponse testReponse = reponseList.get(reponseList.size() - 1);
        assertThat(testReponse.getDesignation()).isEqualTo(DEFAULT_DESIGNATION);
        assertThat(testReponse.getExplication()).isEqualTo(DEFAULT_EXPLICATION);
        assertThat(testReponse.getTypeQuestion()).isEqualTo(DEFAULT_TYPE_QUESTION);
    }

    @Test
    @Transactional
    void createReponseWithExistingId() throws Exception {
        // Create the Reponse with an existing ID
        reponse.setId(1L);

        int databaseSizeBeforeCreate = reponseRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restReponseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reponse)))
            .andExpect(status().isBadRequest());

        // Validate the Reponse in the database
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllReponses() throws Exception {
        // Initialize the database
        reponseRepository.saveAndFlush(reponse);

        // Get all the reponseList
        restReponseMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reponse.getId().intValue())))
            .andExpect(jsonPath("$.[*].designation").value(hasItem(DEFAULT_DESIGNATION)))
            .andExpect(jsonPath("$.[*].explication").value(hasItem(DEFAULT_EXPLICATION)))
            .andExpect(jsonPath("$.[*].typeQuestion").value(hasItem(DEFAULT_TYPE_QUESTION.toString())));
    }

    @Test
    @Transactional
    void getReponse() throws Exception {
        // Initialize the database
        reponseRepository.saveAndFlush(reponse);

        // Get the reponse
        restReponseMockMvc
            .perform(get(ENTITY_API_URL_ID, reponse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(reponse.getId().intValue()))
            .andExpect(jsonPath("$.designation").value(DEFAULT_DESIGNATION))
            .andExpect(jsonPath("$.explication").value(DEFAULT_EXPLICATION))
            .andExpect(jsonPath("$.typeQuestion").value(DEFAULT_TYPE_QUESTION.toString()));
    }

    @Test
    @Transactional
    void getNonExistingReponse() throws Exception {
        // Get the reponse
        restReponseMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewReponse() throws Exception {
        // Initialize the database
        reponseRepository.saveAndFlush(reponse);

        int databaseSizeBeforeUpdate = reponseRepository.findAll().size();

        // Update the reponse
        Reponse updatedReponse = reponseRepository.findById(reponse.getId()).get();
        // Disconnect from session so that the updates on updatedReponse are not directly saved in db
        em.detach(updatedReponse);
        updatedReponse.designation(UPDATED_DESIGNATION).explication(UPDATED_EXPLICATION).typeQuestion(UPDATED_TYPE_QUESTION);

        restReponseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedReponse.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedReponse))
            )
            .andExpect(status().isOk());

        // Validate the Reponse in the database
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeUpdate);
        Reponse testReponse = reponseList.get(reponseList.size() - 1);
        assertThat(testReponse.getDesignation()).isEqualTo(UPDATED_DESIGNATION);
        assertThat(testReponse.getExplication()).isEqualTo(UPDATED_EXPLICATION);
        assertThat(testReponse.getTypeQuestion()).isEqualTo(UPDATED_TYPE_QUESTION);
    }

    @Test
    @Transactional
    void putNonExistingReponse() throws Exception {
        int databaseSizeBeforeUpdate = reponseRepository.findAll().size();
        reponse.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReponseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, reponse.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(reponse))
            )
            .andExpect(status().isBadRequest());

        // Validate the Reponse in the database
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchReponse() throws Exception {
        int databaseSizeBeforeUpdate = reponseRepository.findAll().size();
        reponse.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReponseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(reponse))
            )
            .andExpect(status().isBadRequest());

        // Validate the Reponse in the database
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamReponse() throws Exception {
        int databaseSizeBeforeUpdate = reponseRepository.findAll().size();
        reponse.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReponseMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reponse)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Reponse in the database
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateReponseWithPatch() throws Exception {
        // Initialize the database
        reponseRepository.saveAndFlush(reponse);

        int databaseSizeBeforeUpdate = reponseRepository.findAll().size();

        // Update the reponse using partial update
        Reponse partialUpdatedReponse = new Reponse();
        partialUpdatedReponse.setId(reponse.getId());

        partialUpdatedReponse.designation(UPDATED_DESIGNATION).explication(UPDATED_EXPLICATION).typeQuestion(UPDATED_TYPE_QUESTION);

        restReponseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedReponse.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedReponse))
            )
            .andExpect(status().isOk());

        // Validate the Reponse in the database
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeUpdate);
        Reponse testReponse = reponseList.get(reponseList.size() - 1);
        assertThat(testReponse.getDesignation()).isEqualTo(UPDATED_DESIGNATION);
        assertThat(testReponse.getExplication()).isEqualTo(UPDATED_EXPLICATION);
        assertThat(testReponse.getTypeQuestion()).isEqualTo(UPDATED_TYPE_QUESTION);
    }

    @Test
    @Transactional
    void fullUpdateReponseWithPatch() throws Exception {
        // Initialize the database
        reponseRepository.saveAndFlush(reponse);

        int databaseSizeBeforeUpdate = reponseRepository.findAll().size();

        // Update the reponse using partial update
        Reponse partialUpdatedReponse = new Reponse();
        partialUpdatedReponse.setId(reponse.getId());

        partialUpdatedReponse.designation(UPDATED_DESIGNATION).explication(UPDATED_EXPLICATION).typeQuestion(UPDATED_TYPE_QUESTION);

        restReponseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedReponse.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedReponse))
            )
            .andExpect(status().isOk());

        // Validate the Reponse in the database
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeUpdate);
        Reponse testReponse = reponseList.get(reponseList.size() - 1);
        assertThat(testReponse.getDesignation()).isEqualTo(UPDATED_DESIGNATION);
        assertThat(testReponse.getExplication()).isEqualTo(UPDATED_EXPLICATION);
        assertThat(testReponse.getTypeQuestion()).isEqualTo(UPDATED_TYPE_QUESTION);
    }

    @Test
    @Transactional
    void patchNonExistingReponse() throws Exception {
        int databaseSizeBeforeUpdate = reponseRepository.findAll().size();
        reponse.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReponseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, reponse.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(reponse))
            )
            .andExpect(status().isBadRequest());

        // Validate the Reponse in the database
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchReponse() throws Exception {
        int databaseSizeBeforeUpdate = reponseRepository.findAll().size();
        reponse.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReponseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(reponse))
            )
            .andExpect(status().isBadRequest());

        // Validate the Reponse in the database
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamReponse() throws Exception {
        int databaseSizeBeforeUpdate = reponseRepository.findAll().size();
        reponse.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReponseMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(reponse)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Reponse in the database
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteReponse() throws Exception {
        // Initialize the database
        reponseRepository.saveAndFlush(reponse);

        int databaseSizeBeforeDelete = reponseRepository.findAll().size();

        // Delete the reponse
        restReponseMockMvc
            .perform(delete(ENTITY_API_URL_ID, reponse.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
