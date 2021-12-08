package fr.tixou.archisolver.web.rest;

import static fr.tixou.archisolver.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.tixou.archisolver.IntegrationTest;
import fr.tixou.archisolver.domain.SoldePchE;
import fr.tixou.archisolver.repository.SoldePchERepository;
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
 * Integration tests for the {@link SoldePchEResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SoldePchEResourceIT {

    private static final Integer DEFAULT_ANNEE = 1;
    private static final Integer UPDATED_ANNEE = 2;

    private static final Integer DEFAULT_MOIS = 1;
    private static final Integer UPDATED_MOIS = 2;

    private static final BigDecimal DEFAULT_SOLDE_MONTANT_PCH_E = new BigDecimal(1);
    private static final BigDecimal UPDATED_SOLDE_MONTANT_PCH_E = new BigDecimal(2);

    private static final BigDecimal DEFAULT_SOLDE_HEURE_PCH_E = new BigDecimal(1);
    private static final BigDecimal UPDATED_SOLDE_HEURE_PCH_E = new BigDecimal(2);

    private static final String ENTITY_API_URL = "/api/solde-pch-es";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SoldePchERepository soldePchERepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSoldePchEMockMvc;

    private SoldePchE soldePchE;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SoldePchE createEntity(EntityManager em) {
        SoldePchE soldePchE = new SoldePchE()
            .annee(DEFAULT_ANNEE)
            .mois(DEFAULT_MOIS)
            .soldeMontantPchE(DEFAULT_SOLDE_MONTANT_PCH_E)
            .soldeHeurePchE(DEFAULT_SOLDE_HEURE_PCH_E);
        return soldePchE;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SoldePchE createUpdatedEntity(EntityManager em) {
        SoldePchE soldePchE = new SoldePchE()
            .annee(UPDATED_ANNEE)
            .mois(UPDATED_MOIS)
            .soldeMontantPchE(UPDATED_SOLDE_MONTANT_PCH_E)
            .soldeHeurePchE(UPDATED_SOLDE_HEURE_PCH_E);
        return soldePchE;
    }

    @BeforeEach
    public void initTest() {
        soldePchE = createEntity(em);
    }

    @Test
    @Transactional
    void createSoldePchE() throws Exception {
        int databaseSizeBeforeCreate = soldePchERepository.findAll().size();
        // Create the SoldePchE
        restSoldePchEMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(soldePchE)))
            .andExpect(status().isCreated());

        // Validate the SoldePchE in the database
        List<SoldePchE> soldePchEList = soldePchERepository.findAll();
        assertThat(soldePchEList).hasSize(databaseSizeBeforeCreate + 1);
        SoldePchE testSoldePchE = soldePchEList.get(soldePchEList.size() - 1);
        assertThat(testSoldePchE.getAnnee()).isEqualTo(DEFAULT_ANNEE);
        assertThat(testSoldePchE.getMois()).isEqualTo(DEFAULT_MOIS);
        assertThat(testSoldePchE.getSoldeMontantPchE()).isEqualByComparingTo(DEFAULT_SOLDE_MONTANT_PCH_E);
        assertThat(testSoldePchE.getSoldeHeurePchE()).isEqualByComparingTo(DEFAULT_SOLDE_HEURE_PCH_E);
    }

    @Test
    @Transactional
    void createSoldePchEWithExistingId() throws Exception {
        // Create the SoldePchE with an existing ID
        soldePchE.setId(1L);

        int databaseSizeBeforeCreate = soldePchERepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSoldePchEMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(soldePchE)))
            .andExpect(status().isBadRequest());

        // Validate the SoldePchE in the database
        List<SoldePchE> soldePchEList = soldePchERepository.findAll();
        assertThat(soldePchEList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSoldePchES() throws Exception {
        // Initialize the database
        soldePchERepository.saveAndFlush(soldePchE);

        // Get all the soldePchEList
        restSoldePchEMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(soldePchE.getId().intValue())))
            .andExpect(jsonPath("$.[*].annee").value(hasItem(DEFAULT_ANNEE)))
            .andExpect(jsonPath("$.[*].mois").value(hasItem(DEFAULT_MOIS)))
            .andExpect(jsonPath("$.[*].soldeMontantPchE").value(hasItem(sameNumber(DEFAULT_SOLDE_MONTANT_PCH_E))))
            .andExpect(jsonPath("$.[*].soldeHeurePchE").value(hasItem(sameNumber(DEFAULT_SOLDE_HEURE_PCH_E))));
    }

    @Test
    @Transactional
    void getSoldePchE() throws Exception {
        // Initialize the database
        soldePchERepository.saveAndFlush(soldePchE);

        // Get the soldePchE
        restSoldePchEMockMvc
            .perform(get(ENTITY_API_URL_ID, soldePchE.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(soldePchE.getId().intValue()))
            .andExpect(jsonPath("$.annee").value(DEFAULT_ANNEE))
            .andExpect(jsonPath("$.mois").value(DEFAULT_MOIS))
            .andExpect(jsonPath("$.soldeMontantPchE").value(sameNumber(DEFAULT_SOLDE_MONTANT_PCH_E)))
            .andExpect(jsonPath("$.soldeHeurePchE").value(sameNumber(DEFAULT_SOLDE_HEURE_PCH_E)));
    }

    @Test
    @Transactional
    void getNonExistingSoldePchE() throws Exception {
        // Get the soldePchE
        restSoldePchEMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewSoldePchE() throws Exception {
        // Initialize the database
        soldePchERepository.saveAndFlush(soldePchE);

        int databaseSizeBeforeUpdate = soldePchERepository.findAll().size();

        // Update the soldePchE
        SoldePchE updatedSoldePchE = soldePchERepository.findById(soldePchE.getId()).get();
        // Disconnect from session so that the updates on updatedSoldePchE are not directly saved in db
        em.detach(updatedSoldePchE);
        updatedSoldePchE
            .annee(UPDATED_ANNEE)
            .mois(UPDATED_MOIS)
            .soldeMontantPchE(UPDATED_SOLDE_MONTANT_PCH_E)
            .soldeHeurePchE(UPDATED_SOLDE_HEURE_PCH_E);

        restSoldePchEMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSoldePchE.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedSoldePchE))
            )
            .andExpect(status().isOk());

        // Validate the SoldePchE in the database
        List<SoldePchE> soldePchEList = soldePchERepository.findAll();
        assertThat(soldePchEList).hasSize(databaseSizeBeforeUpdate);
        SoldePchE testSoldePchE = soldePchEList.get(soldePchEList.size() - 1);
        assertThat(testSoldePchE.getAnnee()).isEqualTo(UPDATED_ANNEE);
        assertThat(testSoldePchE.getMois()).isEqualTo(UPDATED_MOIS);
        assertThat(testSoldePchE.getSoldeMontantPchE()).isEqualTo(UPDATED_SOLDE_MONTANT_PCH_E);
        assertThat(testSoldePchE.getSoldeHeurePchE()).isEqualTo(UPDATED_SOLDE_HEURE_PCH_E);
    }

    @Test
    @Transactional
    void putNonExistingSoldePchE() throws Exception {
        int databaseSizeBeforeUpdate = soldePchERepository.findAll().size();
        soldePchE.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSoldePchEMockMvc
            .perform(
                put(ENTITY_API_URL_ID, soldePchE.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(soldePchE))
            )
            .andExpect(status().isBadRequest());

        // Validate the SoldePchE in the database
        List<SoldePchE> soldePchEList = soldePchERepository.findAll();
        assertThat(soldePchEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSoldePchE() throws Exception {
        int databaseSizeBeforeUpdate = soldePchERepository.findAll().size();
        soldePchE.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSoldePchEMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(soldePchE))
            )
            .andExpect(status().isBadRequest());

        // Validate the SoldePchE in the database
        List<SoldePchE> soldePchEList = soldePchERepository.findAll();
        assertThat(soldePchEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSoldePchE() throws Exception {
        int databaseSizeBeforeUpdate = soldePchERepository.findAll().size();
        soldePchE.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSoldePchEMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(soldePchE)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the SoldePchE in the database
        List<SoldePchE> soldePchEList = soldePchERepository.findAll();
        assertThat(soldePchEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSoldePchEWithPatch() throws Exception {
        // Initialize the database
        soldePchERepository.saveAndFlush(soldePchE);

        int databaseSizeBeforeUpdate = soldePchERepository.findAll().size();

        // Update the soldePchE using partial update
        SoldePchE partialUpdatedSoldePchE = new SoldePchE();
        partialUpdatedSoldePchE.setId(soldePchE.getId());

        partialUpdatedSoldePchE.annee(UPDATED_ANNEE).soldeHeurePchE(UPDATED_SOLDE_HEURE_PCH_E);

        restSoldePchEMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSoldePchE.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSoldePchE))
            )
            .andExpect(status().isOk());

        // Validate the SoldePchE in the database
        List<SoldePchE> soldePchEList = soldePchERepository.findAll();
        assertThat(soldePchEList).hasSize(databaseSizeBeforeUpdate);
        SoldePchE testSoldePchE = soldePchEList.get(soldePchEList.size() - 1);
        assertThat(testSoldePchE.getAnnee()).isEqualTo(UPDATED_ANNEE);
        assertThat(testSoldePchE.getMois()).isEqualTo(DEFAULT_MOIS);
        assertThat(testSoldePchE.getSoldeMontantPchE()).isEqualByComparingTo(DEFAULT_SOLDE_MONTANT_PCH_E);
        assertThat(testSoldePchE.getSoldeHeurePchE()).isEqualByComparingTo(UPDATED_SOLDE_HEURE_PCH_E);
    }

    @Test
    @Transactional
    void fullUpdateSoldePchEWithPatch() throws Exception {
        // Initialize the database
        soldePchERepository.saveAndFlush(soldePchE);

        int databaseSizeBeforeUpdate = soldePchERepository.findAll().size();

        // Update the soldePchE using partial update
        SoldePchE partialUpdatedSoldePchE = new SoldePchE();
        partialUpdatedSoldePchE.setId(soldePchE.getId());

        partialUpdatedSoldePchE
            .annee(UPDATED_ANNEE)
            .mois(UPDATED_MOIS)
            .soldeMontantPchE(UPDATED_SOLDE_MONTANT_PCH_E)
            .soldeHeurePchE(UPDATED_SOLDE_HEURE_PCH_E);

        restSoldePchEMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSoldePchE.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSoldePchE))
            )
            .andExpect(status().isOk());

        // Validate the SoldePchE in the database
        List<SoldePchE> soldePchEList = soldePchERepository.findAll();
        assertThat(soldePchEList).hasSize(databaseSizeBeforeUpdate);
        SoldePchE testSoldePchE = soldePchEList.get(soldePchEList.size() - 1);
        assertThat(testSoldePchE.getAnnee()).isEqualTo(UPDATED_ANNEE);
        assertThat(testSoldePchE.getMois()).isEqualTo(UPDATED_MOIS);
        assertThat(testSoldePchE.getSoldeMontantPchE()).isEqualByComparingTo(UPDATED_SOLDE_MONTANT_PCH_E);
        assertThat(testSoldePchE.getSoldeHeurePchE()).isEqualByComparingTo(UPDATED_SOLDE_HEURE_PCH_E);
    }

    @Test
    @Transactional
    void patchNonExistingSoldePchE() throws Exception {
        int databaseSizeBeforeUpdate = soldePchERepository.findAll().size();
        soldePchE.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSoldePchEMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, soldePchE.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(soldePchE))
            )
            .andExpect(status().isBadRequest());

        // Validate the SoldePchE in the database
        List<SoldePchE> soldePchEList = soldePchERepository.findAll();
        assertThat(soldePchEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSoldePchE() throws Exception {
        int databaseSizeBeforeUpdate = soldePchERepository.findAll().size();
        soldePchE.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSoldePchEMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(soldePchE))
            )
            .andExpect(status().isBadRequest());

        // Validate the SoldePchE in the database
        List<SoldePchE> soldePchEList = soldePchERepository.findAll();
        assertThat(soldePchEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSoldePchE() throws Exception {
        int databaseSizeBeforeUpdate = soldePchERepository.findAll().size();
        soldePchE.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSoldePchEMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(soldePchE))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the SoldePchE in the database
        List<SoldePchE> soldePchEList = soldePchERepository.findAll();
        assertThat(soldePchEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSoldePchE() throws Exception {
        // Initialize the database
        soldePchERepository.saveAndFlush(soldePchE);

        int databaseSizeBeforeDelete = soldePchERepository.findAll().size();

        // Delete the soldePchE
        restSoldePchEMockMvc
            .perform(delete(ENTITY_API_URL_ID, soldePchE.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SoldePchE> soldePchEList = soldePchERepository.findAll();
        assertThat(soldePchEList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
