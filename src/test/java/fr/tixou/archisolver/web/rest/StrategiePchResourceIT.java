package fr.tixou.archisolver.web.rest;

import static fr.tixou.archisolver.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.tixou.archisolver.IntegrationTest;
import fr.tixou.archisolver.domain.StrategiePch;
import fr.tixou.archisolver.repository.StrategiePchRepository;
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
 * Integration tests for the {@link StrategiePchResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class StrategiePchResourceIT {

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

    private static final String ENTITY_API_URL = "/api/strategie-pches";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private StrategiePchRepository strategiePchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStrategiePchMockMvc;

    private StrategiePch strategiePch;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StrategiePch createEntity(EntityManager em) {
        StrategiePch strategiePch = new StrategiePch()
            .isActif(DEFAULT_IS_ACTIF)
            .anne(DEFAULT_ANNE)
            .montantPlafond(DEFAULT_MONTANT_PLAFOND)
            .nbPlafondheure(DEFAULT_NB_PLAFONDHEURE)
            .taux(DEFAULT_TAUX);
        return strategiePch;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StrategiePch createUpdatedEntity(EntityManager em) {
        StrategiePch strategiePch = new StrategiePch()
            .isActif(UPDATED_IS_ACTIF)
            .anne(UPDATED_ANNE)
            .montantPlafond(UPDATED_MONTANT_PLAFOND)
            .nbPlafondheure(UPDATED_NB_PLAFONDHEURE)
            .taux(UPDATED_TAUX);
        return strategiePch;
    }

    @BeforeEach
    public void initTest() {
        strategiePch = createEntity(em);
    }

    @Test
    @Transactional
    void createStrategiePch() throws Exception {
        int databaseSizeBeforeCreate = strategiePchRepository.findAll().size();
        // Create the StrategiePch
        restStrategiePchMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(strategiePch)))
            .andExpect(status().isCreated());

        // Validate the StrategiePch in the database
        List<StrategiePch> strategiePchList = strategiePchRepository.findAll();
        assertThat(strategiePchList).hasSize(databaseSizeBeforeCreate + 1);
        StrategiePch testStrategiePch = strategiePchList.get(strategiePchList.size() - 1);
        assertThat(testStrategiePch.getIsActif()).isEqualTo(DEFAULT_IS_ACTIF);
        assertThat(testStrategiePch.getAnne()).isEqualTo(DEFAULT_ANNE);
        assertThat(testStrategiePch.getMontantPlafond()).isEqualByComparingTo(DEFAULT_MONTANT_PLAFOND);
        assertThat(testStrategiePch.getNbPlafondheure()).isEqualByComparingTo(DEFAULT_NB_PLAFONDHEURE);
        assertThat(testStrategiePch.getTaux()).isEqualByComparingTo(DEFAULT_TAUX);
    }

    @Test
    @Transactional
    void createStrategiePchWithExistingId() throws Exception {
        // Create the StrategiePch with an existing ID
        strategiePch.setId(1L);

        int databaseSizeBeforeCreate = strategiePchRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restStrategiePchMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(strategiePch)))
            .andExpect(status().isBadRequest());

        // Validate the StrategiePch in the database
        List<StrategiePch> strategiePchList = strategiePchRepository.findAll();
        assertThat(strategiePchList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllStrategiePches() throws Exception {
        // Initialize the database
        strategiePchRepository.saveAndFlush(strategiePch);

        // Get all the strategiePchList
        restStrategiePchMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(strategiePch.getId().intValue())))
            .andExpect(jsonPath("$.[*].isActif").value(hasItem(DEFAULT_IS_ACTIF.booleanValue())))
            .andExpect(jsonPath("$.[*].anne").value(hasItem(DEFAULT_ANNE)))
            .andExpect(jsonPath("$.[*].montantPlafond").value(hasItem(sameNumber(DEFAULT_MONTANT_PLAFOND))))
            .andExpect(jsonPath("$.[*].nbPlafondheure").value(hasItem(sameNumber(DEFAULT_NB_PLAFONDHEURE))))
            .andExpect(jsonPath("$.[*].taux").value(hasItem(sameNumber(DEFAULT_TAUX))));
    }

    @Test
    @Transactional
    void getStrategiePch() throws Exception {
        // Initialize the database
        strategiePchRepository.saveAndFlush(strategiePch);

        // Get the strategiePch
        restStrategiePchMockMvc
            .perform(get(ENTITY_API_URL_ID, strategiePch.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(strategiePch.getId().intValue()))
            .andExpect(jsonPath("$.isActif").value(DEFAULT_IS_ACTIF.booleanValue()))
            .andExpect(jsonPath("$.anne").value(DEFAULT_ANNE))
            .andExpect(jsonPath("$.montantPlafond").value(sameNumber(DEFAULT_MONTANT_PLAFOND)))
            .andExpect(jsonPath("$.nbPlafondheure").value(sameNumber(DEFAULT_NB_PLAFONDHEURE)))
            .andExpect(jsonPath("$.taux").value(sameNumber(DEFAULT_TAUX)));
    }

    @Test
    @Transactional
    void getNonExistingStrategiePch() throws Exception {
        // Get the strategiePch
        restStrategiePchMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewStrategiePch() throws Exception {
        // Initialize the database
        strategiePchRepository.saveAndFlush(strategiePch);

        int databaseSizeBeforeUpdate = strategiePchRepository.findAll().size();

        // Update the strategiePch
        StrategiePch updatedStrategiePch = strategiePchRepository.findById(strategiePch.getId()).get();
        // Disconnect from session so that the updates on updatedStrategiePch are not directly saved in db
        em.detach(updatedStrategiePch);
        updatedStrategiePch
            .isActif(UPDATED_IS_ACTIF)
            .anne(UPDATED_ANNE)
            .montantPlafond(UPDATED_MONTANT_PLAFOND)
            .nbPlafondheure(UPDATED_NB_PLAFONDHEURE)
            .taux(UPDATED_TAUX);

        restStrategiePchMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedStrategiePch.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedStrategiePch))
            )
            .andExpect(status().isOk());

        // Validate the StrategiePch in the database
        List<StrategiePch> strategiePchList = strategiePchRepository.findAll();
        assertThat(strategiePchList).hasSize(databaseSizeBeforeUpdate);
        StrategiePch testStrategiePch = strategiePchList.get(strategiePchList.size() - 1);
        assertThat(testStrategiePch.getIsActif()).isEqualTo(UPDATED_IS_ACTIF);
        assertThat(testStrategiePch.getAnne()).isEqualTo(UPDATED_ANNE);
        assertThat(testStrategiePch.getMontantPlafond()).isEqualTo(UPDATED_MONTANT_PLAFOND);
        assertThat(testStrategiePch.getNbPlafondheure()).isEqualTo(UPDATED_NB_PLAFONDHEURE);
        assertThat(testStrategiePch.getTaux()).isEqualTo(UPDATED_TAUX);
    }

    @Test
    @Transactional
    void putNonExistingStrategiePch() throws Exception {
        int databaseSizeBeforeUpdate = strategiePchRepository.findAll().size();
        strategiePch.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStrategiePchMockMvc
            .perform(
                put(ENTITY_API_URL_ID, strategiePch.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(strategiePch))
            )
            .andExpect(status().isBadRequest());

        // Validate the StrategiePch in the database
        List<StrategiePch> strategiePchList = strategiePchRepository.findAll();
        assertThat(strategiePchList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchStrategiePch() throws Exception {
        int databaseSizeBeforeUpdate = strategiePchRepository.findAll().size();
        strategiePch.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStrategiePchMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(strategiePch))
            )
            .andExpect(status().isBadRequest());

        // Validate the StrategiePch in the database
        List<StrategiePch> strategiePchList = strategiePchRepository.findAll();
        assertThat(strategiePchList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamStrategiePch() throws Exception {
        int databaseSizeBeforeUpdate = strategiePchRepository.findAll().size();
        strategiePch.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStrategiePchMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(strategiePch)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the StrategiePch in the database
        List<StrategiePch> strategiePchList = strategiePchRepository.findAll();
        assertThat(strategiePchList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateStrategiePchWithPatch() throws Exception {
        // Initialize the database
        strategiePchRepository.saveAndFlush(strategiePch);

        int databaseSizeBeforeUpdate = strategiePchRepository.findAll().size();

        // Update the strategiePch using partial update
        StrategiePch partialUpdatedStrategiePch = new StrategiePch();
        partialUpdatedStrategiePch.setId(strategiePch.getId());

        partialUpdatedStrategiePch.montantPlafond(UPDATED_MONTANT_PLAFOND).nbPlafondheure(UPDATED_NB_PLAFONDHEURE);

        restStrategiePchMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStrategiePch.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedStrategiePch))
            )
            .andExpect(status().isOk());

        // Validate the StrategiePch in the database
        List<StrategiePch> strategiePchList = strategiePchRepository.findAll();
        assertThat(strategiePchList).hasSize(databaseSizeBeforeUpdate);
        StrategiePch testStrategiePch = strategiePchList.get(strategiePchList.size() - 1);
        assertThat(testStrategiePch.getIsActif()).isEqualTo(DEFAULT_IS_ACTIF);
        assertThat(testStrategiePch.getAnne()).isEqualTo(DEFAULT_ANNE);
        assertThat(testStrategiePch.getMontantPlafond()).isEqualByComparingTo(UPDATED_MONTANT_PLAFOND);
        assertThat(testStrategiePch.getNbPlafondheure()).isEqualByComparingTo(UPDATED_NB_PLAFONDHEURE);
        assertThat(testStrategiePch.getTaux()).isEqualByComparingTo(DEFAULT_TAUX);
    }

    @Test
    @Transactional
    void fullUpdateStrategiePchWithPatch() throws Exception {
        // Initialize the database
        strategiePchRepository.saveAndFlush(strategiePch);

        int databaseSizeBeforeUpdate = strategiePchRepository.findAll().size();

        // Update the strategiePch using partial update
        StrategiePch partialUpdatedStrategiePch = new StrategiePch();
        partialUpdatedStrategiePch.setId(strategiePch.getId());

        partialUpdatedStrategiePch
            .isActif(UPDATED_IS_ACTIF)
            .anne(UPDATED_ANNE)
            .montantPlafond(UPDATED_MONTANT_PLAFOND)
            .nbPlafondheure(UPDATED_NB_PLAFONDHEURE)
            .taux(UPDATED_TAUX);

        restStrategiePchMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStrategiePch.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedStrategiePch))
            )
            .andExpect(status().isOk());

        // Validate the StrategiePch in the database
        List<StrategiePch> strategiePchList = strategiePchRepository.findAll();
        assertThat(strategiePchList).hasSize(databaseSizeBeforeUpdate);
        StrategiePch testStrategiePch = strategiePchList.get(strategiePchList.size() - 1);
        assertThat(testStrategiePch.getIsActif()).isEqualTo(UPDATED_IS_ACTIF);
        assertThat(testStrategiePch.getAnne()).isEqualTo(UPDATED_ANNE);
        assertThat(testStrategiePch.getMontantPlafond()).isEqualByComparingTo(UPDATED_MONTANT_PLAFOND);
        assertThat(testStrategiePch.getNbPlafondheure()).isEqualByComparingTo(UPDATED_NB_PLAFONDHEURE);
        assertThat(testStrategiePch.getTaux()).isEqualByComparingTo(UPDATED_TAUX);
    }

    @Test
    @Transactional
    void patchNonExistingStrategiePch() throws Exception {
        int databaseSizeBeforeUpdate = strategiePchRepository.findAll().size();
        strategiePch.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStrategiePchMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, strategiePch.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(strategiePch))
            )
            .andExpect(status().isBadRequest());

        // Validate the StrategiePch in the database
        List<StrategiePch> strategiePchList = strategiePchRepository.findAll();
        assertThat(strategiePchList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchStrategiePch() throws Exception {
        int databaseSizeBeforeUpdate = strategiePchRepository.findAll().size();
        strategiePch.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStrategiePchMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(strategiePch))
            )
            .andExpect(status().isBadRequest());

        // Validate the StrategiePch in the database
        List<StrategiePch> strategiePchList = strategiePchRepository.findAll();
        assertThat(strategiePchList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamStrategiePch() throws Exception {
        int databaseSizeBeforeUpdate = strategiePchRepository.findAll().size();
        strategiePch.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStrategiePchMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(strategiePch))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the StrategiePch in the database
        List<StrategiePch> strategiePchList = strategiePchRepository.findAll();
        assertThat(strategiePchList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteStrategiePch() throws Exception {
        // Initialize the database
        strategiePchRepository.saveAndFlush(strategiePch);

        int databaseSizeBeforeDelete = strategiePchRepository.findAll().size();

        // Delete the strategiePch
        restStrategiePchMockMvc
            .perform(delete(ENTITY_API_URL_ID, strategiePch.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<StrategiePch> strategiePchList = strategiePchRepository.findAll();
        assertThat(strategiePchList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
