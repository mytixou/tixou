package fr.tixou.archisolver.web.rest;

import static fr.tixou.archisolver.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.tixou.archisolver.IntegrationTest;
import fr.tixou.archisolver.domain.ConsommationPch;
import fr.tixou.archisolver.repository.ConsommationPchRepository;
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
 * Integration tests for the {@link ConsommationPchResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ConsommationPchResourceIT {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final BigDecimal DEFAULT_MONTANT_COTISATIONS = new BigDecimal(1);
    private static final BigDecimal UPDATED_MONTANT_COTISATIONS = new BigDecimal(2);

    private static final BigDecimal DEFAULT_NB_HEURES = new BigDecimal(1);
    private static final BigDecimal UPDATED_NB_HEURES = new BigDecimal(2);

    private static final String ENTITY_API_URL = "/api/consommation-pches";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ConsommationPchRepository consommationPchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restConsommationPchMockMvc;

    private ConsommationPch consommationPch;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ConsommationPch createEntity(EntityManager em) {
        ConsommationPch consommationPch = new ConsommationPch()
            .date(DEFAULT_DATE)
            .montantCotisations(DEFAULT_MONTANT_COTISATIONS)
            .nbHeures(DEFAULT_NB_HEURES);
        return consommationPch;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ConsommationPch createUpdatedEntity(EntityManager em) {
        ConsommationPch consommationPch = new ConsommationPch()
            .date(UPDATED_DATE)
            .montantCotisations(UPDATED_MONTANT_COTISATIONS)
            .nbHeures(UPDATED_NB_HEURES);
        return consommationPch;
    }

    @BeforeEach
    public void initTest() {
        consommationPch = createEntity(em);
    }

    @Test
    @Transactional
    void createConsommationPch() throws Exception {
        int databaseSizeBeforeCreate = consommationPchRepository.findAll().size();
        // Create the ConsommationPch
        restConsommationPchMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(consommationPch))
            )
            .andExpect(status().isCreated());

        // Validate the ConsommationPch in the database
        List<ConsommationPch> consommationPchList = consommationPchRepository.findAll();
        assertThat(consommationPchList).hasSize(databaseSizeBeforeCreate + 1);
        ConsommationPch testConsommationPch = consommationPchList.get(consommationPchList.size() - 1);
        assertThat(testConsommationPch.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testConsommationPch.getMontantCotisations()).isEqualByComparingTo(DEFAULT_MONTANT_COTISATIONS);
        assertThat(testConsommationPch.getNbHeures()).isEqualByComparingTo(DEFAULT_NB_HEURES);
    }

    @Test
    @Transactional
    void createConsommationPchWithExistingId() throws Exception {
        // Create the ConsommationPch with an existing ID
        consommationPch.setId(1L);

        int databaseSizeBeforeCreate = consommationPchRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restConsommationPchMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(consommationPch))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsommationPch in the database
        List<ConsommationPch> consommationPchList = consommationPchRepository.findAll();
        assertThat(consommationPchList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllConsommationPches() throws Exception {
        // Initialize the database
        consommationPchRepository.saveAndFlush(consommationPch);

        // Get all the consommationPchList
        restConsommationPchMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(consommationPch.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].montantCotisations").value(hasItem(sameNumber(DEFAULT_MONTANT_COTISATIONS))))
            .andExpect(jsonPath("$.[*].nbHeures").value(hasItem(sameNumber(DEFAULT_NB_HEURES))));
    }

    @Test
    @Transactional
    void getConsommationPch() throws Exception {
        // Initialize the database
        consommationPchRepository.saveAndFlush(consommationPch);

        // Get the consommationPch
        restConsommationPchMockMvc
            .perform(get(ENTITY_API_URL_ID, consommationPch.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(consommationPch.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.montantCotisations").value(sameNumber(DEFAULT_MONTANT_COTISATIONS)))
            .andExpect(jsonPath("$.nbHeures").value(sameNumber(DEFAULT_NB_HEURES)));
    }

    @Test
    @Transactional
    void getNonExistingConsommationPch() throws Exception {
        // Get the consommationPch
        restConsommationPchMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewConsommationPch() throws Exception {
        // Initialize the database
        consommationPchRepository.saveAndFlush(consommationPch);

        int databaseSizeBeforeUpdate = consommationPchRepository.findAll().size();

        // Update the consommationPch
        ConsommationPch updatedConsommationPch = consommationPchRepository.findById(consommationPch.getId()).get();
        // Disconnect from session so that the updates on updatedConsommationPch are not directly saved in db
        em.detach(updatedConsommationPch);
        updatedConsommationPch.date(UPDATED_DATE).montantCotisations(UPDATED_MONTANT_COTISATIONS).nbHeures(UPDATED_NB_HEURES);

        restConsommationPchMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedConsommationPch.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedConsommationPch))
            )
            .andExpect(status().isOk());

        // Validate the ConsommationPch in the database
        List<ConsommationPch> consommationPchList = consommationPchRepository.findAll();
        assertThat(consommationPchList).hasSize(databaseSizeBeforeUpdate);
        ConsommationPch testConsommationPch = consommationPchList.get(consommationPchList.size() - 1);
        assertThat(testConsommationPch.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testConsommationPch.getMontantCotisations()).isEqualTo(UPDATED_MONTANT_COTISATIONS);
        assertThat(testConsommationPch.getNbHeures()).isEqualTo(UPDATED_NB_HEURES);
    }

    @Test
    @Transactional
    void putNonExistingConsommationPch() throws Exception {
        int databaseSizeBeforeUpdate = consommationPchRepository.findAll().size();
        consommationPch.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConsommationPchMockMvc
            .perform(
                put(ENTITY_API_URL_ID, consommationPch.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(consommationPch))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsommationPch in the database
        List<ConsommationPch> consommationPchList = consommationPchRepository.findAll();
        assertThat(consommationPchList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchConsommationPch() throws Exception {
        int databaseSizeBeforeUpdate = consommationPchRepository.findAll().size();
        consommationPch.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConsommationPchMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(consommationPch))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsommationPch in the database
        List<ConsommationPch> consommationPchList = consommationPchRepository.findAll();
        assertThat(consommationPchList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamConsommationPch() throws Exception {
        int databaseSizeBeforeUpdate = consommationPchRepository.findAll().size();
        consommationPch.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConsommationPchMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(consommationPch))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ConsommationPch in the database
        List<ConsommationPch> consommationPchList = consommationPchRepository.findAll();
        assertThat(consommationPchList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateConsommationPchWithPatch() throws Exception {
        // Initialize the database
        consommationPchRepository.saveAndFlush(consommationPch);

        int databaseSizeBeforeUpdate = consommationPchRepository.findAll().size();

        // Update the consommationPch using partial update
        ConsommationPch partialUpdatedConsommationPch = new ConsommationPch();
        partialUpdatedConsommationPch.setId(consommationPch.getId());

        partialUpdatedConsommationPch.date(UPDATED_DATE).nbHeures(UPDATED_NB_HEURES);

        restConsommationPchMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedConsommationPch.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedConsommationPch))
            )
            .andExpect(status().isOk());

        // Validate the ConsommationPch in the database
        List<ConsommationPch> consommationPchList = consommationPchRepository.findAll();
        assertThat(consommationPchList).hasSize(databaseSizeBeforeUpdate);
        ConsommationPch testConsommationPch = consommationPchList.get(consommationPchList.size() - 1);
        assertThat(testConsommationPch.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testConsommationPch.getMontantCotisations()).isEqualByComparingTo(DEFAULT_MONTANT_COTISATIONS);
        assertThat(testConsommationPch.getNbHeures()).isEqualByComparingTo(UPDATED_NB_HEURES);
    }

    @Test
    @Transactional
    void fullUpdateConsommationPchWithPatch() throws Exception {
        // Initialize the database
        consommationPchRepository.saveAndFlush(consommationPch);

        int databaseSizeBeforeUpdate = consommationPchRepository.findAll().size();

        // Update the consommationPch using partial update
        ConsommationPch partialUpdatedConsommationPch = new ConsommationPch();
        partialUpdatedConsommationPch.setId(consommationPch.getId());

        partialUpdatedConsommationPch.date(UPDATED_DATE).montantCotisations(UPDATED_MONTANT_COTISATIONS).nbHeures(UPDATED_NB_HEURES);

        restConsommationPchMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedConsommationPch.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedConsommationPch))
            )
            .andExpect(status().isOk());

        // Validate the ConsommationPch in the database
        List<ConsommationPch> consommationPchList = consommationPchRepository.findAll();
        assertThat(consommationPchList).hasSize(databaseSizeBeforeUpdate);
        ConsommationPch testConsommationPch = consommationPchList.get(consommationPchList.size() - 1);
        assertThat(testConsommationPch.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testConsommationPch.getMontantCotisations()).isEqualByComparingTo(UPDATED_MONTANT_COTISATIONS);
        assertThat(testConsommationPch.getNbHeures()).isEqualByComparingTo(UPDATED_NB_HEURES);
    }

    @Test
    @Transactional
    void patchNonExistingConsommationPch() throws Exception {
        int databaseSizeBeforeUpdate = consommationPchRepository.findAll().size();
        consommationPch.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConsommationPchMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, consommationPch.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(consommationPch))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsommationPch in the database
        List<ConsommationPch> consommationPchList = consommationPchRepository.findAll();
        assertThat(consommationPchList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchConsommationPch() throws Exception {
        int databaseSizeBeforeUpdate = consommationPchRepository.findAll().size();
        consommationPch.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConsommationPchMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(consommationPch))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsommationPch in the database
        List<ConsommationPch> consommationPchList = consommationPchRepository.findAll();
        assertThat(consommationPchList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamConsommationPch() throws Exception {
        int databaseSizeBeforeUpdate = consommationPchRepository.findAll().size();
        consommationPch.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConsommationPchMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(consommationPch))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ConsommationPch in the database
        List<ConsommationPch> consommationPchList = consommationPchRepository.findAll();
        assertThat(consommationPchList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteConsommationPch() throws Exception {
        // Initialize the database
        consommationPchRepository.saveAndFlush(consommationPch);

        int databaseSizeBeforeDelete = consommationPchRepository.findAll().size();

        // Delete the consommationPch
        restConsommationPchMockMvc
            .perform(delete(ENTITY_API_URL_ID, consommationPch.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ConsommationPch> consommationPchList = consommationPchRepository.findAll();
        assertThat(consommationPchList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
