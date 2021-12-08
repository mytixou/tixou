package fr.tixou.archisolver.web.rest;

import static fr.tixou.archisolver.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.tixou.archisolver.IntegrationTest;
import fr.tixou.archisolver.domain.ConsommationPchE;
import fr.tixou.archisolver.repository.ConsommationPchERepository;
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
 * Integration tests for the {@link ConsommationPchEResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ConsommationPchEResourceIT {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final BigDecimal DEFAULT_MONTANT_COTISATIONS = new BigDecimal(1);
    private static final BigDecimal UPDATED_MONTANT_COTISATIONS = new BigDecimal(2);

    private static final BigDecimal DEFAULT_NB_HEURES = new BigDecimal(1);
    private static final BigDecimal UPDATED_NB_HEURES = new BigDecimal(2);

    private static final String ENTITY_API_URL = "/api/consommation-pch-es";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ConsommationPchERepository consommationPchERepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restConsommationPchEMockMvc;

    private ConsommationPchE consommationPchE;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ConsommationPchE createEntity(EntityManager em) {
        ConsommationPchE consommationPchE = new ConsommationPchE()
            .date(DEFAULT_DATE)
            .montantCotisations(DEFAULT_MONTANT_COTISATIONS)
            .nbHeures(DEFAULT_NB_HEURES);
        return consommationPchE;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ConsommationPchE createUpdatedEntity(EntityManager em) {
        ConsommationPchE consommationPchE = new ConsommationPchE()
            .date(UPDATED_DATE)
            .montantCotisations(UPDATED_MONTANT_COTISATIONS)
            .nbHeures(UPDATED_NB_HEURES);
        return consommationPchE;
    }

    @BeforeEach
    public void initTest() {
        consommationPchE = createEntity(em);
    }

    @Test
    @Transactional
    void createConsommationPchE() throws Exception {
        int databaseSizeBeforeCreate = consommationPchERepository.findAll().size();
        // Create the ConsommationPchE
        restConsommationPchEMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(consommationPchE))
            )
            .andExpect(status().isCreated());

        // Validate the ConsommationPchE in the database
        List<ConsommationPchE> consommationPchEList = consommationPchERepository.findAll();
        assertThat(consommationPchEList).hasSize(databaseSizeBeforeCreate + 1);
        ConsommationPchE testConsommationPchE = consommationPchEList.get(consommationPchEList.size() - 1);
        assertThat(testConsommationPchE.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testConsommationPchE.getMontantCotisations()).isEqualByComparingTo(DEFAULT_MONTANT_COTISATIONS);
        assertThat(testConsommationPchE.getNbHeures()).isEqualByComparingTo(DEFAULT_NB_HEURES);
    }

    @Test
    @Transactional
    void createConsommationPchEWithExistingId() throws Exception {
        // Create the ConsommationPchE with an existing ID
        consommationPchE.setId(1L);

        int databaseSizeBeforeCreate = consommationPchERepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restConsommationPchEMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(consommationPchE))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsommationPchE in the database
        List<ConsommationPchE> consommationPchEList = consommationPchERepository.findAll();
        assertThat(consommationPchEList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllConsommationPchES() throws Exception {
        // Initialize the database
        consommationPchERepository.saveAndFlush(consommationPchE);

        // Get all the consommationPchEList
        restConsommationPchEMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(consommationPchE.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].montantCotisations").value(hasItem(sameNumber(DEFAULT_MONTANT_COTISATIONS))))
            .andExpect(jsonPath("$.[*].nbHeures").value(hasItem(sameNumber(DEFAULT_NB_HEURES))));
    }

    @Test
    @Transactional
    void getConsommationPchE() throws Exception {
        // Initialize the database
        consommationPchERepository.saveAndFlush(consommationPchE);

        // Get the consommationPchE
        restConsommationPchEMockMvc
            .perform(get(ENTITY_API_URL_ID, consommationPchE.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(consommationPchE.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.montantCotisations").value(sameNumber(DEFAULT_MONTANT_COTISATIONS)))
            .andExpect(jsonPath("$.nbHeures").value(sameNumber(DEFAULT_NB_HEURES)));
    }

    @Test
    @Transactional
    void getNonExistingConsommationPchE() throws Exception {
        // Get the consommationPchE
        restConsommationPchEMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewConsommationPchE() throws Exception {
        // Initialize the database
        consommationPchERepository.saveAndFlush(consommationPchE);

        int databaseSizeBeforeUpdate = consommationPchERepository.findAll().size();

        // Update the consommationPchE
        ConsommationPchE updatedConsommationPchE = consommationPchERepository.findById(consommationPchE.getId()).get();
        // Disconnect from session so that the updates on updatedConsommationPchE are not directly saved in db
        em.detach(updatedConsommationPchE);
        updatedConsommationPchE.date(UPDATED_DATE).montantCotisations(UPDATED_MONTANT_COTISATIONS).nbHeures(UPDATED_NB_HEURES);

        restConsommationPchEMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedConsommationPchE.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedConsommationPchE))
            )
            .andExpect(status().isOk());

        // Validate the ConsommationPchE in the database
        List<ConsommationPchE> consommationPchEList = consommationPchERepository.findAll();
        assertThat(consommationPchEList).hasSize(databaseSizeBeforeUpdate);
        ConsommationPchE testConsommationPchE = consommationPchEList.get(consommationPchEList.size() - 1);
        assertThat(testConsommationPchE.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testConsommationPchE.getMontantCotisations()).isEqualTo(UPDATED_MONTANT_COTISATIONS);
        assertThat(testConsommationPchE.getNbHeures()).isEqualTo(UPDATED_NB_HEURES);
    }

    @Test
    @Transactional
    void putNonExistingConsommationPchE() throws Exception {
        int databaseSizeBeforeUpdate = consommationPchERepository.findAll().size();
        consommationPchE.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConsommationPchEMockMvc
            .perform(
                put(ENTITY_API_URL_ID, consommationPchE.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(consommationPchE))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsommationPchE in the database
        List<ConsommationPchE> consommationPchEList = consommationPchERepository.findAll();
        assertThat(consommationPchEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchConsommationPchE() throws Exception {
        int databaseSizeBeforeUpdate = consommationPchERepository.findAll().size();
        consommationPchE.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConsommationPchEMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(consommationPchE))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsommationPchE in the database
        List<ConsommationPchE> consommationPchEList = consommationPchERepository.findAll();
        assertThat(consommationPchEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamConsommationPchE() throws Exception {
        int databaseSizeBeforeUpdate = consommationPchERepository.findAll().size();
        consommationPchE.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConsommationPchEMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(consommationPchE))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ConsommationPchE in the database
        List<ConsommationPchE> consommationPchEList = consommationPchERepository.findAll();
        assertThat(consommationPchEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateConsommationPchEWithPatch() throws Exception {
        // Initialize the database
        consommationPchERepository.saveAndFlush(consommationPchE);

        int databaseSizeBeforeUpdate = consommationPchERepository.findAll().size();

        // Update the consommationPchE using partial update
        ConsommationPchE partialUpdatedConsommationPchE = new ConsommationPchE();
        partialUpdatedConsommationPchE.setId(consommationPchE.getId());

        partialUpdatedConsommationPchE.montantCotisations(UPDATED_MONTANT_COTISATIONS);

        restConsommationPchEMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedConsommationPchE.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedConsommationPchE))
            )
            .andExpect(status().isOk());

        // Validate the ConsommationPchE in the database
        List<ConsommationPchE> consommationPchEList = consommationPchERepository.findAll();
        assertThat(consommationPchEList).hasSize(databaseSizeBeforeUpdate);
        ConsommationPchE testConsommationPchE = consommationPchEList.get(consommationPchEList.size() - 1);
        assertThat(testConsommationPchE.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testConsommationPchE.getMontantCotisations()).isEqualByComparingTo(UPDATED_MONTANT_COTISATIONS);
        assertThat(testConsommationPchE.getNbHeures()).isEqualByComparingTo(DEFAULT_NB_HEURES);
    }

    @Test
    @Transactional
    void fullUpdateConsommationPchEWithPatch() throws Exception {
        // Initialize the database
        consommationPchERepository.saveAndFlush(consommationPchE);

        int databaseSizeBeforeUpdate = consommationPchERepository.findAll().size();

        // Update the consommationPchE using partial update
        ConsommationPchE partialUpdatedConsommationPchE = new ConsommationPchE();
        partialUpdatedConsommationPchE.setId(consommationPchE.getId());

        partialUpdatedConsommationPchE.date(UPDATED_DATE).montantCotisations(UPDATED_MONTANT_COTISATIONS).nbHeures(UPDATED_NB_HEURES);

        restConsommationPchEMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedConsommationPchE.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedConsommationPchE))
            )
            .andExpect(status().isOk());

        // Validate the ConsommationPchE in the database
        List<ConsommationPchE> consommationPchEList = consommationPchERepository.findAll();
        assertThat(consommationPchEList).hasSize(databaseSizeBeforeUpdate);
        ConsommationPchE testConsommationPchE = consommationPchEList.get(consommationPchEList.size() - 1);
        assertThat(testConsommationPchE.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testConsommationPchE.getMontantCotisations()).isEqualByComparingTo(UPDATED_MONTANT_COTISATIONS);
        assertThat(testConsommationPchE.getNbHeures()).isEqualByComparingTo(UPDATED_NB_HEURES);
    }

    @Test
    @Transactional
    void patchNonExistingConsommationPchE() throws Exception {
        int databaseSizeBeforeUpdate = consommationPchERepository.findAll().size();
        consommationPchE.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConsommationPchEMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, consommationPchE.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(consommationPchE))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsommationPchE in the database
        List<ConsommationPchE> consommationPchEList = consommationPchERepository.findAll();
        assertThat(consommationPchEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchConsommationPchE() throws Exception {
        int databaseSizeBeforeUpdate = consommationPchERepository.findAll().size();
        consommationPchE.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConsommationPchEMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(consommationPchE))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsommationPchE in the database
        List<ConsommationPchE> consommationPchEList = consommationPchERepository.findAll();
        assertThat(consommationPchEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamConsommationPchE() throws Exception {
        int databaseSizeBeforeUpdate = consommationPchERepository.findAll().size();
        consommationPchE.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConsommationPchEMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(consommationPchE))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ConsommationPchE in the database
        List<ConsommationPchE> consommationPchEList = consommationPchERepository.findAll();
        assertThat(consommationPchEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteConsommationPchE() throws Exception {
        // Initialize the database
        consommationPchERepository.saveAndFlush(consommationPchE);

        int databaseSizeBeforeDelete = consommationPchERepository.findAll().size();

        // Delete the consommationPchE
        restConsommationPchEMockMvc
            .perform(delete(ENTITY_API_URL_ID, consommationPchE.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ConsommationPchE> consommationPchEList = consommationPchERepository.findAll();
        assertThat(consommationPchEList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
