package fr.tixou.archisolver.web.rest;

import static fr.tixou.archisolver.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.tixou.archisolver.IntegrationTest;
import fr.tixou.archisolver.domain.StrategieApa;
import fr.tixou.archisolver.repository.StrategieApaRepository;
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
 * Integration tests for the {@link StrategieApaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class StrategieApaResourceIT {

    private static final Boolean DEFAULT_IS_ACTIF = false;
    private static final Boolean UPDATED_IS_ACTIF = true;

    private static final Integer DEFAULT_ANNE = 1;
    private static final Integer UPDATED_ANNE = 2;

    private static final BigDecimal DEFAULT_MONTANT_PLAFOND = new BigDecimal(1);
    private static final BigDecimal UPDATED_MONTANT_PLAFOND = new BigDecimal(2);

    private static final BigDecimal DEFAULT_NB_PLAFONDHEURE = new BigDecimal(1);
    private static final BigDecimal UPDATED_NB_PLAFONDHEURE = new BigDecimal(2);

    private static final BigDecimal DEFAULT_TAUX = new BigDecimal(1);
    private static final BigDecimal UPDATED_TAUX = new BigDecimal(2);

    private static final String ENTITY_API_URL = "/api/strategie-apas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private StrategieApaRepository strategieApaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStrategieApaMockMvc;

    private StrategieApa strategieApa;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StrategieApa createEntity(EntityManager em) {
        StrategieApa strategieApa = new StrategieApa()
            .isActif(DEFAULT_IS_ACTIF)
            .anne(DEFAULT_ANNE)
            .montantPlafond(DEFAULT_MONTANT_PLAFOND)
            .nbPlafondheure(DEFAULT_NB_PLAFONDHEURE)
            .taux(DEFAULT_TAUX);
        return strategieApa;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StrategieApa createUpdatedEntity(EntityManager em) {
        StrategieApa strategieApa = new StrategieApa()
            .isActif(UPDATED_IS_ACTIF)
            .anne(UPDATED_ANNE)
            .montantPlafond(UPDATED_MONTANT_PLAFOND)
            .nbPlafondheure(UPDATED_NB_PLAFONDHEURE)
            .taux(UPDATED_TAUX);
        return strategieApa;
    }

    @BeforeEach
    public void initTest() {
        strategieApa = createEntity(em);
    }

    @Test
    @Transactional
    void createStrategieApa() throws Exception {
        int databaseSizeBeforeCreate = strategieApaRepository.findAll().size();
        // Create the StrategieApa
        restStrategieApaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(strategieApa)))
            .andExpect(status().isCreated());

        // Validate the StrategieApa in the database
        List<StrategieApa> strategieApaList = strategieApaRepository.findAll();
        assertThat(strategieApaList).hasSize(databaseSizeBeforeCreate + 1);
        StrategieApa testStrategieApa = strategieApaList.get(strategieApaList.size() - 1);
        assertThat(testStrategieApa.getIsActif()).isEqualTo(DEFAULT_IS_ACTIF);
        assertThat(testStrategieApa.getAnne()).isEqualTo(DEFAULT_ANNE);
        assertThat(testStrategieApa.getMontantPlafond()).isEqualByComparingTo(DEFAULT_MONTANT_PLAFOND);
        assertThat(testStrategieApa.getNbPlafondheure()).isEqualByComparingTo(DEFAULT_NB_PLAFONDHEURE);
        assertThat(testStrategieApa.getTaux()).isEqualByComparingTo(DEFAULT_TAUX);
    }

    @Test
    @Transactional
    void createStrategieApaWithExistingId() throws Exception {
        // Create the StrategieApa with an existing ID
        strategieApa.setId(1L);

        int databaseSizeBeforeCreate = strategieApaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restStrategieApaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(strategieApa)))
            .andExpect(status().isBadRequest());

        // Validate the StrategieApa in the database
        List<StrategieApa> strategieApaList = strategieApaRepository.findAll();
        assertThat(strategieApaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllStrategieApas() throws Exception {
        // Initialize the database
        strategieApaRepository.saveAndFlush(strategieApa);

        // Get all the strategieApaList
        restStrategieApaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(strategieApa.getId().intValue())))
            .andExpect(jsonPath("$.[*].isActif").value(hasItem(DEFAULT_IS_ACTIF.booleanValue())))
            .andExpect(jsonPath("$.[*].anne").value(hasItem(DEFAULT_ANNE)))
            .andExpect(jsonPath("$.[*].montantPlafond").value(hasItem(sameNumber(DEFAULT_MONTANT_PLAFOND))))
            .andExpect(jsonPath("$.[*].nbPlafondheure").value(hasItem(sameNumber(DEFAULT_NB_PLAFONDHEURE))))
            .andExpect(jsonPath("$.[*].taux").value(hasItem(sameNumber(DEFAULT_TAUX))));
    }

    @Test
    @Transactional
    void getStrategieApa() throws Exception {
        // Initialize the database
        strategieApaRepository.saveAndFlush(strategieApa);

        // Get the strategieApa
        restStrategieApaMockMvc
            .perform(get(ENTITY_API_URL_ID, strategieApa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(strategieApa.getId().intValue()))
            .andExpect(jsonPath("$.isActif").value(DEFAULT_IS_ACTIF.booleanValue()))
            .andExpect(jsonPath("$.anne").value(DEFAULT_ANNE))
            .andExpect(jsonPath("$.montantPlafond").value(sameNumber(DEFAULT_MONTANT_PLAFOND)))
            .andExpect(jsonPath("$.nbPlafondheure").value(sameNumber(DEFAULT_NB_PLAFONDHEURE)))
            .andExpect(jsonPath("$.taux").value(sameNumber(DEFAULT_TAUX)));
    }

    @Test
    @Transactional
    void getNonExistingStrategieApa() throws Exception {
        // Get the strategieApa
        restStrategieApaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewStrategieApa() throws Exception {
        // Initialize the database
        strategieApaRepository.saveAndFlush(strategieApa);

        int databaseSizeBeforeUpdate = strategieApaRepository.findAll().size();

        // Update the strategieApa
        StrategieApa updatedStrategieApa = strategieApaRepository.findById(strategieApa.getId()).get();
        // Disconnect from session so that the updates on updatedStrategieApa are not directly saved in db
        em.detach(updatedStrategieApa);
        updatedStrategieApa
            .isActif(UPDATED_IS_ACTIF)
            .anne(UPDATED_ANNE)
            .montantPlafond(UPDATED_MONTANT_PLAFOND)
            .nbPlafondheure(UPDATED_NB_PLAFONDHEURE)
            .taux(UPDATED_TAUX);

        restStrategieApaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedStrategieApa.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedStrategieApa))
            )
            .andExpect(status().isOk());

        // Validate the StrategieApa in the database
        List<StrategieApa> strategieApaList = strategieApaRepository.findAll();
        assertThat(strategieApaList).hasSize(databaseSizeBeforeUpdate);
        StrategieApa testStrategieApa = strategieApaList.get(strategieApaList.size() - 1);
        assertThat(testStrategieApa.getIsActif()).isEqualTo(UPDATED_IS_ACTIF);
        assertThat(testStrategieApa.getAnne()).isEqualTo(UPDATED_ANNE);
        assertThat(testStrategieApa.getMontantPlafond()).isEqualTo(UPDATED_MONTANT_PLAFOND);
        assertThat(testStrategieApa.getNbPlafondheure()).isEqualTo(UPDATED_NB_PLAFONDHEURE);
        assertThat(testStrategieApa.getTaux()).isEqualTo(UPDATED_TAUX);
    }

    @Test
    @Transactional
    void putNonExistingStrategieApa() throws Exception {
        int databaseSizeBeforeUpdate = strategieApaRepository.findAll().size();
        strategieApa.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStrategieApaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, strategieApa.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(strategieApa))
            )
            .andExpect(status().isBadRequest());

        // Validate the StrategieApa in the database
        List<StrategieApa> strategieApaList = strategieApaRepository.findAll();
        assertThat(strategieApaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchStrategieApa() throws Exception {
        int databaseSizeBeforeUpdate = strategieApaRepository.findAll().size();
        strategieApa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStrategieApaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(strategieApa))
            )
            .andExpect(status().isBadRequest());

        // Validate the StrategieApa in the database
        List<StrategieApa> strategieApaList = strategieApaRepository.findAll();
        assertThat(strategieApaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamStrategieApa() throws Exception {
        int databaseSizeBeforeUpdate = strategieApaRepository.findAll().size();
        strategieApa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStrategieApaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(strategieApa)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the StrategieApa in the database
        List<StrategieApa> strategieApaList = strategieApaRepository.findAll();
        assertThat(strategieApaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateStrategieApaWithPatch() throws Exception {
        // Initialize the database
        strategieApaRepository.saveAndFlush(strategieApa);

        int databaseSizeBeforeUpdate = strategieApaRepository.findAll().size();

        // Update the strategieApa using partial update
        StrategieApa partialUpdatedStrategieApa = new StrategieApa();
        partialUpdatedStrategieApa.setId(strategieApa.getId());

        partialUpdatedStrategieApa.taux(UPDATED_TAUX);

        restStrategieApaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStrategieApa.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedStrategieApa))
            )
            .andExpect(status().isOk());

        // Validate the StrategieApa in the database
        List<StrategieApa> strategieApaList = strategieApaRepository.findAll();
        assertThat(strategieApaList).hasSize(databaseSizeBeforeUpdate);
        StrategieApa testStrategieApa = strategieApaList.get(strategieApaList.size() - 1);
        assertThat(testStrategieApa.getIsActif()).isEqualTo(DEFAULT_IS_ACTIF);
        assertThat(testStrategieApa.getAnne()).isEqualTo(DEFAULT_ANNE);
        assertThat(testStrategieApa.getMontantPlafond()).isEqualByComparingTo(DEFAULT_MONTANT_PLAFOND);
        assertThat(testStrategieApa.getNbPlafondheure()).isEqualByComparingTo(DEFAULT_NB_PLAFONDHEURE);
        assertThat(testStrategieApa.getTaux()).isEqualByComparingTo(UPDATED_TAUX);
    }

    @Test
    @Transactional
    void fullUpdateStrategieApaWithPatch() throws Exception {
        // Initialize the database
        strategieApaRepository.saveAndFlush(strategieApa);

        int databaseSizeBeforeUpdate = strategieApaRepository.findAll().size();

        // Update the strategieApa using partial update
        StrategieApa partialUpdatedStrategieApa = new StrategieApa();
        partialUpdatedStrategieApa.setId(strategieApa.getId());

        partialUpdatedStrategieApa
            .isActif(UPDATED_IS_ACTIF)
            .anne(UPDATED_ANNE)
            .montantPlafond(UPDATED_MONTANT_PLAFOND)
            .nbPlafondheure(UPDATED_NB_PLAFONDHEURE)
            .taux(UPDATED_TAUX);

        restStrategieApaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStrategieApa.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedStrategieApa))
            )
            .andExpect(status().isOk());

        // Validate the StrategieApa in the database
        List<StrategieApa> strategieApaList = strategieApaRepository.findAll();
        assertThat(strategieApaList).hasSize(databaseSizeBeforeUpdate);
        StrategieApa testStrategieApa = strategieApaList.get(strategieApaList.size() - 1);
        assertThat(testStrategieApa.getIsActif()).isEqualTo(UPDATED_IS_ACTIF);
        assertThat(testStrategieApa.getAnne()).isEqualTo(UPDATED_ANNE);
        assertThat(testStrategieApa.getMontantPlafond()).isEqualByComparingTo(UPDATED_MONTANT_PLAFOND);
        assertThat(testStrategieApa.getNbPlafondheure()).isEqualByComparingTo(UPDATED_NB_PLAFONDHEURE);
        assertThat(testStrategieApa.getTaux()).isEqualByComparingTo(UPDATED_TAUX);
    }

    @Test
    @Transactional
    void patchNonExistingStrategieApa() throws Exception {
        int databaseSizeBeforeUpdate = strategieApaRepository.findAll().size();
        strategieApa.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStrategieApaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, strategieApa.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(strategieApa))
            )
            .andExpect(status().isBadRequest());

        // Validate the StrategieApa in the database
        List<StrategieApa> strategieApaList = strategieApaRepository.findAll();
        assertThat(strategieApaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchStrategieApa() throws Exception {
        int databaseSizeBeforeUpdate = strategieApaRepository.findAll().size();
        strategieApa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStrategieApaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(strategieApa))
            )
            .andExpect(status().isBadRequest());

        // Validate the StrategieApa in the database
        List<StrategieApa> strategieApaList = strategieApaRepository.findAll();
        assertThat(strategieApaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamStrategieApa() throws Exception {
        int databaseSizeBeforeUpdate = strategieApaRepository.findAll().size();
        strategieApa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStrategieApaMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(strategieApa))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the StrategieApa in the database
        List<StrategieApa> strategieApaList = strategieApaRepository.findAll();
        assertThat(strategieApaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteStrategieApa() throws Exception {
        // Initialize the database
        strategieApaRepository.saveAndFlush(strategieApa);

        int databaseSizeBeforeDelete = strategieApaRepository.findAll().size();

        // Delete the strategieApa
        restStrategieApaMockMvc
            .perform(delete(ENTITY_API_URL_ID, strategieApa.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<StrategieApa> strategieApaList = strategieApaRepository.findAll();
        assertThat(strategieApaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
