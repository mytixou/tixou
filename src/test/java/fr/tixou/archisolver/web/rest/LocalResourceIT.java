package fr.tixou.archisolver.web.rest;

import static fr.tixou.archisolver.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.tixou.archisolver.IntegrationTest;
import fr.tixou.archisolver.domain.Local;
import fr.tixou.archisolver.domain.enumeration.TypeLocal;
import fr.tixou.archisolver.repository.LocalRepository;
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
 * Integration tests for the {@link LocalResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LocalResourceIT {

    private static final String DEFAULT_DESIGNATION = "AAAAAAAAAA";
    private static final String UPDATED_DESIGNATION = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_SURFACE = new BigDecimal(1);
    private static final BigDecimal UPDATED_SURFACE = new BigDecimal(2);

    private static final Integer DEFAULT_ETAGE = 1;
    private static final Integer UPDATED_ETAGE = 2;

    private static final TypeLocal DEFAULT_TYPELOCAL = TypeLocal.PROFESSIONNEL;
    private static final TypeLocal UPDATED_TYPELOCAL = TypeLocal.HABITATION;

    private static final String ENTITY_API_URL = "/api/locals";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private LocalRepository localRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLocalMockMvc;

    private Local local;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Local createEntity(EntityManager em) {
        Local local = new Local()
            .designation(DEFAULT_DESIGNATION)
            .surface(DEFAULT_SURFACE)
            .etage(DEFAULT_ETAGE)
            .typelocal(DEFAULT_TYPELOCAL);
        return local;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Local createUpdatedEntity(EntityManager em) {
        Local local = new Local()
            .designation(UPDATED_DESIGNATION)
            .surface(UPDATED_SURFACE)
            .etage(UPDATED_ETAGE)
            .typelocal(UPDATED_TYPELOCAL);
        return local;
    }

    @BeforeEach
    public void initTest() {
        local = createEntity(em);
    }

    @Test
    @Transactional
    void createLocal() throws Exception {
        int databaseSizeBeforeCreate = localRepository.findAll().size();
        // Create the Local
        restLocalMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(local)))
            .andExpect(status().isCreated());

        // Validate the Local in the database
        List<Local> localList = localRepository.findAll();
        assertThat(localList).hasSize(databaseSizeBeforeCreate + 1);
        Local testLocal = localList.get(localList.size() - 1);
        assertThat(testLocal.getDesignation()).isEqualTo(DEFAULT_DESIGNATION);
        assertThat(testLocal.getSurface()).isEqualByComparingTo(DEFAULT_SURFACE);
        assertThat(testLocal.getEtage()).isEqualTo(DEFAULT_ETAGE);
        assertThat(testLocal.getTypelocal()).isEqualTo(DEFAULT_TYPELOCAL);
    }

    @Test
    @Transactional
    void createLocalWithExistingId() throws Exception {
        // Create the Local with an existing ID
        local.setId(1L);

        int databaseSizeBeforeCreate = localRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLocalMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(local)))
            .andExpect(status().isBadRequest());

        // Validate the Local in the database
        List<Local> localList = localRepository.findAll();
        assertThat(localList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllLocals() throws Exception {
        // Initialize the database
        localRepository.saveAndFlush(local);

        // Get all the localList
        restLocalMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(local.getId().intValue())))
            .andExpect(jsonPath("$.[*].designation").value(hasItem(DEFAULT_DESIGNATION)))
            .andExpect(jsonPath("$.[*].surface").value(hasItem(sameNumber(DEFAULT_SURFACE))))
            .andExpect(jsonPath("$.[*].etage").value(hasItem(DEFAULT_ETAGE)))
            .andExpect(jsonPath("$.[*].typelocal").value(hasItem(DEFAULT_TYPELOCAL.toString())));
    }

    @Test
    @Transactional
    void getLocal() throws Exception {
        // Initialize the database
        localRepository.saveAndFlush(local);

        // Get the local
        restLocalMockMvc
            .perform(get(ENTITY_API_URL_ID, local.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(local.getId().intValue()))
            .andExpect(jsonPath("$.designation").value(DEFAULT_DESIGNATION))
            .andExpect(jsonPath("$.surface").value(sameNumber(DEFAULT_SURFACE)))
            .andExpect(jsonPath("$.etage").value(DEFAULT_ETAGE))
            .andExpect(jsonPath("$.typelocal").value(DEFAULT_TYPELOCAL.toString()));
    }

    @Test
    @Transactional
    void getNonExistingLocal() throws Exception {
        // Get the local
        restLocalMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewLocal() throws Exception {
        // Initialize the database
        localRepository.saveAndFlush(local);

        int databaseSizeBeforeUpdate = localRepository.findAll().size();

        // Update the local
        Local updatedLocal = localRepository.findById(local.getId()).get();
        // Disconnect from session so that the updates on updatedLocal are not directly saved in db
        em.detach(updatedLocal);
        updatedLocal.designation(UPDATED_DESIGNATION).surface(UPDATED_SURFACE).etage(UPDATED_ETAGE).typelocal(UPDATED_TYPELOCAL);

        restLocalMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedLocal.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedLocal))
            )
            .andExpect(status().isOk());

        // Validate the Local in the database
        List<Local> localList = localRepository.findAll();
        assertThat(localList).hasSize(databaseSizeBeforeUpdate);
        Local testLocal = localList.get(localList.size() - 1);
        assertThat(testLocal.getDesignation()).isEqualTo(UPDATED_DESIGNATION);
        assertThat(testLocal.getSurface()).isEqualTo(UPDATED_SURFACE);
        assertThat(testLocal.getEtage()).isEqualTo(UPDATED_ETAGE);
        assertThat(testLocal.getTypelocal()).isEqualTo(UPDATED_TYPELOCAL);
    }

    @Test
    @Transactional
    void putNonExistingLocal() throws Exception {
        int databaseSizeBeforeUpdate = localRepository.findAll().size();
        local.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLocalMockMvc
            .perform(
                put(ENTITY_API_URL_ID, local.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(local))
            )
            .andExpect(status().isBadRequest());

        // Validate the Local in the database
        List<Local> localList = localRepository.findAll();
        assertThat(localList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchLocal() throws Exception {
        int databaseSizeBeforeUpdate = localRepository.findAll().size();
        local.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLocalMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(local))
            )
            .andExpect(status().isBadRequest());

        // Validate the Local in the database
        List<Local> localList = localRepository.findAll();
        assertThat(localList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamLocal() throws Exception {
        int databaseSizeBeforeUpdate = localRepository.findAll().size();
        local.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLocalMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(local)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Local in the database
        List<Local> localList = localRepository.findAll();
        assertThat(localList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateLocalWithPatch() throws Exception {
        // Initialize the database
        localRepository.saveAndFlush(local);

        int databaseSizeBeforeUpdate = localRepository.findAll().size();

        // Update the local using partial update
        Local partialUpdatedLocal = new Local();
        partialUpdatedLocal.setId(local.getId());

        partialUpdatedLocal.designation(UPDATED_DESIGNATION).surface(UPDATED_SURFACE).typelocal(UPDATED_TYPELOCAL);

        restLocalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLocal.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLocal))
            )
            .andExpect(status().isOk());

        // Validate the Local in the database
        List<Local> localList = localRepository.findAll();
        assertThat(localList).hasSize(databaseSizeBeforeUpdate);
        Local testLocal = localList.get(localList.size() - 1);
        assertThat(testLocal.getDesignation()).isEqualTo(UPDATED_DESIGNATION);
        assertThat(testLocal.getSurface()).isEqualByComparingTo(UPDATED_SURFACE);
        assertThat(testLocal.getEtage()).isEqualTo(DEFAULT_ETAGE);
        assertThat(testLocal.getTypelocal()).isEqualTo(UPDATED_TYPELOCAL);
    }

    @Test
    @Transactional
    void fullUpdateLocalWithPatch() throws Exception {
        // Initialize the database
        localRepository.saveAndFlush(local);

        int databaseSizeBeforeUpdate = localRepository.findAll().size();

        // Update the local using partial update
        Local partialUpdatedLocal = new Local();
        partialUpdatedLocal.setId(local.getId());

        partialUpdatedLocal.designation(UPDATED_DESIGNATION).surface(UPDATED_SURFACE).etage(UPDATED_ETAGE).typelocal(UPDATED_TYPELOCAL);

        restLocalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLocal.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLocal))
            )
            .andExpect(status().isOk());

        // Validate the Local in the database
        List<Local> localList = localRepository.findAll();
        assertThat(localList).hasSize(databaseSizeBeforeUpdate);
        Local testLocal = localList.get(localList.size() - 1);
        assertThat(testLocal.getDesignation()).isEqualTo(UPDATED_DESIGNATION);
        assertThat(testLocal.getSurface()).isEqualByComparingTo(UPDATED_SURFACE);
        assertThat(testLocal.getEtage()).isEqualTo(UPDATED_ETAGE);
        assertThat(testLocal.getTypelocal()).isEqualTo(UPDATED_TYPELOCAL);
    }

    @Test
    @Transactional
    void patchNonExistingLocal() throws Exception {
        int databaseSizeBeforeUpdate = localRepository.findAll().size();
        local.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLocalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, local.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(local))
            )
            .andExpect(status().isBadRequest());

        // Validate the Local in the database
        List<Local> localList = localRepository.findAll();
        assertThat(localList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchLocal() throws Exception {
        int databaseSizeBeforeUpdate = localRepository.findAll().size();
        local.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLocalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(local))
            )
            .andExpect(status().isBadRequest());

        // Validate the Local in the database
        List<Local> localList = localRepository.findAll();
        assertThat(localList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamLocal() throws Exception {
        int databaseSizeBeforeUpdate = localRepository.findAll().size();
        local.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLocalMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(local)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Local in the database
        List<Local> localList = localRepository.findAll();
        assertThat(localList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteLocal() throws Exception {
        // Initialize the database
        localRepository.saveAndFlush(local);

        int databaseSizeBeforeDelete = localRepository.findAll().size();

        // Delete the local
        restLocalMockMvc
            .perform(delete(ENTITY_API_URL_ID, local.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Local> localList = localRepository.findAll();
        assertThat(localList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
