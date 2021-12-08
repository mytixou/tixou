package fr.tixou.archisolver.web.rest;

import static fr.tixou.archisolver.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.tixou.archisolver.IntegrationTest;
import fr.tixou.archisolver.domain.SoldeApa;
import fr.tixou.archisolver.repository.SoldeApaRepository;
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
 * Integration tests for the {@link SoldeApaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SoldeApaResourceIT {

    private static final Integer DEFAULT_ANNEE = 1;
    private static final Integer UPDATED_ANNEE = 2;

    private static final Integer DEFAULT_MOIS = 1;
    private static final Integer UPDATED_MOIS = 2;

    private static final BigDecimal DEFAULT_SOLDE_MONTANT_APA = new BigDecimal(1);
    private static final BigDecimal UPDATED_SOLDE_MONTANT_APA = new BigDecimal(2);

    private static final BigDecimal DEFAULT_SOLDE_HEURE_APA = new BigDecimal(1);
    private static final BigDecimal UPDATED_SOLDE_HEURE_APA = new BigDecimal(2);

    private static final String ENTITY_API_URL = "/api/solde-apas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SoldeApaRepository soldeApaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSoldeApaMockMvc;

    private SoldeApa soldeApa;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SoldeApa createEntity(EntityManager em) {
        SoldeApa soldeApa = new SoldeApa()
            .annee(DEFAULT_ANNEE)
            .mois(DEFAULT_MOIS)
            .soldeMontantApa(DEFAULT_SOLDE_MONTANT_APA)
            .soldeHeureApa(DEFAULT_SOLDE_HEURE_APA);
        return soldeApa;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SoldeApa createUpdatedEntity(EntityManager em) {
        SoldeApa soldeApa = new SoldeApa()
            .annee(UPDATED_ANNEE)
            .mois(UPDATED_MOIS)
            .soldeMontantApa(UPDATED_SOLDE_MONTANT_APA)
            .soldeHeureApa(UPDATED_SOLDE_HEURE_APA);
        return soldeApa;
    }

    @BeforeEach
    public void initTest() {
        soldeApa = createEntity(em);
    }

    @Test
    @Transactional
    void createSoldeApa() throws Exception {
        int databaseSizeBeforeCreate = soldeApaRepository.findAll().size();
        // Create the SoldeApa
        restSoldeApaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(soldeApa)))
            .andExpect(status().isCreated());

        // Validate the SoldeApa in the database
        List<SoldeApa> soldeApaList = soldeApaRepository.findAll();
        assertThat(soldeApaList).hasSize(databaseSizeBeforeCreate + 1);
        SoldeApa testSoldeApa = soldeApaList.get(soldeApaList.size() - 1);
        assertThat(testSoldeApa.getAnnee()).isEqualTo(DEFAULT_ANNEE);
        assertThat(testSoldeApa.getMois()).isEqualTo(DEFAULT_MOIS);
        assertThat(testSoldeApa.getSoldeMontantApa()).isEqualByComparingTo(DEFAULT_SOLDE_MONTANT_APA);
        assertThat(testSoldeApa.getSoldeHeureApa()).isEqualByComparingTo(DEFAULT_SOLDE_HEURE_APA);
    }

    @Test
    @Transactional
    void createSoldeApaWithExistingId() throws Exception {
        // Create the SoldeApa with an existing ID
        soldeApa.setId(1L);

        int databaseSizeBeforeCreate = soldeApaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSoldeApaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(soldeApa)))
            .andExpect(status().isBadRequest());

        // Validate the SoldeApa in the database
        List<SoldeApa> soldeApaList = soldeApaRepository.findAll();
        assertThat(soldeApaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSoldeApas() throws Exception {
        // Initialize the database
        soldeApaRepository.saveAndFlush(soldeApa);

        // Get all the soldeApaList
        restSoldeApaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(soldeApa.getId().intValue())))
            .andExpect(jsonPath("$.[*].annee").value(hasItem(DEFAULT_ANNEE)))
            .andExpect(jsonPath("$.[*].mois").value(hasItem(DEFAULT_MOIS)))
            .andExpect(jsonPath("$.[*].soldeMontantApa").value(hasItem(sameNumber(DEFAULT_SOLDE_MONTANT_APA))))
            .andExpect(jsonPath("$.[*].soldeHeureApa").value(hasItem(sameNumber(DEFAULT_SOLDE_HEURE_APA))));
    }

    @Test
    @Transactional
    void getSoldeApa() throws Exception {
        // Initialize the database
        soldeApaRepository.saveAndFlush(soldeApa);

        // Get the soldeApa
        restSoldeApaMockMvc
            .perform(get(ENTITY_API_URL_ID, soldeApa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(soldeApa.getId().intValue()))
            .andExpect(jsonPath("$.annee").value(DEFAULT_ANNEE))
            .andExpect(jsonPath("$.mois").value(DEFAULT_MOIS))
            .andExpect(jsonPath("$.soldeMontantApa").value(sameNumber(DEFAULT_SOLDE_MONTANT_APA)))
            .andExpect(jsonPath("$.soldeHeureApa").value(sameNumber(DEFAULT_SOLDE_HEURE_APA)));
    }

    @Test
    @Transactional
    void getNonExistingSoldeApa() throws Exception {
        // Get the soldeApa
        restSoldeApaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewSoldeApa() throws Exception {
        // Initialize the database
        soldeApaRepository.saveAndFlush(soldeApa);

        int databaseSizeBeforeUpdate = soldeApaRepository.findAll().size();

        // Update the soldeApa
        SoldeApa updatedSoldeApa = soldeApaRepository.findById(soldeApa.getId()).get();
        // Disconnect from session so that the updates on updatedSoldeApa are not directly saved in db
        em.detach(updatedSoldeApa);
        updatedSoldeApa
            .annee(UPDATED_ANNEE)
            .mois(UPDATED_MOIS)
            .soldeMontantApa(UPDATED_SOLDE_MONTANT_APA)
            .soldeHeureApa(UPDATED_SOLDE_HEURE_APA);

        restSoldeApaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSoldeApa.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedSoldeApa))
            )
            .andExpect(status().isOk());

        // Validate the SoldeApa in the database
        List<SoldeApa> soldeApaList = soldeApaRepository.findAll();
        assertThat(soldeApaList).hasSize(databaseSizeBeforeUpdate);
        SoldeApa testSoldeApa = soldeApaList.get(soldeApaList.size() - 1);
        assertThat(testSoldeApa.getAnnee()).isEqualTo(UPDATED_ANNEE);
        assertThat(testSoldeApa.getMois()).isEqualTo(UPDATED_MOIS);
        assertThat(testSoldeApa.getSoldeMontantApa()).isEqualTo(UPDATED_SOLDE_MONTANT_APA);
        assertThat(testSoldeApa.getSoldeHeureApa()).isEqualTo(UPDATED_SOLDE_HEURE_APA);
    }

    @Test
    @Transactional
    void putNonExistingSoldeApa() throws Exception {
        int databaseSizeBeforeUpdate = soldeApaRepository.findAll().size();
        soldeApa.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSoldeApaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, soldeApa.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(soldeApa))
            )
            .andExpect(status().isBadRequest());

        // Validate the SoldeApa in the database
        List<SoldeApa> soldeApaList = soldeApaRepository.findAll();
        assertThat(soldeApaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSoldeApa() throws Exception {
        int databaseSizeBeforeUpdate = soldeApaRepository.findAll().size();
        soldeApa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSoldeApaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(soldeApa))
            )
            .andExpect(status().isBadRequest());

        // Validate the SoldeApa in the database
        List<SoldeApa> soldeApaList = soldeApaRepository.findAll();
        assertThat(soldeApaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSoldeApa() throws Exception {
        int databaseSizeBeforeUpdate = soldeApaRepository.findAll().size();
        soldeApa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSoldeApaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(soldeApa)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the SoldeApa in the database
        List<SoldeApa> soldeApaList = soldeApaRepository.findAll();
        assertThat(soldeApaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSoldeApaWithPatch() throws Exception {
        // Initialize the database
        soldeApaRepository.saveAndFlush(soldeApa);

        int databaseSizeBeforeUpdate = soldeApaRepository.findAll().size();

        // Update the soldeApa using partial update
        SoldeApa partialUpdatedSoldeApa = new SoldeApa();
        partialUpdatedSoldeApa.setId(soldeApa.getId());

        partialUpdatedSoldeApa.mois(UPDATED_MOIS).soldeHeureApa(UPDATED_SOLDE_HEURE_APA);

        restSoldeApaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSoldeApa.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSoldeApa))
            )
            .andExpect(status().isOk());

        // Validate the SoldeApa in the database
        List<SoldeApa> soldeApaList = soldeApaRepository.findAll();
        assertThat(soldeApaList).hasSize(databaseSizeBeforeUpdate);
        SoldeApa testSoldeApa = soldeApaList.get(soldeApaList.size() - 1);
        assertThat(testSoldeApa.getAnnee()).isEqualTo(DEFAULT_ANNEE);
        assertThat(testSoldeApa.getMois()).isEqualTo(UPDATED_MOIS);
        assertThat(testSoldeApa.getSoldeMontantApa()).isEqualByComparingTo(DEFAULT_SOLDE_MONTANT_APA);
        assertThat(testSoldeApa.getSoldeHeureApa()).isEqualByComparingTo(UPDATED_SOLDE_HEURE_APA);
    }

    @Test
    @Transactional
    void fullUpdateSoldeApaWithPatch() throws Exception {
        // Initialize the database
        soldeApaRepository.saveAndFlush(soldeApa);

        int databaseSizeBeforeUpdate = soldeApaRepository.findAll().size();

        // Update the soldeApa using partial update
        SoldeApa partialUpdatedSoldeApa = new SoldeApa();
        partialUpdatedSoldeApa.setId(soldeApa.getId());

        partialUpdatedSoldeApa
            .annee(UPDATED_ANNEE)
            .mois(UPDATED_MOIS)
            .soldeMontantApa(UPDATED_SOLDE_MONTANT_APA)
            .soldeHeureApa(UPDATED_SOLDE_HEURE_APA);

        restSoldeApaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSoldeApa.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSoldeApa))
            )
            .andExpect(status().isOk());

        // Validate the SoldeApa in the database
        List<SoldeApa> soldeApaList = soldeApaRepository.findAll();
        assertThat(soldeApaList).hasSize(databaseSizeBeforeUpdate);
        SoldeApa testSoldeApa = soldeApaList.get(soldeApaList.size() - 1);
        assertThat(testSoldeApa.getAnnee()).isEqualTo(UPDATED_ANNEE);
        assertThat(testSoldeApa.getMois()).isEqualTo(UPDATED_MOIS);
        assertThat(testSoldeApa.getSoldeMontantApa()).isEqualByComparingTo(UPDATED_SOLDE_MONTANT_APA);
        assertThat(testSoldeApa.getSoldeHeureApa()).isEqualByComparingTo(UPDATED_SOLDE_HEURE_APA);
    }

    @Test
    @Transactional
    void patchNonExistingSoldeApa() throws Exception {
        int databaseSizeBeforeUpdate = soldeApaRepository.findAll().size();
        soldeApa.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSoldeApaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, soldeApa.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(soldeApa))
            )
            .andExpect(status().isBadRequest());

        // Validate the SoldeApa in the database
        List<SoldeApa> soldeApaList = soldeApaRepository.findAll();
        assertThat(soldeApaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSoldeApa() throws Exception {
        int databaseSizeBeforeUpdate = soldeApaRepository.findAll().size();
        soldeApa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSoldeApaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(soldeApa))
            )
            .andExpect(status().isBadRequest());

        // Validate the SoldeApa in the database
        List<SoldeApa> soldeApaList = soldeApaRepository.findAll();
        assertThat(soldeApaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSoldeApa() throws Exception {
        int databaseSizeBeforeUpdate = soldeApaRepository.findAll().size();
        soldeApa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSoldeApaMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(soldeApa)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the SoldeApa in the database
        List<SoldeApa> soldeApaList = soldeApaRepository.findAll();
        assertThat(soldeApaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSoldeApa() throws Exception {
        // Initialize the database
        soldeApaRepository.saveAndFlush(soldeApa);

        int databaseSizeBeforeDelete = soldeApaRepository.findAll().size();

        // Delete the soldeApa
        restSoldeApaMockMvc
            .perform(delete(ENTITY_API_URL_ID, soldeApa.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SoldeApa> soldeApaList = soldeApaRepository.findAll();
        assertThat(soldeApaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
