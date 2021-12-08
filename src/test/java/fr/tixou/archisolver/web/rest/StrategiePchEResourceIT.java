package fr.tixou.archisolver.web.rest;

import static fr.tixou.archisolver.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.tixou.archisolver.IntegrationTest;
import fr.tixou.archisolver.domain.StrategiePchE;
import fr.tixou.archisolver.repository.StrategiePchERepository;
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
 * Integration tests for the {@link StrategiePchEResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class StrategiePchEResourceIT {

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

    private static final String ENTITY_API_URL = "/api/strategie-pch-es";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private StrategiePchERepository strategiePchERepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStrategiePchEMockMvc;

    private StrategiePchE strategiePchE;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StrategiePchE createEntity(EntityManager em) {
        StrategiePchE strategiePchE = new StrategiePchE()
            .isActif(DEFAULT_IS_ACTIF)
            .anne(DEFAULT_ANNE)
            .montantPlafond(DEFAULT_MONTANT_PLAFOND)
            .nbPlafondheure(DEFAULT_NB_PLAFONDHEURE)
            .taux(DEFAULT_TAUX);
        return strategiePchE;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StrategiePchE createUpdatedEntity(EntityManager em) {
        StrategiePchE strategiePchE = new StrategiePchE()
            .isActif(UPDATED_IS_ACTIF)
            .anne(UPDATED_ANNE)
            .montantPlafond(UPDATED_MONTANT_PLAFOND)
            .nbPlafondheure(UPDATED_NB_PLAFONDHEURE)
            .taux(UPDATED_TAUX);
        return strategiePchE;
    }

    @BeforeEach
    public void initTest() {
        strategiePchE = createEntity(em);
    }

    @Test
    @Transactional
    void createStrategiePchE() throws Exception {
        int databaseSizeBeforeCreate = strategiePchERepository.findAll().size();
        // Create the StrategiePchE
        restStrategiePchEMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(strategiePchE)))
            .andExpect(status().isCreated());

        // Validate the StrategiePchE in the database
        List<StrategiePchE> strategiePchEList = strategiePchERepository.findAll();
        assertThat(strategiePchEList).hasSize(databaseSizeBeforeCreate + 1);
        StrategiePchE testStrategiePchE = strategiePchEList.get(strategiePchEList.size() - 1);
        assertThat(testStrategiePchE.getIsActif()).isEqualTo(DEFAULT_IS_ACTIF);
        assertThat(testStrategiePchE.getAnne()).isEqualTo(DEFAULT_ANNE);
        assertThat(testStrategiePchE.getMontantPlafond()).isEqualByComparingTo(DEFAULT_MONTANT_PLAFOND);
        assertThat(testStrategiePchE.getNbPlafondheure()).isEqualByComparingTo(DEFAULT_NB_PLAFONDHEURE);
        assertThat(testStrategiePchE.getTaux()).isEqualByComparingTo(DEFAULT_TAUX);
    }

    @Test
    @Transactional
    void createStrategiePchEWithExistingId() throws Exception {
        // Create the StrategiePchE with an existing ID
        strategiePchE.setId(1L);

        int databaseSizeBeforeCreate = strategiePchERepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restStrategiePchEMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(strategiePchE)))
            .andExpect(status().isBadRequest());

        // Validate the StrategiePchE in the database
        List<StrategiePchE> strategiePchEList = strategiePchERepository.findAll();
        assertThat(strategiePchEList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllStrategiePchES() throws Exception {
        // Initialize the database
        strategiePchERepository.saveAndFlush(strategiePchE);

        // Get all the strategiePchEList
        restStrategiePchEMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(strategiePchE.getId().intValue())))
            .andExpect(jsonPath("$.[*].isActif").value(hasItem(DEFAULT_IS_ACTIF.booleanValue())))
            .andExpect(jsonPath("$.[*].anne").value(hasItem(DEFAULT_ANNE)))
            .andExpect(jsonPath("$.[*].montantPlafond").value(hasItem(sameNumber(DEFAULT_MONTANT_PLAFOND))))
            .andExpect(jsonPath("$.[*].nbPlafondheure").value(hasItem(sameNumber(DEFAULT_NB_PLAFONDHEURE))))
            .andExpect(jsonPath("$.[*].taux").value(hasItem(sameNumber(DEFAULT_TAUX))));
    }

    @Test
    @Transactional
    void getStrategiePchE() throws Exception {
        // Initialize the database
        strategiePchERepository.saveAndFlush(strategiePchE);

        // Get the strategiePchE
        restStrategiePchEMockMvc
            .perform(get(ENTITY_API_URL_ID, strategiePchE.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(strategiePchE.getId().intValue()))
            .andExpect(jsonPath("$.isActif").value(DEFAULT_IS_ACTIF.booleanValue()))
            .andExpect(jsonPath("$.anne").value(DEFAULT_ANNE))
            .andExpect(jsonPath("$.montantPlafond").value(sameNumber(DEFAULT_MONTANT_PLAFOND)))
            .andExpect(jsonPath("$.nbPlafondheure").value(sameNumber(DEFAULT_NB_PLAFONDHEURE)))
            .andExpect(jsonPath("$.taux").value(sameNumber(DEFAULT_TAUX)));
    }

    @Test
    @Transactional
    void getNonExistingStrategiePchE() throws Exception {
        // Get the strategiePchE
        restStrategiePchEMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewStrategiePchE() throws Exception {
        // Initialize the database
        strategiePchERepository.saveAndFlush(strategiePchE);

        int databaseSizeBeforeUpdate = strategiePchERepository.findAll().size();

        // Update the strategiePchE
        StrategiePchE updatedStrategiePchE = strategiePchERepository.findById(strategiePchE.getId()).get();
        // Disconnect from session so that the updates on updatedStrategiePchE are not directly saved in db
        em.detach(updatedStrategiePchE);
        updatedStrategiePchE
            .isActif(UPDATED_IS_ACTIF)
            .anne(UPDATED_ANNE)
            .montantPlafond(UPDATED_MONTANT_PLAFOND)
            .nbPlafondheure(UPDATED_NB_PLAFONDHEURE)
            .taux(UPDATED_TAUX);

        restStrategiePchEMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedStrategiePchE.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedStrategiePchE))
            )
            .andExpect(status().isOk());

        // Validate the StrategiePchE in the database
        List<StrategiePchE> strategiePchEList = strategiePchERepository.findAll();
        assertThat(strategiePchEList).hasSize(databaseSizeBeforeUpdate);
        StrategiePchE testStrategiePchE = strategiePchEList.get(strategiePchEList.size() - 1);
        assertThat(testStrategiePchE.getIsActif()).isEqualTo(UPDATED_IS_ACTIF);
        assertThat(testStrategiePchE.getAnne()).isEqualTo(UPDATED_ANNE);
        assertThat(testStrategiePchE.getMontantPlafond()).isEqualTo(UPDATED_MONTANT_PLAFOND);
        assertThat(testStrategiePchE.getNbPlafondheure()).isEqualTo(UPDATED_NB_PLAFONDHEURE);
        assertThat(testStrategiePchE.getTaux()).isEqualTo(UPDATED_TAUX);
    }

    @Test
    @Transactional
    void putNonExistingStrategiePchE() throws Exception {
        int databaseSizeBeforeUpdate = strategiePchERepository.findAll().size();
        strategiePchE.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStrategiePchEMockMvc
            .perform(
                put(ENTITY_API_URL_ID, strategiePchE.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(strategiePchE))
            )
            .andExpect(status().isBadRequest());

        // Validate the StrategiePchE in the database
        List<StrategiePchE> strategiePchEList = strategiePchERepository.findAll();
        assertThat(strategiePchEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchStrategiePchE() throws Exception {
        int databaseSizeBeforeUpdate = strategiePchERepository.findAll().size();
        strategiePchE.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStrategiePchEMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(strategiePchE))
            )
            .andExpect(status().isBadRequest());

        // Validate the StrategiePchE in the database
        List<StrategiePchE> strategiePchEList = strategiePchERepository.findAll();
        assertThat(strategiePchEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamStrategiePchE() throws Exception {
        int databaseSizeBeforeUpdate = strategiePchERepository.findAll().size();
        strategiePchE.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStrategiePchEMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(strategiePchE)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the StrategiePchE in the database
        List<StrategiePchE> strategiePchEList = strategiePchERepository.findAll();
        assertThat(strategiePchEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateStrategiePchEWithPatch() throws Exception {
        // Initialize the database
        strategiePchERepository.saveAndFlush(strategiePchE);

        int databaseSizeBeforeUpdate = strategiePchERepository.findAll().size();

        // Update the strategiePchE using partial update
        StrategiePchE partialUpdatedStrategiePchE = new StrategiePchE();
        partialUpdatedStrategiePchE.setId(strategiePchE.getId());

        partialUpdatedStrategiePchE.isActif(UPDATED_IS_ACTIF).taux(UPDATED_TAUX);

        restStrategiePchEMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStrategiePchE.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedStrategiePchE))
            )
            .andExpect(status().isOk());

        // Validate the StrategiePchE in the database
        List<StrategiePchE> strategiePchEList = strategiePchERepository.findAll();
        assertThat(strategiePchEList).hasSize(databaseSizeBeforeUpdate);
        StrategiePchE testStrategiePchE = strategiePchEList.get(strategiePchEList.size() - 1);
        assertThat(testStrategiePchE.getIsActif()).isEqualTo(UPDATED_IS_ACTIF);
        assertThat(testStrategiePchE.getAnne()).isEqualTo(DEFAULT_ANNE);
        assertThat(testStrategiePchE.getMontantPlafond()).isEqualByComparingTo(DEFAULT_MONTANT_PLAFOND);
        assertThat(testStrategiePchE.getNbPlafondheure()).isEqualByComparingTo(DEFAULT_NB_PLAFONDHEURE);
        assertThat(testStrategiePchE.getTaux()).isEqualByComparingTo(UPDATED_TAUX);
    }

    @Test
    @Transactional
    void fullUpdateStrategiePchEWithPatch() throws Exception {
        // Initialize the database
        strategiePchERepository.saveAndFlush(strategiePchE);

        int databaseSizeBeforeUpdate = strategiePchERepository.findAll().size();

        // Update the strategiePchE using partial update
        StrategiePchE partialUpdatedStrategiePchE = new StrategiePchE();
        partialUpdatedStrategiePchE.setId(strategiePchE.getId());

        partialUpdatedStrategiePchE
            .isActif(UPDATED_IS_ACTIF)
            .anne(UPDATED_ANNE)
            .montantPlafond(UPDATED_MONTANT_PLAFOND)
            .nbPlafondheure(UPDATED_NB_PLAFONDHEURE)
            .taux(UPDATED_TAUX);

        restStrategiePchEMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStrategiePchE.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedStrategiePchE))
            )
            .andExpect(status().isOk());

        // Validate the StrategiePchE in the database
        List<StrategiePchE> strategiePchEList = strategiePchERepository.findAll();
        assertThat(strategiePchEList).hasSize(databaseSizeBeforeUpdate);
        StrategiePchE testStrategiePchE = strategiePchEList.get(strategiePchEList.size() - 1);
        assertThat(testStrategiePchE.getIsActif()).isEqualTo(UPDATED_IS_ACTIF);
        assertThat(testStrategiePchE.getAnne()).isEqualTo(UPDATED_ANNE);
        assertThat(testStrategiePchE.getMontantPlafond()).isEqualByComparingTo(UPDATED_MONTANT_PLAFOND);
        assertThat(testStrategiePchE.getNbPlafondheure()).isEqualByComparingTo(UPDATED_NB_PLAFONDHEURE);
        assertThat(testStrategiePchE.getTaux()).isEqualByComparingTo(UPDATED_TAUX);
    }

    @Test
    @Transactional
    void patchNonExistingStrategiePchE() throws Exception {
        int databaseSizeBeforeUpdate = strategiePchERepository.findAll().size();
        strategiePchE.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStrategiePchEMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, strategiePchE.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(strategiePchE))
            )
            .andExpect(status().isBadRequest());

        // Validate the StrategiePchE in the database
        List<StrategiePchE> strategiePchEList = strategiePchERepository.findAll();
        assertThat(strategiePchEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchStrategiePchE() throws Exception {
        int databaseSizeBeforeUpdate = strategiePchERepository.findAll().size();
        strategiePchE.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStrategiePchEMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(strategiePchE))
            )
            .andExpect(status().isBadRequest());

        // Validate the StrategiePchE in the database
        List<StrategiePchE> strategiePchEList = strategiePchERepository.findAll();
        assertThat(strategiePchEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamStrategiePchE() throws Exception {
        int databaseSizeBeforeUpdate = strategiePchERepository.findAll().size();
        strategiePchE.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStrategiePchEMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(strategiePchE))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the StrategiePchE in the database
        List<StrategiePchE> strategiePchEList = strategiePchERepository.findAll();
        assertThat(strategiePchEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteStrategiePchE() throws Exception {
        // Initialize the database
        strategiePchERepository.saveAndFlush(strategiePchE);

        int databaseSizeBeforeDelete = strategiePchERepository.findAll().size();

        // Delete the strategiePchE
        restStrategiePchEMockMvc
            .perform(delete(ENTITY_API_URL_ID, strategiePchE.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<StrategiePchE> strategiePchEList = strategiePchERepository.findAll();
        assertThat(strategiePchEList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
