package fr.tixou.archisolver.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.tixou.archisolver.IntegrationTest;
import fr.tixou.archisolver.domain.NatureActivite;
import fr.tixou.archisolver.repository.NatureActiviteRepository;
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
 * Integration tests for the {@link NatureActiviteResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class NatureActiviteResourceIT {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/nature-activites";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private NatureActiviteRepository natureActiviteRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNatureActiviteMockMvc;

    private NatureActivite natureActivite;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NatureActivite createEntity(EntityManager em) {
        NatureActivite natureActivite = new NatureActivite().code(DEFAULT_CODE).libelle(DEFAULT_LIBELLE).description(DEFAULT_DESCRIPTION);
        return natureActivite;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NatureActivite createUpdatedEntity(EntityManager em) {
        NatureActivite natureActivite = new NatureActivite().code(UPDATED_CODE).libelle(UPDATED_LIBELLE).description(UPDATED_DESCRIPTION);
        return natureActivite;
    }

    @BeforeEach
    public void initTest() {
        natureActivite = createEntity(em);
    }

    @Test
    @Transactional
    void createNatureActivite() throws Exception {
        int databaseSizeBeforeCreate = natureActiviteRepository.findAll().size();
        // Create the NatureActivite
        restNatureActiviteMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(natureActivite))
            )
            .andExpect(status().isCreated());

        // Validate the NatureActivite in the database
        List<NatureActivite> natureActiviteList = natureActiviteRepository.findAll();
        assertThat(natureActiviteList).hasSize(databaseSizeBeforeCreate + 1);
        NatureActivite testNatureActivite = natureActiviteList.get(natureActiviteList.size() - 1);
        assertThat(testNatureActivite.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testNatureActivite.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testNatureActivite.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    void createNatureActiviteWithExistingId() throws Exception {
        // Create the NatureActivite with an existing ID
        natureActivite.setId(1L);

        int databaseSizeBeforeCreate = natureActiviteRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restNatureActiviteMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(natureActivite))
            )
            .andExpect(status().isBadRequest());

        // Validate the NatureActivite in the database
        List<NatureActivite> natureActiviteList = natureActiviteRepository.findAll();
        assertThat(natureActiviteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllNatureActivites() throws Exception {
        // Initialize the database
        natureActiviteRepository.saveAndFlush(natureActivite);

        // Get all the natureActiviteList
        restNatureActiviteMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(natureActivite.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    @Transactional
    void getNatureActivite() throws Exception {
        // Initialize the database
        natureActiviteRepository.saveAndFlush(natureActivite);

        // Get the natureActivite
        restNatureActiviteMockMvc
            .perform(get(ENTITY_API_URL_ID, natureActivite.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(natureActivite.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    void getNonExistingNatureActivite() throws Exception {
        // Get the natureActivite
        restNatureActiviteMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewNatureActivite() throws Exception {
        // Initialize the database
        natureActiviteRepository.saveAndFlush(natureActivite);

        int databaseSizeBeforeUpdate = natureActiviteRepository.findAll().size();

        // Update the natureActivite
        NatureActivite updatedNatureActivite = natureActiviteRepository.findById(natureActivite.getId()).get();
        // Disconnect from session so that the updates on updatedNatureActivite are not directly saved in db
        em.detach(updatedNatureActivite);
        updatedNatureActivite.code(UPDATED_CODE).libelle(UPDATED_LIBELLE).description(UPDATED_DESCRIPTION);

        restNatureActiviteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedNatureActivite.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedNatureActivite))
            )
            .andExpect(status().isOk());

        // Validate the NatureActivite in the database
        List<NatureActivite> natureActiviteList = natureActiviteRepository.findAll();
        assertThat(natureActiviteList).hasSize(databaseSizeBeforeUpdate);
        NatureActivite testNatureActivite = natureActiviteList.get(natureActiviteList.size() - 1);
        assertThat(testNatureActivite.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testNatureActivite.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testNatureActivite.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void putNonExistingNatureActivite() throws Exception {
        int databaseSizeBeforeUpdate = natureActiviteRepository.findAll().size();
        natureActivite.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNatureActiviteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, natureActivite.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(natureActivite))
            )
            .andExpect(status().isBadRequest());

        // Validate the NatureActivite in the database
        List<NatureActivite> natureActiviteList = natureActiviteRepository.findAll();
        assertThat(natureActiviteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchNatureActivite() throws Exception {
        int databaseSizeBeforeUpdate = natureActiviteRepository.findAll().size();
        natureActivite.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNatureActiviteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(natureActivite))
            )
            .andExpect(status().isBadRequest());

        // Validate the NatureActivite in the database
        List<NatureActivite> natureActiviteList = natureActiviteRepository.findAll();
        assertThat(natureActiviteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamNatureActivite() throws Exception {
        int databaseSizeBeforeUpdate = natureActiviteRepository.findAll().size();
        natureActivite.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNatureActiviteMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(natureActivite)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the NatureActivite in the database
        List<NatureActivite> natureActiviteList = natureActiviteRepository.findAll();
        assertThat(natureActiviteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateNatureActiviteWithPatch() throws Exception {
        // Initialize the database
        natureActiviteRepository.saveAndFlush(natureActivite);

        int databaseSizeBeforeUpdate = natureActiviteRepository.findAll().size();

        // Update the natureActivite using partial update
        NatureActivite partialUpdatedNatureActivite = new NatureActivite();
        partialUpdatedNatureActivite.setId(natureActivite.getId());

        partialUpdatedNatureActivite.code(UPDATED_CODE).description(UPDATED_DESCRIPTION);

        restNatureActiviteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNatureActivite.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedNatureActivite))
            )
            .andExpect(status().isOk());

        // Validate the NatureActivite in the database
        List<NatureActivite> natureActiviteList = natureActiviteRepository.findAll();
        assertThat(natureActiviteList).hasSize(databaseSizeBeforeUpdate);
        NatureActivite testNatureActivite = natureActiviteList.get(natureActiviteList.size() - 1);
        assertThat(testNatureActivite.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testNatureActivite.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testNatureActivite.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void fullUpdateNatureActiviteWithPatch() throws Exception {
        // Initialize the database
        natureActiviteRepository.saveAndFlush(natureActivite);

        int databaseSizeBeforeUpdate = natureActiviteRepository.findAll().size();

        // Update the natureActivite using partial update
        NatureActivite partialUpdatedNatureActivite = new NatureActivite();
        partialUpdatedNatureActivite.setId(natureActivite.getId());

        partialUpdatedNatureActivite.code(UPDATED_CODE).libelle(UPDATED_LIBELLE).description(UPDATED_DESCRIPTION);

        restNatureActiviteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNatureActivite.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedNatureActivite))
            )
            .andExpect(status().isOk());

        // Validate the NatureActivite in the database
        List<NatureActivite> natureActiviteList = natureActiviteRepository.findAll();
        assertThat(natureActiviteList).hasSize(databaseSizeBeforeUpdate);
        NatureActivite testNatureActivite = natureActiviteList.get(natureActiviteList.size() - 1);
        assertThat(testNatureActivite.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testNatureActivite.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testNatureActivite.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void patchNonExistingNatureActivite() throws Exception {
        int databaseSizeBeforeUpdate = natureActiviteRepository.findAll().size();
        natureActivite.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNatureActiviteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, natureActivite.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(natureActivite))
            )
            .andExpect(status().isBadRequest());

        // Validate the NatureActivite in the database
        List<NatureActivite> natureActiviteList = natureActiviteRepository.findAll();
        assertThat(natureActiviteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchNatureActivite() throws Exception {
        int databaseSizeBeforeUpdate = natureActiviteRepository.findAll().size();
        natureActivite.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNatureActiviteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(natureActivite))
            )
            .andExpect(status().isBadRequest());

        // Validate the NatureActivite in the database
        List<NatureActivite> natureActiviteList = natureActiviteRepository.findAll();
        assertThat(natureActiviteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamNatureActivite() throws Exception {
        int databaseSizeBeforeUpdate = natureActiviteRepository.findAll().size();
        natureActivite.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNatureActiviteMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(natureActivite))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the NatureActivite in the database
        List<NatureActivite> natureActiviteList = natureActiviteRepository.findAll();
        assertThat(natureActiviteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteNatureActivite() throws Exception {
        // Initialize the database
        natureActiviteRepository.saveAndFlush(natureActivite);

        int databaseSizeBeforeDelete = natureActiviteRepository.findAll().size();

        // Delete the natureActivite
        restNatureActiviteMockMvc
            .perform(delete(ENTITY_API_URL_ID, natureActivite.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NatureActivite> natureActiviteList = natureActiviteRepository.findAll();
        assertThat(natureActiviteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
