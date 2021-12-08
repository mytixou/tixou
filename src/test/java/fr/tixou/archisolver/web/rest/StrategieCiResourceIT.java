package fr.tixou.archisolver.web.rest;

import static fr.tixou.archisolver.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.tixou.archisolver.IntegrationTest;
import fr.tixou.archisolver.domain.StrategieCi;
import fr.tixou.archisolver.repository.StrategieCiRepository;
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
 * Integration tests for the {@link StrategieCiResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class StrategieCiResourceIT {

    private static final Boolean DEFAULT_IS_ACTIF = false;
    private static final Boolean UPDATED_IS_ACTIF = true;

    private static final Integer DEFAULT_ANNE = 1;
    private static final Integer UPDATED_ANNE = 2;

    private static final BigDecimal DEFAULT_MONTANT_PLAFOND = new BigDecimal(1);
    private static final BigDecimal UPDATED_MONTANT_PLAFOND = new BigDecimal(2);

    private static final BigDecimal DEFAULT_TAUX = new BigDecimal(1);
    private static final BigDecimal UPDATED_TAUX = new BigDecimal(2);

    private static final String ENTITY_API_URL = "/api/strategie-cis";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private StrategieCiRepository strategieCiRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStrategieCiMockMvc;

    private StrategieCi strategieCi;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StrategieCi createEntity(EntityManager em) {
        StrategieCi strategieCi = new StrategieCi()
            .isActif(DEFAULT_IS_ACTIF)
            .anne(DEFAULT_ANNE)
            .montantPlafond(DEFAULT_MONTANT_PLAFOND)
            .taux(DEFAULT_TAUX);
        return strategieCi;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StrategieCi createUpdatedEntity(EntityManager em) {
        StrategieCi strategieCi = new StrategieCi()
            .isActif(UPDATED_IS_ACTIF)
            .anne(UPDATED_ANNE)
            .montantPlafond(UPDATED_MONTANT_PLAFOND)
            .taux(UPDATED_TAUX);
        return strategieCi;
    }

    @BeforeEach
    public void initTest() {
        strategieCi = createEntity(em);
    }

    @Test
    @Transactional
    void createStrategieCi() throws Exception {
        int databaseSizeBeforeCreate = strategieCiRepository.findAll().size();
        // Create the StrategieCi
        restStrategieCiMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(strategieCi)))
            .andExpect(status().isCreated());

        // Validate the StrategieCi in the database
        List<StrategieCi> strategieCiList = strategieCiRepository.findAll();
        assertThat(strategieCiList).hasSize(databaseSizeBeforeCreate + 1);
        StrategieCi testStrategieCi = strategieCiList.get(strategieCiList.size() - 1);
        assertThat(testStrategieCi.getIsActif()).isEqualTo(DEFAULT_IS_ACTIF);
        assertThat(testStrategieCi.getAnne()).isEqualTo(DEFAULT_ANNE);
        assertThat(testStrategieCi.getMontantPlafond()).isEqualByComparingTo(DEFAULT_MONTANT_PLAFOND);
        assertThat(testStrategieCi.getTaux()).isEqualByComparingTo(DEFAULT_TAUX);
    }

    @Test
    @Transactional
    void createStrategieCiWithExistingId() throws Exception {
        // Create the StrategieCi with an existing ID
        strategieCi.setId(1L);

        int databaseSizeBeforeCreate = strategieCiRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restStrategieCiMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(strategieCi)))
            .andExpect(status().isBadRequest());

        // Validate the StrategieCi in the database
        List<StrategieCi> strategieCiList = strategieCiRepository.findAll();
        assertThat(strategieCiList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllStrategieCis() throws Exception {
        // Initialize the database
        strategieCiRepository.saveAndFlush(strategieCi);

        // Get all the strategieCiList
        restStrategieCiMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(strategieCi.getId().intValue())))
            .andExpect(jsonPath("$.[*].isActif").value(hasItem(DEFAULT_IS_ACTIF.booleanValue())))
            .andExpect(jsonPath("$.[*].anne").value(hasItem(DEFAULT_ANNE)))
            .andExpect(jsonPath("$.[*].montantPlafond").value(hasItem(sameNumber(DEFAULT_MONTANT_PLAFOND))))
            .andExpect(jsonPath("$.[*].taux").value(hasItem(sameNumber(DEFAULT_TAUX))));
    }

    @Test
    @Transactional
    void getStrategieCi() throws Exception {
        // Initialize the database
        strategieCiRepository.saveAndFlush(strategieCi);

        // Get the strategieCi
        restStrategieCiMockMvc
            .perform(get(ENTITY_API_URL_ID, strategieCi.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(strategieCi.getId().intValue()))
            .andExpect(jsonPath("$.isActif").value(DEFAULT_IS_ACTIF.booleanValue()))
            .andExpect(jsonPath("$.anne").value(DEFAULT_ANNE))
            .andExpect(jsonPath("$.montantPlafond").value(sameNumber(DEFAULT_MONTANT_PLAFOND)))
            .andExpect(jsonPath("$.taux").value(sameNumber(DEFAULT_TAUX)));
    }

    @Test
    @Transactional
    void getNonExistingStrategieCi() throws Exception {
        // Get the strategieCi
        restStrategieCiMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewStrategieCi() throws Exception {
        // Initialize the database
        strategieCiRepository.saveAndFlush(strategieCi);

        int databaseSizeBeforeUpdate = strategieCiRepository.findAll().size();

        // Update the strategieCi
        StrategieCi updatedStrategieCi = strategieCiRepository.findById(strategieCi.getId()).get();
        // Disconnect from session so that the updates on updatedStrategieCi are not directly saved in db
        em.detach(updatedStrategieCi);
        updatedStrategieCi.isActif(UPDATED_IS_ACTIF).anne(UPDATED_ANNE).montantPlafond(UPDATED_MONTANT_PLAFOND).taux(UPDATED_TAUX);

        restStrategieCiMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedStrategieCi.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedStrategieCi))
            )
            .andExpect(status().isOk());

        // Validate the StrategieCi in the database
        List<StrategieCi> strategieCiList = strategieCiRepository.findAll();
        assertThat(strategieCiList).hasSize(databaseSizeBeforeUpdate);
        StrategieCi testStrategieCi = strategieCiList.get(strategieCiList.size() - 1);
        assertThat(testStrategieCi.getIsActif()).isEqualTo(UPDATED_IS_ACTIF);
        assertThat(testStrategieCi.getAnne()).isEqualTo(UPDATED_ANNE);
        assertThat(testStrategieCi.getMontantPlafond()).isEqualTo(UPDATED_MONTANT_PLAFOND);
        assertThat(testStrategieCi.getTaux()).isEqualTo(UPDATED_TAUX);
    }

    @Test
    @Transactional
    void putNonExistingStrategieCi() throws Exception {
        int databaseSizeBeforeUpdate = strategieCiRepository.findAll().size();
        strategieCi.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStrategieCiMockMvc
            .perform(
                put(ENTITY_API_URL_ID, strategieCi.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(strategieCi))
            )
            .andExpect(status().isBadRequest());

        // Validate the StrategieCi in the database
        List<StrategieCi> strategieCiList = strategieCiRepository.findAll();
        assertThat(strategieCiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchStrategieCi() throws Exception {
        int databaseSizeBeforeUpdate = strategieCiRepository.findAll().size();
        strategieCi.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStrategieCiMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(strategieCi))
            )
            .andExpect(status().isBadRequest());

        // Validate the StrategieCi in the database
        List<StrategieCi> strategieCiList = strategieCiRepository.findAll();
        assertThat(strategieCiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamStrategieCi() throws Exception {
        int databaseSizeBeforeUpdate = strategieCiRepository.findAll().size();
        strategieCi.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStrategieCiMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(strategieCi)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the StrategieCi in the database
        List<StrategieCi> strategieCiList = strategieCiRepository.findAll();
        assertThat(strategieCiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateStrategieCiWithPatch() throws Exception {
        // Initialize the database
        strategieCiRepository.saveAndFlush(strategieCi);

        int databaseSizeBeforeUpdate = strategieCiRepository.findAll().size();

        // Update the strategieCi using partial update
        StrategieCi partialUpdatedStrategieCi = new StrategieCi();
        partialUpdatedStrategieCi.setId(strategieCi.getId());

        partialUpdatedStrategieCi.anne(UPDATED_ANNE).montantPlafond(UPDATED_MONTANT_PLAFOND).taux(UPDATED_TAUX);

        restStrategieCiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStrategieCi.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedStrategieCi))
            )
            .andExpect(status().isOk());

        // Validate the StrategieCi in the database
        List<StrategieCi> strategieCiList = strategieCiRepository.findAll();
        assertThat(strategieCiList).hasSize(databaseSizeBeforeUpdate);
        StrategieCi testStrategieCi = strategieCiList.get(strategieCiList.size() - 1);
        assertThat(testStrategieCi.getIsActif()).isEqualTo(DEFAULT_IS_ACTIF);
        assertThat(testStrategieCi.getAnne()).isEqualTo(UPDATED_ANNE);
        assertThat(testStrategieCi.getMontantPlafond()).isEqualByComparingTo(UPDATED_MONTANT_PLAFOND);
        assertThat(testStrategieCi.getTaux()).isEqualByComparingTo(UPDATED_TAUX);
    }

    @Test
    @Transactional
    void fullUpdateStrategieCiWithPatch() throws Exception {
        // Initialize the database
        strategieCiRepository.saveAndFlush(strategieCi);

        int databaseSizeBeforeUpdate = strategieCiRepository.findAll().size();

        // Update the strategieCi using partial update
        StrategieCi partialUpdatedStrategieCi = new StrategieCi();
        partialUpdatedStrategieCi.setId(strategieCi.getId());

        partialUpdatedStrategieCi.isActif(UPDATED_IS_ACTIF).anne(UPDATED_ANNE).montantPlafond(UPDATED_MONTANT_PLAFOND).taux(UPDATED_TAUX);

        restStrategieCiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStrategieCi.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedStrategieCi))
            )
            .andExpect(status().isOk());

        // Validate the StrategieCi in the database
        List<StrategieCi> strategieCiList = strategieCiRepository.findAll();
        assertThat(strategieCiList).hasSize(databaseSizeBeforeUpdate);
        StrategieCi testStrategieCi = strategieCiList.get(strategieCiList.size() - 1);
        assertThat(testStrategieCi.getIsActif()).isEqualTo(UPDATED_IS_ACTIF);
        assertThat(testStrategieCi.getAnne()).isEqualTo(UPDATED_ANNE);
        assertThat(testStrategieCi.getMontantPlafond()).isEqualByComparingTo(UPDATED_MONTANT_PLAFOND);
        assertThat(testStrategieCi.getTaux()).isEqualByComparingTo(UPDATED_TAUX);
    }

    @Test
    @Transactional
    void patchNonExistingStrategieCi() throws Exception {
        int databaseSizeBeforeUpdate = strategieCiRepository.findAll().size();
        strategieCi.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStrategieCiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, strategieCi.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(strategieCi))
            )
            .andExpect(status().isBadRequest());

        // Validate the StrategieCi in the database
        List<StrategieCi> strategieCiList = strategieCiRepository.findAll();
        assertThat(strategieCiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchStrategieCi() throws Exception {
        int databaseSizeBeforeUpdate = strategieCiRepository.findAll().size();
        strategieCi.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStrategieCiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(strategieCi))
            )
            .andExpect(status().isBadRequest());

        // Validate the StrategieCi in the database
        List<StrategieCi> strategieCiList = strategieCiRepository.findAll();
        assertThat(strategieCiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamStrategieCi() throws Exception {
        int databaseSizeBeforeUpdate = strategieCiRepository.findAll().size();
        strategieCi.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStrategieCiMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(strategieCi))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the StrategieCi in the database
        List<StrategieCi> strategieCiList = strategieCiRepository.findAll();
        assertThat(strategieCiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteStrategieCi() throws Exception {
        // Initialize the database
        strategieCiRepository.saveAndFlush(strategieCi);

        int databaseSizeBeforeDelete = strategieCiRepository.findAll().size();

        // Delete the strategieCi
        restStrategieCiMockMvc
            .perform(delete(ENTITY_API_URL_ID, strategieCi.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<StrategieCi> strategieCiList = strategieCiRepository.findAll();
        assertThat(strategieCiList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
