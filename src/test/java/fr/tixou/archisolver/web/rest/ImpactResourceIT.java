package fr.tixou.archisolver.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.tixou.archisolver.IntegrationTest;
import fr.tixou.archisolver.domain.Impact;
import fr.tixou.archisolver.domain.enumeration.TypeDestination;
import fr.tixou.archisolver.repository.ImpactRepository;
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
 * Integration tests for the {@link ImpactResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ImpactResourceIT {

    private static final String DEFAULT_DESIGNATION = "AAAAAAAAAA";
    private static final String UPDATED_DESIGNATION = "BBBBBBBBBB";

    private static final String DEFAULT_EXPLICATION = "AAAAAAAAAA";
    private static final String UPDATED_EXPLICATION = "BBBBBBBBBB";

    private static final TypeDestination DEFAULT_TYPE_IMPACT = TypeDestination.TERRAIN;
    private static final TypeDestination UPDATED_TYPE_IMPACT = TypeDestination.BATIMENT;

    private static final String ENTITY_API_URL = "/api/impacts";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ImpactRepository impactRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restImpactMockMvc;

    private Impact impact;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Impact createEntity(EntityManager em) {
        Impact impact = new Impact().designation(DEFAULT_DESIGNATION).explication(DEFAULT_EXPLICATION).typeImpact(DEFAULT_TYPE_IMPACT);
        return impact;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Impact createUpdatedEntity(EntityManager em) {
        Impact impact = new Impact().designation(UPDATED_DESIGNATION).explication(UPDATED_EXPLICATION).typeImpact(UPDATED_TYPE_IMPACT);
        return impact;
    }

    @BeforeEach
    public void initTest() {
        impact = createEntity(em);
    }

    @Test
    @Transactional
    void createImpact() throws Exception {
        int databaseSizeBeforeCreate = impactRepository.findAll().size();
        // Create the Impact
        restImpactMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(impact)))
            .andExpect(status().isCreated());

        // Validate the Impact in the database
        List<Impact> impactList = impactRepository.findAll();
        assertThat(impactList).hasSize(databaseSizeBeforeCreate + 1);
        Impact testImpact = impactList.get(impactList.size() - 1);
        assertThat(testImpact.getDesignation()).isEqualTo(DEFAULT_DESIGNATION);
        assertThat(testImpact.getExplication()).isEqualTo(DEFAULT_EXPLICATION);
        assertThat(testImpact.getTypeImpact()).isEqualTo(DEFAULT_TYPE_IMPACT);
    }

    @Test
    @Transactional
    void createImpactWithExistingId() throws Exception {
        // Create the Impact with an existing ID
        impact.setId(1L);

        int databaseSizeBeforeCreate = impactRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restImpactMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(impact)))
            .andExpect(status().isBadRequest());

        // Validate the Impact in the database
        List<Impact> impactList = impactRepository.findAll();
        assertThat(impactList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllImpacts() throws Exception {
        // Initialize the database
        impactRepository.saveAndFlush(impact);

        // Get all the impactList
        restImpactMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(impact.getId().intValue())))
            .andExpect(jsonPath("$.[*].designation").value(hasItem(DEFAULT_DESIGNATION)))
            .andExpect(jsonPath("$.[*].explication").value(hasItem(DEFAULT_EXPLICATION)))
            .andExpect(jsonPath("$.[*].typeImpact").value(hasItem(DEFAULT_TYPE_IMPACT.toString())));
    }

    @Test
    @Transactional
    void getImpact() throws Exception {
        // Initialize the database
        impactRepository.saveAndFlush(impact);

        // Get the impact
        restImpactMockMvc
            .perform(get(ENTITY_API_URL_ID, impact.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(impact.getId().intValue()))
            .andExpect(jsonPath("$.designation").value(DEFAULT_DESIGNATION))
            .andExpect(jsonPath("$.explication").value(DEFAULT_EXPLICATION))
            .andExpect(jsonPath("$.typeImpact").value(DEFAULT_TYPE_IMPACT.toString()));
    }

    @Test
    @Transactional
    void getNonExistingImpact() throws Exception {
        // Get the impact
        restImpactMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewImpact() throws Exception {
        // Initialize the database
        impactRepository.saveAndFlush(impact);

        int databaseSizeBeforeUpdate = impactRepository.findAll().size();

        // Update the impact
        Impact updatedImpact = impactRepository.findById(impact.getId()).get();
        // Disconnect from session so that the updates on updatedImpact are not directly saved in db
        em.detach(updatedImpact);
        updatedImpact.designation(UPDATED_DESIGNATION).explication(UPDATED_EXPLICATION).typeImpact(UPDATED_TYPE_IMPACT);

        restImpactMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedImpact.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedImpact))
            )
            .andExpect(status().isOk());

        // Validate the Impact in the database
        List<Impact> impactList = impactRepository.findAll();
        assertThat(impactList).hasSize(databaseSizeBeforeUpdate);
        Impact testImpact = impactList.get(impactList.size() - 1);
        assertThat(testImpact.getDesignation()).isEqualTo(UPDATED_DESIGNATION);
        assertThat(testImpact.getExplication()).isEqualTo(UPDATED_EXPLICATION);
        assertThat(testImpact.getTypeImpact()).isEqualTo(UPDATED_TYPE_IMPACT);
    }

    @Test
    @Transactional
    void putNonExistingImpact() throws Exception {
        int databaseSizeBeforeUpdate = impactRepository.findAll().size();
        impact.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restImpactMockMvc
            .perform(
                put(ENTITY_API_URL_ID, impact.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(impact))
            )
            .andExpect(status().isBadRequest());

        // Validate the Impact in the database
        List<Impact> impactList = impactRepository.findAll();
        assertThat(impactList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchImpact() throws Exception {
        int databaseSizeBeforeUpdate = impactRepository.findAll().size();
        impact.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restImpactMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(impact))
            )
            .andExpect(status().isBadRequest());

        // Validate the Impact in the database
        List<Impact> impactList = impactRepository.findAll();
        assertThat(impactList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamImpact() throws Exception {
        int databaseSizeBeforeUpdate = impactRepository.findAll().size();
        impact.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restImpactMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(impact)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Impact in the database
        List<Impact> impactList = impactRepository.findAll();
        assertThat(impactList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateImpactWithPatch() throws Exception {
        // Initialize the database
        impactRepository.saveAndFlush(impact);

        int databaseSizeBeforeUpdate = impactRepository.findAll().size();

        // Update the impact using partial update
        Impact partialUpdatedImpact = new Impact();
        partialUpdatedImpact.setId(impact.getId());

        partialUpdatedImpact.typeImpact(UPDATED_TYPE_IMPACT);

        restImpactMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedImpact.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedImpact))
            )
            .andExpect(status().isOk());

        // Validate the Impact in the database
        List<Impact> impactList = impactRepository.findAll();
        assertThat(impactList).hasSize(databaseSizeBeforeUpdate);
        Impact testImpact = impactList.get(impactList.size() - 1);
        assertThat(testImpact.getDesignation()).isEqualTo(DEFAULT_DESIGNATION);
        assertThat(testImpact.getExplication()).isEqualTo(DEFAULT_EXPLICATION);
        assertThat(testImpact.getTypeImpact()).isEqualTo(UPDATED_TYPE_IMPACT);
    }

    @Test
    @Transactional
    void fullUpdateImpactWithPatch() throws Exception {
        // Initialize the database
        impactRepository.saveAndFlush(impact);

        int databaseSizeBeforeUpdate = impactRepository.findAll().size();

        // Update the impact using partial update
        Impact partialUpdatedImpact = new Impact();
        partialUpdatedImpact.setId(impact.getId());

        partialUpdatedImpact.designation(UPDATED_DESIGNATION).explication(UPDATED_EXPLICATION).typeImpact(UPDATED_TYPE_IMPACT);

        restImpactMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedImpact.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedImpact))
            )
            .andExpect(status().isOk());

        // Validate the Impact in the database
        List<Impact> impactList = impactRepository.findAll();
        assertThat(impactList).hasSize(databaseSizeBeforeUpdate);
        Impact testImpact = impactList.get(impactList.size() - 1);
        assertThat(testImpact.getDesignation()).isEqualTo(UPDATED_DESIGNATION);
        assertThat(testImpact.getExplication()).isEqualTo(UPDATED_EXPLICATION);
        assertThat(testImpact.getTypeImpact()).isEqualTo(UPDATED_TYPE_IMPACT);
    }

    @Test
    @Transactional
    void patchNonExistingImpact() throws Exception {
        int databaseSizeBeforeUpdate = impactRepository.findAll().size();
        impact.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restImpactMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, impact.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(impact))
            )
            .andExpect(status().isBadRequest());

        // Validate the Impact in the database
        List<Impact> impactList = impactRepository.findAll();
        assertThat(impactList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchImpact() throws Exception {
        int databaseSizeBeforeUpdate = impactRepository.findAll().size();
        impact.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restImpactMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(impact))
            )
            .andExpect(status().isBadRequest());

        // Validate the Impact in the database
        List<Impact> impactList = impactRepository.findAll();
        assertThat(impactList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamImpact() throws Exception {
        int databaseSizeBeforeUpdate = impactRepository.findAll().size();
        impact.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restImpactMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(impact)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Impact in the database
        List<Impact> impactList = impactRepository.findAll();
        assertThat(impactList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteImpact() throws Exception {
        // Initialize the database
        impactRepository.saveAndFlush(impact);

        int databaseSizeBeforeDelete = impactRepository.findAll().size();

        // Delete the impact
        restImpactMockMvc
            .perform(delete(ENTITY_API_URL_ID, impact.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Impact> impactList = impactRepository.findAll();
        assertThat(impactList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
