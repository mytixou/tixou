package fr.tixou.archisolver.web.rest;

import static fr.tixou.archisolver.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.tixou.archisolver.IntegrationTest;
import fr.tixou.archisolver.domain.ConsommationApa;
import fr.tixou.archisolver.repository.ConsommationApaRepository;
import java.math.BigDecimal;
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
 * Integration tests for the {@link ConsommationApaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ConsommationApaResourceIT {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final BigDecimal DEFAULT_MONTANT_COTISATIONS = new BigDecimal(1);
    private static final BigDecimal UPDATED_MONTANT_COTISATIONS = new BigDecimal(2);

    private static final BigDecimal DEFAULT_NB_HEURES = new BigDecimal(1);
    private static final BigDecimal UPDATED_NB_HEURES = new BigDecimal(2);

    private static final String ENTITY_API_URL = "/api/consommation-apas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ConsommationApaRepository consommationApaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restConsommationApaMockMvc;

    private ConsommationApa consommationApa;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ConsommationApa createEntity(EntityManager em) {
        ConsommationApa consommationApa = new ConsommationApa()
            .date(DEFAULT_DATE)
            .montantCotisations(DEFAULT_MONTANT_COTISATIONS)
            .nbHeures(DEFAULT_NB_HEURES);
        return consommationApa;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ConsommationApa createUpdatedEntity(EntityManager em) {
        ConsommationApa consommationApa = new ConsommationApa()
            .date(UPDATED_DATE)
            .montantCotisations(UPDATED_MONTANT_COTISATIONS)
            .nbHeures(UPDATED_NB_HEURES);
        return consommationApa;
    }

    @BeforeEach
    public void initTest() {
        consommationApa = createEntity(em);
    }

    @Test
    @Transactional
    void createConsommationApa() throws Exception {
        int databaseSizeBeforeCreate = consommationApaRepository.findAll().size();
        // Create the ConsommationApa
        restConsommationApaMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(consommationApa))
            )
            .andExpect(status().isCreated());

        // Validate the ConsommationApa in the database
        List<ConsommationApa> consommationApaList = consommationApaRepository.findAll();
        assertThat(consommationApaList).hasSize(databaseSizeBeforeCreate + 1);
        ConsommationApa testConsommationApa = consommationApaList.get(consommationApaList.size() - 1);
        assertThat(testConsommationApa.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testConsommationApa.getMontantCotisations()).isEqualByComparingTo(DEFAULT_MONTANT_COTISATIONS);
        assertThat(testConsommationApa.getNbHeures()).isEqualByComparingTo(DEFAULT_NB_HEURES);
    }

    @Test
    @Transactional
    void createConsommationApaWithExistingId() throws Exception {
        // Create the ConsommationApa with an existing ID
        consommationApa.setId(1L);

        int databaseSizeBeforeCreate = consommationApaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restConsommationApaMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(consommationApa))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsommationApa in the database
        List<ConsommationApa> consommationApaList = consommationApaRepository.findAll();
        assertThat(consommationApaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllConsommationApas() throws Exception {
        // Initialize the database
        consommationApaRepository.saveAndFlush(consommationApa);

        // Get all the consommationApaList
        restConsommationApaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(consommationApa.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].montantCotisations").value(hasItem(sameNumber(DEFAULT_MONTANT_COTISATIONS))))
            .andExpect(jsonPath("$.[*].nbHeures").value(hasItem(sameNumber(DEFAULT_NB_HEURES))));
    }

    @Test
    @Transactional
    void getConsommationApa() throws Exception {
        // Initialize the database
        consommationApaRepository.saveAndFlush(consommationApa);

        // Get the consommationApa
        restConsommationApaMockMvc
            .perform(get(ENTITY_API_URL_ID, consommationApa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(consommationApa.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.montantCotisations").value(sameNumber(DEFAULT_MONTANT_COTISATIONS)))
            .andExpect(jsonPath("$.nbHeures").value(sameNumber(DEFAULT_NB_HEURES)));
    }

    @Test
    @Transactional
    void getNonExistingConsommationApa() throws Exception {
        // Get the consommationApa
        restConsommationApaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewConsommationApa() throws Exception {
        // Initialize the database
        consommationApaRepository.saveAndFlush(consommationApa);

        int databaseSizeBeforeUpdate = consommationApaRepository.findAll().size();

        // Update the consommationApa
        ConsommationApa updatedConsommationApa = consommationApaRepository.findById(consommationApa.getId()).get();
        // Disconnect from session so that the updates on updatedConsommationApa are not directly saved in db
        em.detach(updatedConsommationApa);
        updatedConsommationApa.date(UPDATED_DATE).montantCotisations(UPDATED_MONTANT_COTISATIONS).nbHeures(UPDATED_NB_HEURES);

        restConsommationApaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedConsommationApa.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedConsommationApa))
            )
            .andExpect(status().isOk());

        // Validate the ConsommationApa in the database
        List<ConsommationApa> consommationApaList = consommationApaRepository.findAll();
        assertThat(consommationApaList).hasSize(databaseSizeBeforeUpdate);
        ConsommationApa testConsommationApa = consommationApaList.get(consommationApaList.size() - 1);
        assertThat(testConsommationApa.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testConsommationApa.getMontantCotisations()).isEqualTo(UPDATED_MONTANT_COTISATIONS);
        assertThat(testConsommationApa.getNbHeures()).isEqualTo(UPDATED_NB_HEURES);
    }

    @Test
    @Transactional
    void putNonExistingConsommationApa() throws Exception {
        int databaseSizeBeforeUpdate = consommationApaRepository.findAll().size();
        consommationApa.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConsommationApaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, consommationApa.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(consommationApa))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsommationApa in the database
        List<ConsommationApa> consommationApaList = consommationApaRepository.findAll();
        assertThat(consommationApaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchConsommationApa() throws Exception {
        int databaseSizeBeforeUpdate = consommationApaRepository.findAll().size();
        consommationApa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConsommationApaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(consommationApa))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsommationApa in the database
        List<ConsommationApa> consommationApaList = consommationApaRepository.findAll();
        assertThat(consommationApaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamConsommationApa() throws Exception {
        int databaseSizeBeforeUpdate = consommationApaRepository.findAll().size();
        consommationApa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConsommationApaMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(consommationApa))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ConsommationApa in the database
        List<ConsommationApa> consommationApaList = consommationApaRepository.findAll();
        assertThat(consommationApaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateConsommationApaWithPatch() throws Exception {
        // Initialize the database
        consommationApaRepository.saveAndFlush(consommationApa);

        int databaseSizeBeforeUpdate = consommationApaRepository.findAll().size();

        // Update the consommationApa using partial update
        ConsommationApa partialUpdatedConsommationApa = new ConsommationApa();
        partialUpdatedConsommationApa.setId(consommationApa.getId());

        partialUpdatedConsommationApa.montantCotisations(UPDATED_MONTANT_COTISATIONS).nbHeures(UPDATED_NB_HEURES);

        restConsommationApaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedConsommationApa.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedConsommationApa))
            )
            .andExpect(status().isOk());

        // Validate the ConsommationApa in the database
        List<ConsommationApa> consommationApaList = consommationApaRepository.findAll();
        assertThat(consommationApaList).hasSize(databaseSizeBeforeUpdate);
        ConsommationApa testConsommationApa = consommationApaList.get(consommationApaList.size() - 1);
        assertThat(testConsommationApa.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testConsommationApa.getMontantCotisations()).isEqualByComparingTo(UPDATED_MONTANT_COTISATIONS);
        assertThat(testConsommationApa.getNbHeures()).isEqualByComparingTo(UPDATED_NB_HEURES);
    }

    @Test
    @Transactional
    void fullUpdateConsommationApaWithPatch() throws Exception {
        // Initialize the database
        consommationApaRepository.saveAndFlush(consommationApa);

        int databaseSizeBeforeUpdate = consommationApaRepository.findAll().size();

        // Update the consommationApa using partial update
        ConsommationApa partialUpdatedConsommationApa = new ConsommationApa();
        partialUpdatedConsommationApa.setId(consommationApa.getId());

        partialUpdatedConsommationApa.date(UPDATED_DATE).montantCotisations(UPDATED_MONTANT_COTISATIONS).nbHeures(UPDATED_NB_HEURES);

        restConsommationApaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedConsommationApa.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedConsommationApa))
            )
            .andExpect(status().isOk());

        // Validate the ConsommationApa in the database
        List<ConsommationApa> consommationApaList = consommationApaRepository.findAll();
        assertThat(consommationApaList).hasSize(databaseSizeBeforeUpdate);
        ConsommationApa testConsommationApa = consommationApaList.get(consommationApaList.size() - 1);
        assertThat(testConsommationApa.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testConsommationApa.getMontantCotisations()).isEqualByComparingTo(UPDATED_MONTANT_COTISATIONS);
        assertThat(testConsommationApa.getNbHeures()).isEqualByComparingTo(UPDATED_NB_HEURES);
    }

    @Test
    @Transactional
    void patchNonExistingConsommationApa() throws Exception {
        int databaseSizeBeforeUpdate = consommationApaRepository.findAll().size();
        consommationApa.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConsommationApaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, consommationApa.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(consommationApa))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsommationApa in the database
        List<ConsommationApa> consommationApaList = consommationApaRepository.findAll();
        assertThat(consommationApaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchConsommationApa() throws Exception {
        int databaseSizeBeforeUpdate = consommationApaRepository.findAll().size();
        consommationApa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConsommationApaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(consommationApa))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsommationApa in the database
        List<ConsommationApa> consommationApaList = consommationApaRepository.findAll();
        assertThat(consommationApaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamConsommationApa() throws Exception {
        int databaseSizeBeforeUpdate = consommationApaRepository.findAll().size();
        consommationApa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConsommationApaMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(consommationApa))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ConsommationApa in the database
        List<ConsommationApa> consommationApaList = consommationApaRepository.findAll();
        assertThat(consommationApaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteConsommationApa() throws Exception {
        // Initialize the database
        consommationApaRepository.saveAndFlush(consommationApa);

        int databaseSizeBeforeDelete = consommationApaRepository.findAll().size();

        // Delete the consommationApa
        restConsommationApaMockMvc
            .perform(delete(ENTITY_API_URL_ID, consommationApa.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ConsommationApa> consommationApaList = consommationApaRepository.findAll();
        assertThat(consommationApaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
