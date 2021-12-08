package fr.tixou.archisolver.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.tixou.archisolver.IntegrationTest;
import fr.tixou.archisolver.domain.NatureMontant;
import fr.tixou.archisolver.repository.NatureMontantRepository;
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
 * Integration tests for the {@link NatureMontantResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class NatureMontantResourceIT {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/nature-montants";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private NatureMontantRepository natureMontantRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNatureMontantMockMvc;

    private NatureMontant natureMontant;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NatureMontant createEntity(EntityManager em) {
        NatureMontant natureMontant = new NatureMontant().code(DEFAULT_CODE).libelle(DEFAULT_LIBELLE).description(DEFAULT_DESCRIPTION);
        return natureMontant;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NatureMontant createUpdatedEntity(EntityManager em) {
        NatureMontant natureMontant = new NatureMontant().code(UPDATED_CODE).libelle(UPDATED_LIBELLE).description(UPDATED_DESCRIPTION);
        return natureMontant;
    }

    @BeforeEach
    public void initTest() {
        natureMontant = createEntity(em);
    }

    @Test
    @Transactional
    void createNatureMontant() throws Exception {
        int databaseSizeBeforeCreate = natureMontantRepository.findAll().size();
        // Create the NatureMontant
        restNatureMontantMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(natureMontant)))
            .andExpect(status().isCreated());

        // Validate the NatureMontant in the database
        List<NatureMontant> natureMontantList = natureMontantRepository.findAll();
        assertThat(natureMontantList).hasSize(databaseSizeBeforeCreate + 1);
        NatureMontant testNatureMontant = natureMontantList.get(natureMontantList.size() - 1);
        assertThat(testNatureMontant.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testNatureMontant.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testNatureMontant.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    void createNatureMontantWithExistingId() throws Exception {
        // Create the NatureMontant with an existing ID
        natureMontant.setId(1L);

        int databaseSizeBeforeCreate = natureMontantRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restNatureMontantMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(natureMontant)))
            .andExpect(status().isBadRequest());

        // Validate the NatureMontant in the database
        List<NatureMontant> natureMontantList = natureMontantRepository.findAll();
        assertThat(natureMontantList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllNatureMontants() throws Exception {
        // Initialize the database
        natureMontantRepository.saveAndFlush(natureMontant);

        // Get all the natureMontantList
        restNatureMontantMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(natureMontant.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    @Transactional
    void getNatureMontant() throws Exception {
        // Initialize the database
        natureMontantRepository.saveAndFlush(natureMontant);

        // Get the natureMontant
        restNatureMontantMockMvc
            .perform(get(ENTITY_API_URL_ID, natureMontant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(natureMontant.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    void getNonExistingNatureMontant() throws Exception {
        // Get the natureMontant
        restNatureMontantMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewNatureMontant() throws Exception {
        // Initialize the database
        natureMontantRepository.saveAndFlush(natureMontant);

        int databaseSizeBeforeUpdate = natureMontantRepository.findAll().size();

        // Update the natureMontant
        NatureMontant updatedNatureMontant = natureMontantRepository.findById(natureMontant.getId()).get();
        // Disconnect from session so that the updates on updatedNatureMontant are not directly saved in db
        em.detach(updatedNatureMontant);
        updatedNatureMontant.code(UPDATED_CODE).libelle(UPDATED_LIBELLE).description(UPDATED_DESCRIPTION);

        restNatureMontantMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedNatureMontant.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedNatureMontant))
            )
            .andExpect(status().isOk());

        // Validate the NatureMontant in the database
        List<NatureMontant> natureMontantList = natureMontantRepository.findAll();
        assertThat(natureMontantList).hasSize(databaseSizeBeforeUpdate);
        NatureMontant testNatureMontant = natureMontantList.get(natureMontantList.size() - 1);
        assertThat(testNatureMontant.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testNatureMontant.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testNatureMontant.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void putNonExistingNatureMontant() throws Exception {
        int databaseSizeBeforeUpdate = natureMontantRepository.findAll().size();
        natureMontant.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNatureMontantMockMvc
            .perform(
                put(ENTITY_API_URL_ID, natureMontant.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(natureMontant))
            )
            .andExpect(status().isBadRequest());

        // Validate the NatureMontant in the database
        List<NatureMontant> natureMontantList = natureMontantRepository.findAll();
        assertThat(natureMontantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchNatureMontant() throws Exception {
        int databaseSizeBeforeUpdate = natureMontantRepository.findAll().size();
        natureMontant.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNatureMontantMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(natureMontant))
            )
            .andExpect(status().isBadRequest());

        // Validate the NatureMontant in the database
        List<NatureMontant> natureMontantList = natureMontantRepository.findAll();
        assertThat(natureMontantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamNatureMontant() throws Exception {
        int databaseSizeBeforeUpdate = natureMontantRepository.findAll().size();
        natureMontant.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNatureMontantMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(natureMontant)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the NatureMontant in the database
        List<NatureMontant> natureMontantList = natureMontantRepository.findAll();
        assertThat(natureMontantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateNatureMontantWithPatch() throws Exception {
        // Initialize the database
        natureMontantRepository.saveAndFlush(natureMontant);

        int databaseSizeBeforeUpdate = natureMontantRepository.findAll().size();

        // Update the natureMontant using partial update
        NatureMontant partialUpdatedNatureMontant = new NatureMontant();
        partialUpdatedNatureMontant.setId(natureMontant.getId());

        partialUpdatedNatureMontant.libelle(UPDATED_LIBELLE);

        restNatureMontantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNatureMontant.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedNatureMontant))
            )
            .andExpect(status().isOk());

        // Validate the NatureMontant in the database
        List<NatureMontant> natureMontantList = natureMontantRepository.findAll();
        assertThat(natureMontantList).hasSize(databaseSizeBeforeUpdate);
        NatureMontant testNatureMontant = natureMontantList.get(natureMontantList.size() - 1);
        assertThat(testNatureMontant.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testNatureMontant.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testNatureMontant.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    void fullUpdateNatureMontantWithPatch() throws Exception {
        // Initialize the database
        natureMontantRepository.saveAndFlush(natureMontant);

        int databaseSizeBeforeUpdate = natureMontantRepository.findAll().size();

        // Update the natureMontant using partial update
        NatureMontant partialUpdatedNatureMontant = new NatureMontant();
        partialUpdatedNatureMontant.setId(natureMontant.getId());

        partialUpdatedNatureMontant.code(UPDATED_CODE).libelle(UPDATED_LIBELLE).description(UPDATED_DESCRIPTION);

        restNatureMontantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNatureMontant.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedNatureMontant))
            )
            .andExpect(status().isOk());

        // Validate the NatureMontant in the database
        List<NatureMontant> natureMontantList = natureMontantRepository.findAll();
        assertThat(natureMontantList).hasSize(databaseSizeBeforeUpdate);
        NatureMontant testNatureMontant = natureMontantList.get(natureMontantList.size() - 1);
        assertThat(testNatureMontant.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testNatureMontant.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testNatureMontant.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void patchNonExistingNatureMontant() throws Exception {
        int databaseSizeBeforeUpdate = natureMontantRepository.findAll().size();
        natureMontant.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNatureMontantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, natureMontant.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(natureMontant))
            )
            .andExpect(status().isBadRequest());

        // Validate the NatureMontant in the database
        List<NatureMontant> natureMontantList = natureMontantRepository.findAll();
        assertThat(natureMontantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchNatureMontant() throws Exception {
        int databaseSizeBeforeUpdate = natureMontantRepository.findAll().size();
        natureMontant.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNatureMontantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(natureMontant))
            )
            .andExpect(status().isBadRequest());

        // Validate the NatureMontant in the database
        List<NatureMontant> natureMontantList = natureMontantRepository.findAll();
        assertThat(natureMontantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamNatureMontant() throws Exception {
        int databaseSizeBeforeUpdate = natureMontantRepository.findAll().size();
        natureMontant.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNatureMontantMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(natureMontant))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the NatureMontant in the database
        List<NatureMontant> natureMontantList = natureMontantRepository.findAll();
        assertThat(natureMontantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteNatureMontant() throws Exception {
        // Initialize the database
        natureMontantRepository.saveAndFlush(natureMontant);

        int databaseSizeBeforeDelete = natureMontantRepository.findAll().size();

        // Delete the natureMontant
        restNatureMontantMockMvc
            .perform(delete(ENTITY_API_URL_ID, natureMontant.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NatureMontant> natureMontantList = natureMontantRepository.findAll();
        assertThat(natureMontantList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
