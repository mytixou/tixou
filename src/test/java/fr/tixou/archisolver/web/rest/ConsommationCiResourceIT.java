package fr.tixou.archisolver.web.rest;

import static fr.tixou.archisolver.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.tixou.archisolver.IntegrationTest;
import fr.tixou.archisolver.domain.ConsommationCi;
import fr.tixou.archisolver.repository.ConsommationCiRepository;
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
 * Integration tests for the {@link ConsommationCiResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ConsommationCiResourceIT {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final BigDecimal DEFAULT_MONTANT_CI = new BigDecimal(1);
    private static final BigDecimal UPDATED_MONTANT_CI = new BigDecimal(2);

    private static final BigDecimal DEFAULT_MONTANT_RECUPERABLE = new BigDecimal(1);
    private static final BigDecimal UPDATED_MONTANT_RECUPERABLE = new BigDecimal(2);

    private static final String ENTITY_API_URL = "/api/consommation-cis";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ConsommationCiRepository consommationCiRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restConsommationCiMockMvc;

    private ConsommationCi consommationCi;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ConsommationCi createEntity(EntityManager em) {
        ConsommationCi consommationCi = new ConsommationCi()
            .date(DEFAULT_DATE)
            .montantCi(DEFAULT_MONTANT_CI)
            .montantRecuperable(DEFAULT_MONTANT_RECUPERABLE);
        return consommationCi;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ConsommationCi createUpdatedEntity(EntityManager em) {
        ConsommationCi consommationCi = new ConsommationCi()
            .date(UPDATED_DATE)
            .montantCi(UPDATED_MONTANT_CI)
            .montantRecuperable(UPDATED_MONTANT_RECUPERABLE);
        return consommationCi;
    }

    @BeforeEach
    public void initTest() {
        consommationCi = createEntity(em);
    }

    @Test
    @Transactional
    void createConsommationCi() throws Exception {
        int databaseSizeBeforeCreate = consommationCiRepository.findAll().size();
        // Create the ConsommationCi
        restConsommationCiMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(consommationCi))
            )
            .andExpect(status().isCreated());

        // Validate the ConsommationCi in the database
        List<ConsommationCi> consommationCiList = consommationCiRepository.findAll();
        assertThat(consommationCiList).hasSize(databaseSizeBeforeCreate + 1);
        ConsommationCi testConsommationCi = consommationCiList.get(consommationCiList.size() - 1);
        assertThat(testConsommationCi.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testConsommationCi.getMontantCi()).isEqualByComparingTo(DEFAULT_MONTANT_CI);
        assertThat(testConsommationCi.getMontantRecuperable()).isEqualByComparingTo(DEFAULT_MONTANT_RECUPERABLE);
    }

    @Test
    @Transactional
    void createConsommationCiWithExistingId() throws Exception {
        // Create the ConsommationCi with an existing ID
        consommationCi.setId(1L);

        int databaseSizeBeforeCreate = consommationCiRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restConsommationCiMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(consommationCi))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsommationCi in the database
        List<ConsommationCi> consommationCiList = consommationCiRepository.findAll();
        assertThat(consommationCiList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllConsommationCis() throws Exception {
        // Initialize the database
        consommationCiRepository.saveAndFlush(consommationCi);

        // Get all the consommationCiList
        restConsommationCiMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(consommationCi.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].montantCi").value(hasItem(sameNumber(DEFAULT_MONTANT_CI))))
            .andExpect(jsonPath("$.[*].montantRecuperable").value(hasItem(sameNumber(DEFAULT_MONTANT_RECUPERABLE))));
    }

    @Test
    @Transactional
    void getConsommationCi() throws Exception {
        // Initialize the database
        consommationCiRepository.saveAndFlush(consommationCi);

        // Get the consommationCi
        restConsommationCiMockMvc
            .perform(get(ENTITY_API_URL_ID, consommationCi.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(consommationCi.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.montantCi").value(sameNumber(DEFAULT_MONTANT_CI)))
            .andExpect(jsonPath("$.montantRecuperable").value(sameNumber(DEFAULT_MONTANT_RECUPERABLE)));
    }

    @Test
    @Transactional
    void getNonExistingConsommationCi() throws Exception {
        // Get the consommationCi
        restConsommationCiMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewConsommationCi() throws Exception {
        // Initialize the database
        consommationCiRepository.saveAndFlush(consommationCi);

        int databaseSizeBeforeUpdate = consommationCiRepository.findAll().size();

        // Update the consommationCi
        ConsommationCi updatedConsommationCi = consommationCiRepository.findById(consommationCi.getId()).get();
        // Disconnect from session so that the updates on updatedConsommationCi are not directly saved in db
        em.detach(updatedConsommationCi);
        updatedConsommationCi.date(UPDATED_DATE).montantCi(UPDATED_MONTANT_CI).montantRecuperable(UPDATED_MONTANT_RECUPERABLE);

        restConsommationCiMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedConsommationCi.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedConsommationCi))
            )
            .andExpect(status().isOk());

        // Validate the ConsommationCi in the database
        List<ConsommationCi> consommationCiList = consommationCiRepository.findAll();
        assertThat(consommationCiList).hasSize(databaseSizeBeforeUpdate);
        ConsommationCi testConsommationCi = consommationCiList.get(consommationCiList.size() - 1);
        assertThat(testConsommationCi.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testConsommationCi.getMontantCi()).isEqualTo(UPDATED_MONTANT_CI);
        assertThat(testConsommationCi.getMontantRecuperable()).isEqualTo(UPDATED_MONTANT_RECUPERABLE);
    }

    @Test
    @Transactional
    void putNonExistingConsommationCi() throws Exception {
        int databaseSizeBeforeUpdate = consommationCiRepository.findAll().size();
        consommationCi.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConsommationCiMockMvc
            .perform(
                put(ENTITY_API_URL_ID, consommationCi.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(consommationCi))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsommationCi in the database
        List<ConsommationCi> consommationCiList = consommationCiRepository.findAll();
        assertThat(consommationCiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchConsommationCi() throws Exception {
        int databaseSizeBeforeUpdate = consommationCiRepository.findAll().size();
        consommationCi.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConsommationCiMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(consommationCi))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsommationCi in the database
        List<ConsommationCi> consommationCiList = consommationCiRepository.findAll();
        assertThat(consommationCiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamConsommationCi() throws Exception {
        int databaseSizeBeforeUpdate = consommationCiRepository.findAll().size();
        consommationCi.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConsommationCiMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(consommationCi)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ConsommationCi in the database
        List<ConsommationCi> consommationCiList = consommationCiRepository.findAll();
        assertThat(consommationCiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateConsommationCiWithPatch() throws Exception {
        // Initialize the database
        consommationCiRepository.saveAndFlush(consommationCi);

        int databaseSizeBeforeUpdate = consommationCiRepository.findAll().size();

        // Update the consommationCi using partial update
        ConsommationCi partialUpdatedConsommationCi = new ConsommationCi();
        partialUpdatedConsommationCi.setId(consommationCi.getId());

        partialUpdatedConsommationCi.date(UPDATED_DATE);

        restConsommationCiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedConsommationCi.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedConsommationCi))
            )
            .andExpect(status().isOk());

        // Validate the ConsommationCi in the database
        List<ConsommationCi> consommationCiList = consommationCiRepository.findAll();
        assertThat(consommationCiList).hasSize(databaseSizeBeforeUpdate);
        ConsommationCi testConsommationCi = consommationCiList.get(consommationCiList.size() - 1);
        assertThat(testConsommationCi.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testConsommationCi.getMontantCi()).isEqualByComparingTo(DEFAULT_MONTANT_CI);
        assertThat(testConsommationCi.getMontantRecuperable()).isEqualByComparingTo(DEFAULT_MONTANT_RECUPERABLE);
    }

    @Test
    @Transactional
    void fullUpdateConsommationCiWithPatch() throws Exception {
        // Initialize the database
        consommationCiRepository.saveAndFlush(consommationCi);

        int databaseSizeBeforeUpdate = consommationCiRepository.findAll().size();

        // Update the consommationCi using partial update
        ConsommationCi partialUpdatedConsommationCi = new ConsommationCi();
        partialUpdatedConsommationCi.setId(consommationCi.getId());

        partialUpdatedConsommationCi.date(UPDATED_DATE).montantCi(UPDATED_MONTANT_CI).montantRecuperable(UPDATED_MONTANT_RECUPERABLE);

        restConsommationCiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedConsommationCi.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedConsommationCi))
            )
            .andExpect(status().isOk());

        // Validate the ConsommationCi in the database
        List<ConsommationCi> consommationCiList = consommationCiRepository.findAll();
        assertThat(consommationCiList).hasSize(databaseSizeBeforeUpdate);
        ConsommationCi testConsommationCi = consommationCiList.get(consommationCiList.size() - 1);
        assertThat(testConsommationCi.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testConsommationCi.getMontantCi()).isEqualByComparingTo(UPDATED_MONTANT_CI);
        assertThat(testConsommationCi.getMontantRecuperable()).isEqualByComparingTo(UPDATED_MONTANT_RECUPERABLE);
    }

    @Test
    @Transactional
    void patchNonExistingConsommationCi() throws Exception {
        int databaseSizeBeforeUpdate = consommationCiRepository.findAll().size();
        consommationCi.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConsommationCiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, consommationCi.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(consommationCi))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsommationCi in the database
        List<ConsommationCi> consommationCiList = consommationCiRepository.findAll();
        assertThat(consommationCiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchConsommationCi() throws Exception {
        int databaseSizeBeforeUpdate = consommationCiRepository.findAll().size();
        consommationCi.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConsommationCiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(consommationCi))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsommationCi in the database
        List<ConsommationCi> consommationCiList = consommationCiRepository.findAll();
        assertThat(consommationCiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamConsommationCi() throws Exception {
        int databaseSizeBeforeUpdate = consommationCiRepository.findAll().size();
        consommationCi.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConsommationCiMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(consommationCi))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ConsommationCi in the database
        List<ConsommationCi> consommationCiList = consommationCiRepository.findAll();
        assertThat(consommationCiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteConsommationCi() throws Exception {
        // Initialize the database
        consommationCiRepository.saveAndFlush(consommationCi);

        int databaseSizeBeforeDelete = consommationCiRepository.findAll().size();

        // Delete the consommationCi
        restConsommationCiMockMvc
            .perform(delete(ENTITY_API_URL_ID, consommationCi.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ConsommationCi> consommationCiList = consommationCiRepository.findAll();
        assertThat(consommationCiList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
