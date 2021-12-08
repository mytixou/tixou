package fr.tixou.archisolver.web.rest;

import static fr.tixou.archisolver.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.tixou.archisolver.IntegrationTest;
import fr.tixou.archisolver.domain.SoldeCi;
import fr.tixou.archisolver.repository.SoldeCiRepository;
import java.math.BigDecimal;
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
 * Integration tests for the {@link SoldeCiResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SoldeCiResourceIT {

    private static final Integer DEFAULT_ANNEE = 1;
    private static final Integer UPDATED_ANNEE = 2;

    private static final BigDecimal DEFAULT_SOLDE_MONTANT_CI = new BigDecimal(1);
    private static final BigDecimal UPDATED_SOLDE_MONTANT_CI = new BigDecimal(2);

    private static final BigDecimal DEFAULT_SOLDE_MONTANT_CI_REC = new BigDecimal(1);
    private static final BigDecimal UPDATED_SOLDE_MONTANT_CI_REC = new BigDecimal(2);

    private static final String ENTITY_API_URL = "/api/solde-cis";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SoldeCiRepository soldeCiRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSoldeCiMockMvc;

    private SoldeCi soldeCi;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SoldeCi createEntity(EntityManager em) {
        SoldeCi soldeCi = new SoldeCi()
            .annee(DEFAULT_ANNEE)
            .soldeMontantCi(DEFAULT_SOLDE_MONTANT_CI)
            .soldeMontantCiRec(DEFAULT_SOLDE_MONTANT_CI_REC);
        return soldeCi;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SoldeCi createUpdatedEntity(EntityManager em) {
        SoldeCi soldeCi = new SoldeCi()
            .annee(UPDATED_ANNEE)
            .soldeMontantCi(UPDATED_SOLDE_MONTANT_CI)
            .soldeMontantCiRec(UPDATED_SOLDE_MONTANT_CI_REC);
        return soldeCi;
    }

    @BeforeEach
    public void initTest() {
        soldeCi = createEntity(em);
    }

    @Test
    @Transactional
    void createSoldeCi() throws Exception {
        int databaseSizeBeforeCreate = soldeCiRepository.findAll().size();
        // Create the SoldeCi
        restSoldeCiMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(soldeCi)))
            .andExpect(status().isCreated());

        // Validate the SoldeCi in the database
        List<SoldeCi> soldeCiList = soldeCiRepository.findAll();
        assertThat(soldeCiList).hasSize(databaseSizeBeforeCreate + 1);
        SoldeCi testSoldeCi = soldeCiList.get(soldeCiList.size() - 1);
        assertThat(testSoldeCi.getAnnee()).isEqualTo(DEFAULT_ANNEE);
        assertThat(testSoldeCi.getSoldeMontantCi()).isEqualByComparingTo(DEFAULT_SOLDE_MONTANT_CI);
        assertThat(testSoldeCi.getSoldeMontantCiRec()).isEqualByComparingTo(DEFAULT_SOLDE_MONTANT_CI_REC);
    }

    @Test
    @Transactional
    void createSoldeCiWithExistingId() throws Exception {
        // Create the SoldeCi with an existing ID
        soldeCi.setId(1L);

        int databaseSizeBeforeCreate = soldeCiRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSoldeCiMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(soldeCi)))
            .andExpect(status().isBadRequest());

        // Validate the SoldeCi in the database
        List<SoldeCi> soldeCiList = soldeCiRepository.findAll();
        assertThat(soldeCiList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSoldeCis() throws Exception {
        // Initialize the database
        soldeCiRepository.saveAndFlush(soldeCi);

        // Get all the soldeCiList
        restSoldeCiMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(soldeCi.getId().intValue())))
            .andExpect(jsonPath("$.[*].annee").value(hasItem(DEFAULT_ANNEE)))
            .andExpect(jsonPath("$.[*].soldeMontantCi").value(hasItem(sameNumber(DEFAULT_SOLDE_MONTANT_CI))))
            .andExpect(jsonPath("$.[*].soldeMontantCiRec").value(hasItem(sameNumber(DEFAULT_SOLDE_MONTANT_CI_REC))));
    }

    @Test
    @Transactional
    void getSoldeCi() throws Exception {
        // Initialize the database
        soldeCiRepository.saveAndFlush(soldeCi);

        // Get the soldeCi
        restSoldeCiMockMvc
            .perform(get(ENTITY_API_URL_ID, soldeCi.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(soldeCi.getId().intValue()))
            .andExpect(jsonPath("$.annee").value(DEFAULT_ANNEE))
            .andExpect(jsonPath("$.soldeMontantCi").value(sameNumber(DEFAULT_SOLDE_MONTANT_CI)))
            .andExpect(jsonPath("$.soldeMontantCiRec").value(sameNumber(DEFAULT_SOLDE_MONTANT_CI_REC)));
    }

    @Test
    @Transactional
    void getNonExistingSoldeCi() throws Exception {
        // Get the soldeCi
        restSoldeCiMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewSoldeCi() throws Exception {
        // Initialize the database
        soldeCiRepository.saveAndFlush(soldeCi);

        int databaseSizeBeforeUpdate = soldeCiRepository.findAll().size();

        // Update the soldeCi
        SoldeCi updatedSoldeCi = soldeCiRepository.findById(soldeCi.getId()).get();
        // Disconnect from session so that the updates on updatedSoldeCi are not directly saved in db
        em.detach(updatedSoldeCi);
        updatedSoldeCi.annee(UPDATED_ANNEE).soldeMontantCi(UPDATED_SOLDE_MONTANT_CI).soldeMontantCiRec(UPDATED_SOLDE_MONTANT_CI_REC);

        restSoldeCiMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSoldeCi.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedSoldeCi))
            )
            .andExpect(status().isOk());

        // Validate the SoldeCi in the database
        List<SoldeCi> soldeCiList = soldeCiRepository.findAll();
        assertThat(soldeCiList).hasSize(databaseSizeBeforeUpdate);
        SoldeCi testSoldeCi = soldeCiList.get(soldeCiList.size() - 1);
        assertThat(testSoldeCi.getAnnee()).isEqualTo(UPDATED_ANNEE);
        assertThat(testSoldeCi.getSoldeMontantCi()).isEqualTo(UPDATED_SOLDE_MONTANT_CI);
        assertThat(testSoldeCi.getSoldeMontantCiRec()).isEqualTo(UPDATED_SOLDE_MONTANT_CI_REC);
    }

    @Test
    @Transactional
    void putNonExistingSoldeCi() throws Exception {
        int databaseSizeBeforeUpdate = soldeCiRepository.findAll().size();
        soldeCi.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSoldeCiMockMvc
            .perform(
                put(ENTITY_API_URL_ID, soldeCi.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(soldeCi))
            )
            .andExpect(status().isBadRequest());

        // Validate the SoldeCi in the database
        List<SoldeCi> soldeCiList = soldeCiRepository.findAll();
        assertThat(soldeCiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSoldeCi() throws Exception {
        int databaseSizeBeforeUpdate = soldeCiRepository.findAll().size();
        soldeCi.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSoldeCiMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(soldeCi))
            )
            .andExpect(status().isBadRequest());

        // Validate the SoldeCi in the database
        List<SoldeCi> soldeCiList = soldeCiRepository.findAll();
        assertThat(soldeCiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSoldeCi() throws Exception {
        int databaseSizeBeforeUpdate = soldeCiRepository.findAll().size();
        soldeCi.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSoldeCiMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(soldeCi)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the SoldeCi in the database
        List<SoldeCi> soldeCiList = soldeCiRepository.findAll();
        assertThat(soldeCiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSoldeCiWithPatch() throws Exception {
        // Initialize the database
        soldeCiRepository.saveAndFlush(soldeCi);

        int databaseSizeBeforeUpdate = soldeCiRepository.findAll().size();

        // Update the soldeCi using partial update
        SoldeCi partialUpdatedSoldeCi = new SoldeCi();
        partialUpdatedSoldeCi.setId(soldeCi.getId());

        restSoldeCiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSoldeCi.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSoldeCi))
            )
            .andExpect(status().isOk());

        // Validate the SoldeCi in the database
        List<SoldeCi> soldeCiList = soldeCiRepository.findAll();
        assertThat(soldeCiList).hasSize(databaseSizeBeforeUpdate);
        SoldeCi testSoldeCi = soldeCiList.get(soldeCiList.size() - 1);
        assertThat(testSoldeCi.getAnnee()).isEqualTo(DEFAULT_ANNEE);
        assertThat(testSoldeCi.getSoldeMontantCi()).isEqualByComparingTo(DEFAULT_SOLDE_MONTANT_CI);
        assertThat(testSoldeCi.getSoldeMontantCiRec()).isEqualByComparingTo(DEFAULT_SOLDE_MONTANT_CI_REC);
    }

    @Test
    @Transactional
    void fullUpdateSoldeCiWithPatch() throws Exception {
        // Initialize the database
        soldeCiRepository.saveAndFlush(soldeCi);

        int databaseSizeBeforeUpdate = soldeCiRepository.findAll().size();

        // Update the soldeCi using partial update
        SoldeCi partialUpdatedSoldeCi = new SoldeCi();
        partialUpdatedSoldeCi.setId(soldeCi.getId());

        partialUpdatedSoldeCi.annee(UPDATED_ANNEE).soldeMontantCi(UPDATED_SOLDE_MONTANT_CI).soldeMontantCiRec(UPDATED_SOLDE_MONTANT_CI_REC);

        restSoldeCiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSoldeCi.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSoldeCi))
            )
            .andExpect(status().isOk());

        // Validate the SoldeCi in the database
        List<SoldeCi> soldeCiList = soldeCiRepository.findAll();
        assertThat(soldeCiList).hasSize(databaseSizeBeforeUpdate);
        SoldeCi testSoldeCi = soldeCiList.get(soldeCiList.size() - 1);
        assertThat(testSoldeCi.getAnnee()).isEqualTo(UPDATED_ANNEE);
        assertThat(testSoldeCi.getSoldeMontantCi()).isEqualByComparingTo(UPDATED_SOLDE_MONTANT_CI);
        assertThat(testSoldeCi.getSoldeMontantCiRec()).isEqualByComparingTo(UPDATED_SOLDE_MONTANT_CI_REC);
    }

    @Test
    @Transactional
    void patchNonExistingSoldeCi() throws Exception {
        int databaseSizeBeforeUpdate = soldeCiRepository.findAll().size();
        soldeCi.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSoldeCiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, soldeCi.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(soldeCi))
            )
            .andExpect(status().isBadRequest());

        // Validate the SoldeCi in the database
        List<SoldeCi> soldeCiList = soldeCiRepository.findAll();
        assertThat(soldeCiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSoldeCi() throws Exception {
        int databaseSizeBeforeUpdate = soldeCiRepository.findAll().size();
        soldeCi.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSoldeCiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(soldeCi))
            )
            .andExpect(status().isBadRequest());

        // Validate the SoldeCi in the database
        List<SoldeCi> soldeCiList = soldeCiRepository.findAll();
        assertThat(soldeCiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSoldeCi() throws Exception {
        int databaseSizeBeforeUpdate = soldeCiRepository.findAll().size();
        soldeCi.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSoldeCiMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(soldeCi)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the SoldeCi in the database
        List<SoldeCi> soldeCiList = soldeCiRepository.findAll();
        assertThat(soldeCiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSoldeCi() throws Exception {
        // Initialize the database
        soldeCiRepository.saveAndFlush(soldeCi);

        int databaseSizeBeforeDelete = soldeCiRepository.findAll().size();

        // Delete the soldeCi
        restSoldeCiMockMvc
            .perform(delete(ENTITY_API_URL_ID, soldeCi.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SoldeCi> soldeCiList = soldeCiRepository.findAll();
        assertThat(soldeCiList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
