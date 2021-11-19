package fr.tixou.archisolver.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.tixou.archisolver.IntegrationTest;
import fr.tixou.archisolver.domain.RefContrainte;
import fr.tixou.archisolver.domain.enumeration.TypeContrainte;
import fr.tixou.archisolver.domain.enumeration.TypeDestination;
import fr.tixou.archisolver.repository.RefContrainteRepository;
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
 * Integration tests for the {@link RefContrainteResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class RefContrainteResourceIT {

    private static final String DEFAULT_DESIGNATION = "AAAAAAAAAA";
    private static final String UPDATED_DESIGNATION = "BBBBBBBBBB";

    private static final TypeContrainte DEFAULT_TYPE_CONTRAINTE = TypeContrainte.PLU;
    private static final TypeContrainte UPDATED_TYPE_CONTRAINTE = TypeContrainte.RTE2020;

    private static final TypeDestination DEFAULT_TYPE_DESTINATION = TypeDestination.TERRAIN;
    private static final TypeDestination UPDATED_TYPE_DESTINATION = TypeDestination.BATIMENT;

    private static final String DEFAULT_EXPLICATION = "AAAAAAAAAA";
    private static final String UPDATED_EXPLICATION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/ref-contraintes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private RefContrainteRepository refContrainteRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRefContrainteMockMvc;

    private RefContrainte refContrainte;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RefContrainte createEntity(EntityManager em) {
        RefContrainte refContrainte = new RefContrainte()
            .designation(DEFAULT_DESIGNATION)
            .typeContrainte(DEFAULT_TYPE_CONTRAINTE)
            .typeDestination(DEFAULT_TYPE_DESTINATION)
            .explication(DEFAULT_EXPLICATION);
        return refContrainte;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RefContrainte createUpdatedEntity(EntityManager em) {
        RefContrainte refContrainte = new RefContrainte()
            .designation(UPDATED_DESIGNATION)
            .typeContrainte(UPDATED_TYPE_CONTRAINTE)
            .typeDestination(UPDATED_TYPE_DESTINATION)
            .explication(UPDATED_EXPLICATION);
        return refContrainte;
    }

    @BeforeEach
    public void initTest() {
        refContrainte = createEntity(em);
    }

    @Test
    @Transactional
    void createRefContrainte() throws Exception {
        int databaseSizeBeforeCreate = refContrainteRepository.findAll().size();
        // Create the RefContrainte
        restRefContrainteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(refContrainte)))
            .andExpect(status().isCreated());

        // Validate the RefContrainte in the database
        List<RefContrainte> refContrainteList = refContrainteRepository.findAll();
        assertThat(refContrainteList).hasSize(databaseSizeBeforeCreate + 1);
        RefContrainte testRefContrainte = refContrainteList.get(refContrainteList.size() - 1);
        assertThat(testRefContrainte.getDesignation()).isEqualTo(DEFAULT_DESIGNATION);
        assertThat(testRefContrainte.getTypeContrainte()).isEqualTo(DEFAULT_TYPE_CONTRAINTE);
        assertThat(testRefContrainte.getTypeDestination()).isEqualTo(DEFAULT_TYPE_DESTINATION);
        assertThat(testRefContrainte.getExplication()).isEqualTo(DEFAULT_EXPLICATION);
    }

    @Test
    @Transactional
    void createRefContrainteWithExistingId() throws Exception {
        // Create the RefContrainte with an existing ID
        refContrainte.setId(1L);

        int databaseSizeBeforeCreate = refContrainteRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restRefContrainteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(refContrainte)))
            .andExpect(status().isBadRequest());

        // Validate the RefContrainte in the database
        List<RefContrainte> refContrainteList = refContrainteRepository.findAll();
        assertThat(refContrainteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllRefContraintes() throws Exception {
        // Initialize the database
        refContrainteRepository.saveAndFlush(refContrainte);

        // Get all the refContrainteList
        restRefContrainteMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(refContrainte.getId().intValue())))
            .andExpect(jsonPath("$.[*].designation").value(hasItem(DEFAULT_DESIGNATION)))
            .andExpect(jsonPath("$.[*].typeContrainte").value(hasItem(DEFAULT_TYPE_CONTRAINTE.toString())))
            .andExpect(jsonPath("$.[*].typeDestination").value(hasItem(DEFAULT_TYPE_DESTINATION.toString())))
            .andExpect(jsonPath("$.[*].explication").value(hasItem(DEFAULT_EXPLICATION)));
    }

    @Test
    @Transactional
    void getRefContrainte() throws Exception {
        // Initialize the database
        refContrainteRepository.saveAndFlush(refContrainte);

        // Get the refContrainte
        restRefContrainteMockMvc
            .perform(get(ENTITY_API_URL_ID, refContrainte.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(refContrainte.getId().intValue()))
            .andExpect(jsonPath("$.designation").value(DEFAULT_DESIGNATION))
            .andExpect(jsonPath("$.typeContrainte").value(DEFAULT_TYPE_CONTRAINTE.toString()))
            .andExpect(jsonPath("$.typeDestination").value(DEFAULT_TYPE_DESTINATION.toString()))
            .andExpect(jsonPath("$.explication").value(DEFAULT_EXPLICATION));
    }

    @Test
    @Transactional
    void getNonExistingRefContrainte() throws Exception {
        // Get the refContrainte
        restRefContrainteMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewRefContrainte() throws Exception {
        // Initialize the database
        refContrainteRepository.saveAndFlush(refContrainte);

        int databaseSizeBeforeUpdate = refContrainteRepository.findAll().size();

        // Update the refContrainte
        RefContrainte updatedRefContrainte = refContrainteRepository.findById(refContrainte.getId()).get();
        // Disconnect from session so that the updates on updatedRefContrainte are not directly saved in db
        em.detach(updatedRefContrainte);
        updatedRefContrainte
            .designation(UPDATED_DESIGNATION)
            .typeContrainte(UPDATED_TYPE_CONTRAINTE)
            .typeDestination(UPDATED_TYPE_DESTINATION)
            .explication(UPDATED_EXPLICATION);

        restRefContrainteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedRefContrainte.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedRefContrainte))
            )
            .andExpect(status().isOk());

        // Validate the RefContrainte in the database
        List<RefContrainte> refContrainteList = refContrainteRepository.findAll();
        assertThat(refContrainteList).hasSize(databaseSizeBeforeUpdate);
        RefContrainte testRefContrainte = refContrainteList.get(refContrainteList.size() - 1);
        assertThat(testRefContrainte.getDesignation()).isEqualTo(UPDATED_DESIGNATION);
        assertThat(testRefContrainte.getTypeContrainte()).isEqualTo(UPDATED_TYPE_CONTRAINTE);
        assertThat(testRefContrainte.getTypeDestination()).isEqualTo(UPDATED_TYPE_DESTINATION);
        assertThat(testRefContrainte.getExplication()).isEqualTo(UPDATED_EXPLICATION);
    }

    @Test
    @Transactional
    void putNonExistingRefContrainte() throws Exception {
        int databaseSizeBeforeUpdate = refContrainteRepository.findAll().size();
        refContrainte.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRefContrainteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, refContrainte.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(refContrainte))
            )
            .andExpect(status().isBadRequest());

        // Validate the RefContrainte in the database
        List<RefContrainte> refContrainteList = refContrainteRepository.findAll();
        assertThat(refContrainteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchRefContrainte() throws Exception {
        int databaseSizeBeforeUpdate = refContrainteRepository.findAll().size();
        refContrainte.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRefContrainteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(refContrainte))
            )
            .andExpect(status().isBadRequest());

        // Validate the RefContrainte in the database
        List<RefContrainte> refContrainteList = refContrainteRepository.findAll();
        assertThat(refContrainteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamRefContrainte() throws Exception {
        int databaseSizeBeforeUpdate = refContrainteRepository.findAll().size();
        refContrainte.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRefContrainteMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(refContrainte)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the RefContrainte in the database
        List<RefContrainte> refContrainteList = refContrainteRepository.findAll();
        assertThat(refContrainteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateRefContrainteWithPatch() throws Exception {
        // Initialize the database
        refContrainteRepository.saveAndFlush(refContrainte);

        int databaseSizeBeforeUpdate = refContrainteRepository.findAll().size();

        // Update the refContrainte using partial update
        RefContrainte partialUpdatedRefContrainte = new RefContrainte();
        partialUpdatedRefContrainte.setId(refContrainte.getId());

        partialUpdatedRefContrainte.typeDestination(UPDATED_TYPE_DESTINATION);

        restRefContrainteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRefContrainte.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRefContrainte))
            )
            .andExpect(status().isOk());

        // Validate the RefContrainte in the database
        List<RefContrainte> refContrainteList = refContrainteRepository.findAll();
        assertThat(refContrainteList).hasSize(databaseSizeBeforeUpdate);
        RefContrainte testRefContrainte = refContrainteList.get(refContrainteList.size() - 1);
        assertThat(testRefContrainte.getDesignation()).isEqualTo(DEFAULT_DESIGNATION);
        assertThat(testRefContrainte.getTypeContrainte()).isEqualTo(DEFAULT_TYPE_CONTRAINTE);
        assertThat(testRefContrainte.getTypeDestination()).isEqualTo(UPDATED_TYPE_DESTINATION);
        assertThat(testRefContrainte.getExplication()).isEqualTo(DEFAULT_EXPLICATION);
    }

    @Test
    @Transactional
    void fullUpdateRefContrainteWithPatch() throws Exception {
        // Initialize the database
        refContrainteRepository.saveAndFlush(refContrainte);

        int databaseSizeBeforeUpdate = refContrainteRepository.findAll().size();

        // Update the refContrainte using partial update
        RefContrainte partialUpdatedRefContrainte = new RefContrainte();
        partialUpdatedRefContrainte.setId(refContrainte.getId());

        partialUpdatedRefContrainte
            .designation(UPDATED_DESIGNATION)
            .typeContrainte(UPDATED_TYPE_CONTRAINTE)
            .typeDestination(UPDATED_TYPE_DESTINATION)
            .explication(UPDATED_EXPLICATION);

        restRefContrainteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRefContrainte.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRefContrainte))
            )
            .andExpect(status().isOk());

        // Validate the RefContrainte in the database
        List<RefContrainte> refContrainteList = refContrainteRepository.findAll();
        assertThat(refContrainteList).hasSize(databaseSizeBeforeUpdate);
        RefContrainte testRefContrainte = refContrainteList.get(refContrainteList.size() - 1);
        assertThat(testRefContrainte.getDesignation()).isEqualTo(UPDATED_DESIGNATION);
        assertThat(testRefContrainte.getTypeContrainte()).isEqualTo(UPDATED_TYPE_CONTRAINTE);
        assertThat(testRefContrainte.getTypeDestination()).isEqualTo(UPDATED_TYPE_DESTINATION);
        assertThat(testRefContrainte.getExplication()).isEqualTo(UPDATED_EXPLICATION);
    }

    @Test
    @Transactional
    void patchNonExistingRefContrainte() throws Exception {
        int databaseSizeBeforeUpdate = refContrainteRepository.findAll().size();
        refContrainte.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRefContrainteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, refContrainte.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(refContrainte))
            )
            .andExpect(status().isBadRequest());

        // Validate the RefContrainte in the database
        List<RefContrainte> refContrainteList = refContrainteRepository.findAll();
        assertThat(refContrainteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchRefContrainte() throws Exception {
        int databaseSizeBeforeUpdate = refContrainteRepository.findAll().size();
        refContrainte.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRefContrainteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(refContrainte))
            )
            .andExpect(status().isBadRequest());

        // Validate the RefContrainte in the database
        List<RefContrainte> refContrainteList = refContrainteRepository.findAll();
        assertThat(refContrainteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamRefContrainte() throws Exception {
        int databaseSizeBeforeUpdate = refContrainteRepository.findAll().size();
        refContrainte.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRefContrainteMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(refContrainte))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the RefContrainte in the database
        List<RefContrainte> refContrainteList = refContrainteRepository.findAll();
        assertThat(refContrainteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteRefContrainte() throws Exception {
        // Initialize the database
        refContrainteRepository.saveAndFlush(refContrainte);

        int databaseSizeBeforeDelete = refContrainteRepository.findAll().size();

        // Delete the refContrainte
        restRefContrainteMockMvc
            .perform(delete(ENTITY_API_URL_ID, refContrainte.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RefContrainte> refContrainteList = refContrainteRepository.findAll();
        assertThat(refContrainteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
