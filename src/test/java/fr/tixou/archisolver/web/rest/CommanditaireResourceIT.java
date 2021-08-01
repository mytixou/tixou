package fr.tixou.archisolver.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.tixou.archisolver.IntegrationTest;
import fr.tixou.archisolver.domain.Commanditaire;
import fr.tixou.archisolver.repository.CommanditaireRepository;
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Integration tests for the {@link CommanditaireResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CommanditaireResourceIT {

    private static final String DEFAULT_ID_METIER_INTERNE = "AAAAAAAAAA";
    private static final String UPDATED_ID_METIER_INTERNE = "BBBBBBBBBB";

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

    private static final LocalDate DEFAULT_CONNU_DEPUIS = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CONNU_DEPUIS = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/commanditaires";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CommanditaireRepository commanditaireRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCommanditaireMockMvc;

    private Commanditaire commanditaire;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Commanditaire createEntity(EntityManager em) {
        Commanditaire commanditaire = new Commanditaire()
            .idMetierInterne(DEFAULT_ID_METIER_INTERNE)
            .prenom(DEFAULT_PRENOM)
            .nom(DEFAULT_NOM)
            .email(DEFAULT_EMAIL)
            .telephoneFixe(DEFAULT_TELEPHONE_FIXE)
            .telephonePortable(DEFAULT_TELEPHONE_PORTABLE)
            .connuDepuis(DEFAULT_CONNU_DEPUIS);
        return commanditaire;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Commanditaire createUpdatedEntity(EntityManager em) {
        Commanditaire commanditaire = new Commanditaire()
            .idMetierInterne(UPDATED_ID_METIER_INTERNE)
            .prenom(UPDATED_PRENOM)
            .nom(UPDATED_NOM)
            .email(UPDATED_EMAIL)
            .telephoneFixe(UPDATED_TELEPHONE_FIXE)
            .telephonePortable(UPDATED_TELEPHONE_PORTABLE)
            .connuDepuis(UPDATED_CONNU_DEPUIS);
        return commanditaire;
    }

    @BeforeEach
    public void initTest() {
        commanditaire = createEntity(em);
    }

    @Test
    @Transactional
    void createCommanditaire() throws Exception {
        int databaseSizeBeforeCreate = commanditaireRepository.findAll().size();
        // Create the Commanditaire
        restCommanditaireMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(commanditaire)))
            .andExpect(status().isCreated());

        // Validate the Commanditaire in the database
        List<Commanditaire> commanditaireList = commanditaireRepository.findAll();
        assertThat(commanditaireList).hasSize(databaseSizeBeforeCreate + 1);
        Commanditaire testCommanditaire = commanditaireList.get(commanditaireList.size() - 1);
        assertThat(testCommanditaire.getIdMetierInterne()).isEqualTo(DEFAULT_ID_METIER_INTERNE);
        assertThat(testCommanditaire.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testCommanditaire.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testCommanditaire.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testCommanditaire.getTelephoneFixe()).isEqualTo(DEFAULT_TELEPHONE_FIXE);
        assertThat(testCommanditaire.getTelephonePortable()).isEqualTo(DEFAULT_TELEPHONE_PORTABLE);
        assertThat(testCommanditaire.getConnuDepuis()).isEqualTo(DEFAULT_CONNU_DEPUIS);
    }

    @Test
    @Transactional
    void createCommanditaireWithExistingId() throws Exception {
        // Create the Commanditaire with an existing ID
        commanditaire.setId(1L);

        int databaseSizeBeforeCreate = commanditaireRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommanditaireMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(commanditaire)))
            .andExpect(status().isBadRequest());

        // Validate the Commanditaire in the database
        List<Commanditaire> commanditaireList = commanditaireRepository.findAll();
        assertThat(commanditaireList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCommanditaires() throws Exception {
        // Initialize the database
        commanditaireRepository.saveAndFlush(commanditaire);

        // Get all the commanditaireList
        restCommanditaireMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commanditaire.getId().intValue())))
            .andExpect(jsonPath("$.[*].idMetierInterne").value(hasItem(DEFAULT_ID_METIER_INTERNE)))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM)))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].telephoneFixe").value(hasItem(DEFAULT_TELEPHONE_FIXE)))
            .andExpect(jsonPath("$.[*].telephonePortable").value(hasItem(DEFAULT_TELEPHONE_PORTABLE)))
            .andExpect(jsonPath("$.[*].connuDepuis").value(hasItem(DEFAULT_CONNU_DEPUIS.toString())));
    }

    @Test
    @Transactional
    void getCommanditaire() throws Exception {
        // Initialize the database
        commanditaireRepository.saveAndFlush(commanditaire);

        // Get the commanditaire
        restCommanditaireMockMvc
            .perform(get(ENTITY_API_URL_ID, commanditaire.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(commanditaire.getId().intValue()))
            .andExpect(jsonPath("$.idMetierInterne").value(DEFAULT_ID_METIER_INTERNE))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.telephoneFixe").value(DEFAULT_TELEPHONE_FIXE))
            .andExpect(jsonPath("$.telephonePortable").value(DEFAULT_TELEPHONE_PORTABLE))
            .andExpect(jsonPath("$.connuDepuis").value(DEFAULT_CONNU_DEPUIS.toString()));
    }

    @Test
    @Transactional
    void getNonExistingCommanditaire() throws Exception {
        // Get the commanditaire
        restCommanditaireMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCommanditaire() throws Exception {
        // Initialize the database
        commanditaireRepository.saveAndFlush(commanditaire);

        int databaseSizeBeforeUpdate = commanditaireRepository.findAll().size();

        // Update the commanditaire
        Commanditaire updatedCommanditaire = commanditaireRepository.findById(commanditaire.getId()).get();
        // Disconnect from session so that the updates on updatedCommanditaire are not directly saved in db
        em.detach(updatedCommanditaire);
        updatedCommanditaire
            .idMetierInterne(UPDATED_ID_METIER_INTERNE)
            .prenom(UPDATED_PRENOM)
            .nom(UPDATED_NOM)
            .email(UPDATED_EMAIL)
            .telephoneFixe(UPDATED_TELEPHONE_FIXE)
            .telephonePortable(UPDATED_TELEPHONE_PORTABLE)
            .connuDepuis(UPDATED_CONNU_DEPUIS);

        restCommanditaireMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCommanditaire.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCommanditaire))
            )
            .andExpect(status().isOk());

        // Validate the Commanditaire in the database
        List<Commanditaire> commanditaireList = commanditaireRepository.findAll();
        assertThat(commanditaireList).hasSize(databaseSizeBeforeUpdate);
        Commanditaire testCommanditaire = commanditaireList.get(commanditaireList.size() - 1);
        assertThat(testCommanditaire.getIdMetierInterne()).isEqualTo(UPDATED_ID_METIER_INTERNE);
        assertThat(testCommanditaire.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testCommanditaire.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testCommanditaire.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testCommanditaire.getTelephoneFixe()).isEqualTo(UPDATED_TELEPHONE_FIXE);
        assertThat(testCommanditaire.getTelephonePortable()).isEqualTo(UPDATED_TELEPHONE_PORTABLE);
        assertThat(testCommanditaire.getConnuDepuis()).isEqualTo(UPDATED_CONNU_DEPUIS);
    }

    @Test
    @Transactional
    void putNonExistingCommanditaire() throws Exception {
        int databaseSizeBeforeUpdate = commanditaireRepository.findAll().size();
        commanditaire.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommanditaireMockMvc
            .perform(
                put(ENTITY_API_URL_ID, commanditaire.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(commanditaire))
            )
            .andExpect(status().isBadRequest());

        // Validate the Commanditaire in the database
        List<Commanditaire> commanditaireList = commanditaireRepository.findAll();
        assertThat(commanditaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCommanditaire() throws Exception {
        int databaseSizeBeforeUpdate = commanditaireRepository.findAll().size();
        commanditaire.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommanditaireMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(commanditaire))
            )
            .andExpect(status().isBadRequest());

        // Validate the Commanditaire in the database
        List<Commanditaire> commanditaireList = commanditaireRepository.findAll();
        assertThat(commanditaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCommanditaire() throws Exception {
        int databaseSizeBeforeUpdate = commanditaireRepository.findAll().size();
        commanditaire.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommanditaireMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(commanditaire)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Commanditaire in the database
        List<Commanditaire> commanditaireList = commanditaireRepository.findAll();
        assertThat(commanditaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCommanditaireWithPatch() throws Exception {
        // Initialize the database
        commanditaireRepository.saveAndFlush(commanditaire);

        int databaseSizeBeforeUpdate = commanditaireRepository.findAll().size();

        // Update the commanditaire using partial update
        Commanditaire partialUpdatedCommanditaire = new Commanditaire();
        partialUpdatedCommanditaire.setId(commanditaire.getId());

        partialUpdatedCommanditaire
            .idMetierInterne(UPDATED_ID_METIER_INTERNE)
            .prenom(UPDATED_PRENOM)
            .nom(UPDATED_NOM)
            .email(UPDATED_EMAIL)
            .telephonePortable(UPDATED_TELEPHONE_PORTABLE)
            .connuDepuis(UPDATED_CONNU_DEPUIS);

        restCommanditaireMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCommanditaire.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCommanditaire))
            )
            .andExpect(status().isOk());

        // Validate the Commanditaire in the database
        List<Commanditaire> commanditaireList = commanditaireRepository.findAll();
        assertThat(commanditaireList).hasSize(databaseSizeBeforeUpdate);
        Commanditaire testCommanditaire = commanditaireList.get(commanditaireList.size() - 1);
        assertThat(testCommanditaire.getIdMetierInterne()).isEqualTo(UPDATED_ID_METIER_INTERNE);
        assertThat(testCommanditaire.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testCommanditaire.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testCommanditaire.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testCommanditaire.getTelephoneFixe()).isEqualTo(DEFAULT_TELEPHONE_FIXE);
        assertThat(testCommanditaire.getTelephonePortable()).isEqualTo(UPDATED_TELEPHONE_PORTABLE);
        assertThat(testCommanditaire.getConnuDepuis()).isEqualTo(UPDATED_CONNU_DEPUIS);
    }

    @Test
    @Transactional
    void fullUpdateCommanditaireWithPatch() throws Exception {
        // Initialize the database
        commanditaireRepository.saveAndFlush(commanditaire);

        int databaseSizeBeforeUpdate = commanditaireRepository.findAll().size();

        // Update the commanditaire using partial update
        Commanditaire partialUpdatedCommanditaire = new Commanditaire();
        partialUpdatedCommanditaire.setId(commanditaire.getId());

        partialUpdatedCommanditaire
            .idMetierInterne(UPDATED_ID_METIER_INTERNE)
            .prenom(UPDATED_PRENOM)
            .nom(UPDATED_NOM)
            .email(UPDATED_EMAIL)
            .telephoneFixe(UPDATED_TELEPHONE_FIXE)
            .telephonePortable(UPDATED_TELEPHONE_PORTABLE)
            .connuDepuis(UPDATED_CONNU_DEPUIS);

        restCommanditaireMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCommanditaire.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCommanditaire))
            )
            .andExpect(status().isOk());

        // Validate the Commanditaire in the database
        List<Commanditaire> commanditaireList = commanditaireRepository.findAll();
        assertThat(commanditaireList).hasSize(databaseSizeBeforeUpdate);
        Commanditaire testCommanditaire = commanditaireList.get(commanditaireList.size() - 1);
        assertThat(testCommanditaire.getIdMetierInterne()).isEqualTo(UPDATED_ID_METIER_INTERNE);
        assertThat(testCommanditaire.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testCommanditaire.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testCommanditaire.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testCommanditaire.getTelephoneFixe()).isEqualTo(UPDATED_TELEPHONE_FIXE);
        assertThat(testCommanditaire.getTelephonePortable()).isEqualTo(UPDATED_TELEPHONE_PORTABLE);
        assertThat(testCommanditaire.getConnuDepuis()).isEqualTo(UPDATED_CONNU_DEPUIS);
    }

    @Test
    @Transactional
    void patchNonExistingCommanditaire() throws Exception {
        int databaseSizeBeforeUpdate = commanditaireRepository.findAll().size();
        commanditaire.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommanditaireMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, commanditaire.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(commanditaire))
            )
            .andExpect(status().isBadRequest());

        // Validate the Commanditaire in the database
        List<Commanditaire> commanditaireList = commanditaireRepository.findAll();
        assertThat(commanditaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCommanditaire() throws Exception {
        int databaseSizeBeforeUpdate = commanditaireRepository.findAll().size();
        commanditaire.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommanditaireMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(commanditaire))
            )
            .andExpect(status().isBadRequest());

        // Validate the Commanditaire in the database
        List<Commanditaire> commanditaireList = commanditaireRepository.findAll();
        assertThat(commanditaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCommanditaire() throws Exception {
        int databaseSizeBeforeUpdate = commanditaireRepository.findAll().size();
        commanditaire.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommanditaireMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(commanditaire))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Commanditaire in the database
        List<Commanditaire> commanditaireList = commanditaireRepository.findAll();
        assertThat(commanditaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCommanditaire() throws Exception {
        // Initialize the database
        commanditaireRepository.saveAndFlush(commanditaire);

        int databaseSizeBeforeDelete = commanditaireRepository.findAll().size();

        // Delete the commanditaire
        restCommanditaireMockMvc
            .perform(delete(ENTITY_API_URL_ID, commanditaire.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Commanditaire> commanditaireList = commanditaireRepository.findAll();
        assertThat(commanditaireList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
