package fr.tixou.archisolver.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.tixou.archisolver.IntegrationTest;
import fr.tixou.archisolver.domain.Proprietaire;
import fr.tixou.archisolver.repository.ProprietaireRepository;
import fr.tixou.archisolver.service.ProprietaireService;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ProprietaireResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class ProprietaireResourceIT {

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE_FIXE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE_FIXE = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE_PORTABLE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE_PORTABLE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DEPUIS = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DEPUIS = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_HABITE_LOCAL = false;
    private static final Boolean UPDATED_HABITE_LOCAL = true;

    private static final LocalDate DEFAULT_FIN_LE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FIN_LE = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/proprietaires";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ProprietaireRepository proprietaireRepository;

    @Mock
    private ProprietaireRepository proprietaireRepositoryMock;

    @Mock
    private ProprietaireService proprietaireServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProprietaireMockMvc;

    private Proprietaire proprietaire;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Proprietaire createEntity(EntityManager em) {
        Proprietaire proprietaire = new Proprietaire()
            .prenom(DEFAULT_PRENOM)
            .nom(DEFAULT_NOM)
            .email(DEFAULT_EMAIL)
            .telephoneFixe(DEFAULT_TELEPHONE_FIXE)
            .telephonePortable(DEFAULT_TELEPHONE_PORTABLE)
            .depuis(DEFAULT_DEPUIS)
            .habiteLocal(DEFAULT_HABITE_LOCAL)
            .finLe(DEFAULT_FIN_LE);
        return proprietaire;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Proprietaire createUpdatedEntity(EntityManager em) {
        Proprietaire proprietaire = new Proprietaire()
            .prenom(UPDATED_PRENOM)
            .nom(UPDATED_NOM)
            .email(UPDATED_EMAIL)
            .telephoneFixe(UPDATED_TELEPHONE_FIXE)
            .telephonePortable(UPDATED_TELEPHONE_PORTABLE)
            .depuis(UPDATED_DEPUIS)
            .habiteLocal(UPDATED_HABITE_LOCAL)
            .finLe(UPDATED_FIN_LE);
        return proprietaire;
    }

    @BeforeEach
    public void initTest() {
        proprietaire = createEntity(em);
    }

    @Test
    @Transactional
    void createProprietaire() throws Exception {
        int databaseSizeBeforeCreate = proprietaireRepository.findAll().size();
        // Create the Proprietaire
        restProprietaireMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(proprietaire)))
            .andExpect(status().isCreated());

        // Validate the Proprietaire in the database
        List<Proprietaire> proprietaireList = proprietaireRepository.findAll();
        assertThat(proprietaireList).hasSize(databaseSizeBeforeCreate + 1);
        Proprietaire testProprietaire = proprietaireList.get(proprietaireList.size() - 1);
        assertThat(testProprietaire.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testProprietaire.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testProprietaire.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testProprietaire.getTelephoneFixe()).isEqualTo(DEFAULT_TELEPHONE_FIXE);
        assertThat(testProprietaire.getTelephonePortable()).isEqualTo(DEFAULT_TELEPHONE_PORTABLE);
        assertThat(testProprietaire.getDepuis()).isEqualTo(DEFAULT_DEPUIS);
        assertThat(testProprietaire.getHabiteLocal()).isEqualTo(DEFAULT_HABITE_LOCAL);
        assertThat(testProprietaire.getFinLe()).isEqualTo(DEFAULT_FIN_LE);
    }

    @Test
    @Transactional
    void createProprietaireWithExistingId() throws Exception {
        // Create the Proprietaire with an existing ID
        proprietaire.setId(1L);

        int databaseSizeBeforeCreate = proprietaireRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restProprietaireMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(proprietaire)))
            .andExpect(status().isBadRequest());

        // Validate the Proprietaire in the database
        List<Proprietaire> proprietaireList = proprietaireRepository.findAll();
        assertThat(proprietaireList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllProprietaires() throws Exception {
        // Initialize the database
        proprietaireRepository.saveAndFlush(proprietaire);

        // Get all the proprietaireList
        restProprietaireMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(proprietaire.getId().intValue())))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM)))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].telephoneFixe").value(hasItem(DEFAULT_TELEPHONE_FIXE)))
            .andExpect(jsonPath("$.[*].telephonePortable").value(hasItem(DEFAULT_TELEPHONE_PORTABLE)))
            .andExpect(jsonPath("$.[*].depuis").value(hasItem(DEFAULT_DEPUIS.toString())))
            .andExpect(jsonPath("$.[*].habiteLocal").value(hasItem(DEFAULT_HABITE_LOCAL.booleanValue())))
            .andExpect(jsonPath("$.[*].finLe").value(hasItem(DEFAULT_FIN_LE.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllProprietairesWithEagerRelationshipsIsEnabled() throws Exception {
        when(proprietaireServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restProprietaireMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(proprietaireServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllProprietairesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(proprietaireServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restProprietaireMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(proprietaireServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    void getProprietaire() throws Exception {
        // Initialize the database
        proprietaireRepository.saveAndFlush(proprietaire);

        // Get the proprietaire
        restProprietaireMockMvc
            .perform(get(ENTITY_API_URL_ID, proprietaire.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(proprietaire.getId().intValue()))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.telephoneFixe").value(DEFAULT_TELEPHONE_FIXE))
            .andExpect(jsonPath("$.telephonePortable").value(DEFAULT_TELEPHONE_PORTABLE))
            .andExpect(jsonPath("$.depuis").value(DEFAULT_DEPUIS.toString()))
            .andExpect(jsonPath("$.habiteLocal").value(DEFAULT_HABITE_LOCAL.booleanValue()))
            .andExpect(jsonPath("$.finLe").value(DEFAULT_FIN_LE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingProprietaire() throws Exception {
        // Get the proprietaire
        restProprietaireMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewProprietaire() throws Exception {
        // Initialize the database
        proprietaireRepository.saveAndFlush(proprietaire);

        int databaseSizeBeforeUpdate = proprietaireRepository.findAll().size();

        // Update the proprietaire
        Proprietaire updatedProprietaire = proprietaireRepository.findById(proprietaire.getId()).get();
        // Disconnect from session so that the updates on updatedProprietaire are not directly saved in db
        em.detach(updatedProprietaire);
        updatedProprietaire
            .prenom(UPDATED_PRENOM)
            .nom(UPDATED_NOM)
            .email(UPDATED_EMAIL)
            .telephoneFixe(UPDATED_TELEPHONE_FIXE)
            .telephonePortable(UPDATED_TELEPHONE_PORTABLE)
            .depuis(UPDATED_DEPUIS)
            .habiteLocal(UPDATED_HABITE_LOCAL)
            .finLe(UPDATED_FIN_LE);

        restProprietaireMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedProprietaire.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedProprietaire))
            )
            .andExpect(status().isOk());

        // Validate the Proprietaire in the database
        List<Proprietaire> proprietaireList = proprietaireRepository.findAll();
        assertThat(proprietaireList).hasSize(databaseSizeBeforeUpdate);
        Proprietaire testProprietaire = proprietaireList.get(proprietaireList.size() - 1);
        assertThat(testProprietaire.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testProprietaire.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testProprietaire.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testProprietaire.getTelephoneFixe()).isEqualTo(UPDATED_TELEPHONE_FIXE);
        assertThat(testProprietaire.getTelephonePortable()).isEqualTo(UPDATED_TELEPHONE_PORTABLE);
        assertThat(testProprietaire.getDepuis()).isEqualTo(UPDATED_DEPUIS);
        assertThat(testProprietaire.getHabiteLocal()).isEqualTo(UPDATED_HABITE_LOCAL);
        assertThat(testProprietaire.getFinLe()).isEqualTo(UPDATED_FIN_LE);
    }

    @Test
    @Transactional
    void putNonExistingProprietaire() throws Exception {
        int databaseSizeBeforeUpdate = proprietaireRepository.findAll().size();
        proprietaire.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProprietaireMockMvc
            .perform(
                put(ENTITY_API_URL_ID, proprietaire.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(proprietaire))
            )
            .andExpect(status().isBadRequest());

        // Validate the Proprietaire in the database
        List<Proprietaire> proprietaireList = proprietaireRepository.findAll();
        assertThat(proprietaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchProprietaire() throws Exception {
        int databaseSizeBeforeUpdate = proprietaireRepository.findAll().size();
        proprietaire.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProprietaireMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(proprietaire))
            )
            .andExpect(status().isBadRequest());

        // Validate the Proprietaire in the database
        List<Proprietaire> proprietaireList = proprietaireRepository.findAll();
        assertThat(proprietaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamProprietaire() throws Exception {
        int databaseSizeBeforeUpdate = proprietaireRepository.findAll().size();
        proprietaire.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProprietaireMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(proprietaire)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Proprietaire in the database
        List<Proprietaire> proprietaireList = proprietaireRepository.findAll();
        assertThat(proprietaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateProprietaireWithPatch() throws Exception {
        // Initialize the database
        proprietaireRepository.saveAndFlush(proprietaire);

        int databaseSizeBeforeUpdate = proprietaireRepository.findAll().size();

        // Update the proprietaire using partial update
        Proprietaire partialUpdatedProprietaire = new Proprietaire();
        partialUpdatedProprietaire.setId(proprietaire.getId());

        partialUpdatedProprietaire
            .telephoneFixe(UPDATED_TELEPHONE_FIXE)
            .telephonePortable(UPDATED_TELEPHONE_PORTABLE)
            .habiteLocal(UPDATED_HABITE_LOCAL);

        restProprietaireMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProprietaire.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProprietaire))
            )
            .andExpect(status().isOk());

        // Validate the Proprietaire in the database
        List<Proprietaire> proprietaireList = proprietaireRepository.findAll();
        assertThat(proprietaireList).hasSize(databaseSizeBeforeUpdate);
        Proprietaire testProprietaire = proprietaireList.get(proprietaireList.size() - 1);
        assertThat(testProprietaire.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testProprietaire.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testProprietaire.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testProprietaire.getTelephoneFixe()).isEqualTo(UPDATED_TELEPHONE_FIXE);
        assertThat(testProprietaire.getTelephonePortable()).isEqualTo(UPDATED_TELEPHONE_PORTABLE);
        assertThat(testProprietaire.getDepuis()).isEqualTo(DEFAULT_DEPUIS);
        assertThat(testProprietaire.getHabiteLocal()).isEqualTo(UPDATED_HABITE_LOCAL);
        assertThat(testProprietaire.getFinLe()).isEqualTo(DEFAULT_FIN_LE);
    }

    @Test
    @Transactional
    void fullUpdateProprietaireWithPatch() throws Exception {
        // Initialize the database
        proprietaireRepository.saveAndFlush(proprietaire);

        int databaseSizeBeforeUpdate = proprietaireRepository.findAll().size();

        // Update the proprietaire using partial update
        Proprietaire partialUpdatedProprietaire = new Proprietaire();
        partialUpdatedProprietaire.setId(proprietaire.getId());

        partialUpdatedProprietaire
            .prenom(UPDATED_PRENOM)
            .nom(UPDATED_NOM)
            .email(UPDATED_EMAIL)
            .telephoneFixe(UPDATED_TELEPHONE_FIXE)
            .telephonePortable(UPDATED_TELEPHONE_PORTABLE)
            .depuis(UPDATED_DEPUIS)
            .habiteLocal(UPDATED_HABITE_LOCAL)
            .finLe(UPDATED_FIN_LE);

        restProprietaireMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProprietaire.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProprietaire))
            )
            .andExpect(status().isOk());

        // Validate the Proprietaire in the database
        List<Proprietaire> proprietaireList = proprietaireRepository.findAll();
        assertThat(proprietaireList).hasSize(databaseSizeBeforeUpdate);
        Proprietaire testProprietaire = proprietaireList.get(proprietaireList.size() - 1);
        assertThat(testProprietaire.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testProprietaire.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testProprietaire.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testProprietaire.getTelephoneFixe()).isEqualTo(UPDATED_TELEPHONE_FIXE);
        assertThat(testProprietaire.getTelephonePortable()).isEqualTo(UPDATED_TELEPHONE_PORTABLE);
        assertThat(testProprietaire.getDepuis()).isEqualTo(UPDATED_DEPUIS);
        assertThat(testProprietaire.getHabiteLocal()).isEqualTo(UPDATED_HABITE_LOCAL);
        assertThat(testProprietaire.getFinLe()).isEqualTo(UPDATED_FIN_LE);
    }

    @Test
    @Transactional
    void patchNonExistingProprietaire() throws Exception {
        int databaseSizeBeforeUpdate = proprietaireRepository.findAll().size();
        proprietaire.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProprietaireMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, proprietaire.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(proprietaire))
            )
            .andExpect(status().isBadRequest());

        // Validate the Proprietaire in the database
        List<Proprietaire> proprietaireList = proprietaireRepository.findAll();
        assertThat(proprietaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchProprietaire() throws Exception {
        int databaseSizeBeforeUpdate = proprietaireRepository.findAll().size();
        proprietaire.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProprietaireMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(proprietaire))
            )
            .andExpect(status().isBadRequest());

        // Validate the Proprietaire in the database
        List<Proprietaire> proprietaireList = proprietaireRepository.findAll();
        assertThat(proprietaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamProprietaire() throws Exception {
        int databaseSizeBeforeUpdate = proprietaireRepository.findAll().size();
        proprietaire.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProprietaireMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(proprietaire))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Proprietaire in the database
        List<Proprietaire> proprietaireList = proprietaireRepository.findAll();
        assertThat(proprietaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteProprietaire() throws Exception {
        // Initialize the database
        proprietaireRepository.saveAndFlush(proprietaire);

        int databaseSizeBeforeDelete = proprietaireRepository.findAll().size();

        // Delete the proprietaire
        restProprietaireMockMvc
            .perform(delete(ENTITY_API_URL_ID, proprietaire.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Proprietaire> proprietaireList = proprietaireRepository.findAll();
        assertThat(proprietaireList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
