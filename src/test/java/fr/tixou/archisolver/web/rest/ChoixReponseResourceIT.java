package fr.tixou.archisolver.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.tixou.archisolver.IntegrationTest;
import fr.tixou.archisolver.domain.ChoixReponse;
import fr.tixou.archisolver.repository.ChoixReponseRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
 * Integration tests for the {@link ChoixReponseResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ChoixReponseResourceIT {

    private static final Instant DEFAULT_DATE_CHOIX = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_CHOIX = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/choix-reponses";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ChoixReponseRepository choixReponseRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restChoixReponseMockMvc;

    private ChoixReponse choixReponse;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ChoixReponse createEntity(EntityManager em) {
        ChoixReponse choixReponse = new ChoixReponse().dateChoix(DEFAULT_DATE_CHOIX);
        return choixReponse;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ChoixReponse createUpdatedEntity(EntityManager em) {
        ChoixReponse choixReponse = new ChoixReponse().dateChoix(UPDATED_DATE_CHOIX);
        return choixReponse;
    }

    @BeforeEach
    public void initTest() {
        choixReponse = createEntity(em);
    }

    @Test
    @Transactional
    void createChoixReponse() throws Exception {
        int databaseSizeBeforeCreate = choixReponseRepository.findAll().size();
        // Create the ChoixReponse
        restChoixReponseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(choixReponse)))
            .andExpect(status().isCreated());

        // Validate the ChoixReponse in the database
        List<ChoixReponse> choixReponseList = choixReponseRepository.findAll();
        assertThat(choixReponseList).hasSize(databaseSizeBeforeCreate + 1);
        ChoixReponse testChoixReponse = choixReponseList.get(choixReponseList.size() - 1);
        assertThat(testChoixReponse.getDateChoix()).isEqualTo(DEFAULT_DATE_CHOIX);
    }

    @Test
    @Transactional
    void createChoixReponseWithExistingId() throws Exception {
        // Create the ChoixReponse with an existing ID
        choixReponse.setId(1L);

        int databaseSizeBeforeCreate = choixReponseRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restChoixReponseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(choixReponse)))
            .andExpect(status().isBadRequest());

        // Validate the ChoixReponse in the database
        List<ChoixReponse> choixReponseList = choixReponseRepository.findAll();
        assertThat(choixReponseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllChoixReponses() throws Exception {
        // Initialize the database
        choixReponseRepository.saveAndFlush(choixReponse);

        // Get all the choixReponseList
        restChoixReponseMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(choixReponse.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateChoix").value(hasItem(DEFAULT_DATE_CHOIX.toString())));
    }

    @Test
    @Transactional
    void getChoixReponse() throws Exception {
        // Initialize the database
        choixReponseRepository.saveAndFlush(choixReponse);

        // Get the choixReponse
        restChoixReponseMockMvc
            .perform(get(ENTITY_API_URL_ID, choixReponse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(choixReponse.getId().intValue()))
            .andExpect(jsonPath("$.dateChoix").value(DEFAULT_DATE_CHOIX.toString()));
    }

    @Test
    @Transactional
    void getNonExistingChoixReponse() throws Exception {
        // Get the choixReponse
        restChoixReponseMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewChoixReponse() throws Exception {
        // Initialize the database
        choixReponseRepository.saveAndFlush(choixReponse);

        int databaseSizeBeforeUpdate = choixReponseRepository.findAll().size();

        // Update the choixReponse
        ChoixReponse updatedChoixReponse = choixReponseRepository.findById(choixReponse.getId()).get();
        // Disconnect from session so that the updates on updatedChoixReponse are not directly saved in db
        em.detach(updatedChoixReponse);
        updatedChoixReponse.dateChoix(UPDATED_DATE_CHOIX);

        restChoixReponseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedChoixReponse.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedChoixReponse))
            )
            .andExpect(status().isOk());

        // Validate the ChoixReponse in the database
        List<ChoixReponse> choixReponseList = choixReponseRepository.findAll();
        assertThat(choixReponseList).hasSize(databaseSizeBeforeUpdate);
        ChoixReponse testChoixReponse = choixReponseList.get(choixReponseList.size() - 1);
        assertThat(testChoixReponse.getDateChoix()).isEqualTo(UPDATED_DATE_CHOIX);
    }

    @Test
    @Transactional
    void putNonExistingChoixReponse() throws Exception {
        int databaseSizeBeforeUpdate = choixReponseRepository.findAll().size();
        choixReponse.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChoixReponseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, choixReponse.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(choixReponse))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChoixReponse in the database
        List<ChoixReponse> choixReponseList = choixReponseRepository.findAll();
        assertThat(choixReponseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchChoixReponse() throws Exception {
        int databaseSizeBeforeUpdate = choixReponseRepository.findAll().size();
        choixReponse.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChoixReponseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(choixReponse))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChoixReponse in the database
        List<ChoixReponse> choixReponseList = choixReponseRepository.findAll();
        assertThat(choixReponseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamChoixReponse() throws Exception {
        int databaseSizeBeforeUpdate = choixReponseRepository.findAll().size();
        choixReponse.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChoixReponseMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(choixReponse)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ChoixReponse in the database
        List<ChoixReponse> choixReponseList = choixReponseRepository.findAll();
        assertThat(choixReponseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateChoixReponseWithPatch() throws Exception {
        // Initialize the database
        choixReponseRepository.saveAndFlush(choixReponse);

        int databaseSizeBeforeUpdate = choixReponseRepository.findAll().size();

        // Update the choixReponse using partial update
        ChoixReponse partialUpdatedChoixReponse = new ChoixReponse();
        partialUpdatedChoixReponse.setId(choixReponse.getId());

        restChoixReponseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedChoixReponse.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedChoixReponse))
            )
            .andExpect(status().isOk());

        // Validate the ChoixReponse in the database
        List<ChoixReponse> choixReponseList = choixReponseRepository.findAll();
        assertThat(choixReponseList).hasSize(databaseSizeBeforeUpdate);
        ChoixReponse testChoixReponse = choixReponseList.get(choixReponseList.size() - 1);
        assertThat(testChoixReponse.getDateChoix()).isEqualTo(DEFAULT_DATE_CHOIX);
    }

    @Test
    @Transactional
    void fullUpdateChoixReponseWithPatch() throws Exception {
        // Initialize the database
        choixReponseRepository.saveAndFlush(choixReponse);

        int databaseSizeBeforeUpdate = choixReponseRepository.findAll().size();

        // Update the choixReponse using partial update
        ChoixReponse partialUpdatedChoixReponse = new ChoixReponse();
        partialUpdatedChoixReponse.setId(choixReponse.getId());

        partialUpdatedChoixReponse.dateChoix(UPDATED_DATE_CHOIX);

        restChoixReponseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedChoixReponse.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedChoixReponse))
            )
            .andExpect(status().isOk());

        // Validate the ChoixReponse in the database
        List<ChoixReponse> choixReponseList = choixReponseRepository.findAll();
        assertThat(choixReponseList).hasSize(databaseSizeBeforeUpdate);
        ChoixReponse testChoixReponse = choixReponseList.get(choixReponseList.size() - 1);
        assertThat(testChoixReponse.getDateChoix()).isEqualTo(UPDATED_DATE_CHOIX);
    }

    @Test
    @Transactional
    void patchNonExistingChoixReponse() throws Exception {
        int databaseSizeBeforeUpdate = choixReponseRepository.findAll().size();
        choixReponse.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChoixReponseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, choixReponse.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(choixReponse))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChoixReponse in the database
        List<ChoixReponse> choixReponseList = choixReponseRepository.findAll();
        assertThat(choixReponseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchChoixReponse() throws Exception {
        int databaseSizeBeforeUpdate = choixReponseRepository.findAll().size();
        choixReponse.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChoixReponseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(choixReponse))
            )
            .andExpect(status().isBadRequest());

        // Validate the ChoixReponse in the database
        List<ChoixReponse> choixReponseList = choixReponseRepository.findAll();
        assertThat(choixReponseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamChoixReponse() throws Exception {
        int databaseSizeBeforeUpdate = choixReponseRepository.findAll().size();
        choixReponse.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChoixReponseMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(choixReponse))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ChoixReponse in the database
        List<ChoixReponse> choixReponseList = choixReponseRepository.findAll();
        assertThat(choixReponseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteChoixReponse() throws Exception {
        // Initialize the database
        choixReponseRepository.saveAndFlush(choixReponse);

        int databaseSizeBeforeDelete = choixReponseRepository.findAll().size();

        // Delete the choixReponse
        restChoixReponseMockMvc
            .perform(delete(ENTITY_API_URL_ID, choixReponse.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ChoixReponse> choixReponseList = choixReponseRepository.findAll();
        assertThat(choixReponseList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
