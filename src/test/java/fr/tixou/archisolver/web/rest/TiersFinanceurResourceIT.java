package fr.tixou.archisolver.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.tixou.archisolver.IntegrationTest;
import fr.tixou.archisolver.domain.TiersFinanceur;
import fr.tixou.archisolver.repository.TiersFinanceurRepository;
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
 * Integration tests for the {@link TiersFinanceurResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TiersFinanceurResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_LOCALISATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCALISATION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_ACTIF = false;
    private static final Boolean UPDATED_IS_ACTIF = true;

    private static final LocalDate DEFAULT_DATE_INSCRIPTION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_INSCRIPTION = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_ANNE_LANCEMENT = 1;
    private static final Integer UPDATED_ANNE_LANCEMENT = 2;

    private static final Integer DEFAULT_MOIS_LANCEMENT = 1;
    private static final Integer UPDATED_MOIS_LANCEMENT = 2;

    private static final LocalDate DEFAULT_DATE_RESILIATION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_RESILIATION = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_DERNIERE_ANNEE = 1;
    private static final Integer UPDATED_DERNIERE_ANNEE = 2;

    private static final Integer DEFAULT_DERNIER_MOIS = 1;
    private static final Integer UPDATED_DERNIER_MOIS = 2;

    private static final String ENTITY_API_URL = "/api/tiers-financeurs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TiersFinanceurRepository tiersFinanceurRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTiersFinanceurMockMvc;

    private TiersFinanceur tiersFinanceur;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TiersFinanceur createEntity(EntityManager em) {
        TiersFinanceur tiersFinanceur = new TiersFinanceur()
            .nom(DEFAULT_NOM)
            .localisation(DEFAULT_LOCALISATION)
            .isActif(DEFAULT_IS_ACTIF)
            .dateInscription(DEFAULT_DATE_INSCRIPTION)
            .anneLancement(DEFAULT_ANNE_LANCEMENT)
            .moisLancement(DEFAULT_MOIS_LANCEMENT)
            .dateResiliation(DEFAULT_DATE_RESILIATION)
            .derniereAnnee(DEFAULT_DERNIERE_ANNEE)
            .dernierMois(DEFAULT_DERNIER_MOIS);
        return tiersFinanceur;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TiersFinanceur createUpdatedEntity(EntityManager em) {
        TiersFinanceur tiersFinanceur = new TiersFinanceur()
            .nom(UPDATED_NOM)
            .localisation(UPDATED_LOCALISATION)
            .isActif(UPDATED_IS_ACTIF)
            .dateInscription(UPDATED_DATE_INSCRIPTION)
            .anneLancement(UPDATED_ANNE_LANCEMENT)
            .moisLancement(UPDATED_MOIS_LANCEMENT)
            .dateResiliation(UPDATED_DATE_RESILIATION)
            .derniereAnnee(UPDATED_DERNIERE_ANNEE)
            .dernierMois(UPDATED_DERNIER_MOIS);
        return tiersFinanceur;
    }

    @BeforeEach
    public void initTest() {
        tiersFinanceur = createEntity(em);
    }

    @Test
    @Transactional
    void createTiersFinanceur() throws Exception {
        int databaseSizeBeforeCreate = tiersFinanceurRepository.findAll().size();
        // Create the TiersFinanceur
        restTiersFinanceurMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tiersFinanceur))
            )
            .andExpect(status().isCreated());

        // Validate the TiersFinanceur in the database
        List<TiersFinanceur> tiersFinanceurList = tiersFinanceurRepository.findAll();
        assertThat(tiersFinanceurList).hasSize(databaseSizeBeforeCreate + 1);
        TiersFinanceur testTiersFinanceur = tiersFinanceurList.get(tiersFinanceurList.size() - 1);
        assertThat(testTiersFinanceur.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testTiersFinanceur.getLocalisation()).isEqualTo(DEFAULT_LOCALISATION);
        assertThat(testTiersFinanceur.getIsActif()).isEqualTo(DEFAULT_IS_ACTIF);
        assertThat(testTiersFinanceur.getDateInscription()).isEqualTo(DEFAULT_DATE_INSCRIPTION);
        assertThat(testTiersFinanceur.getAnneLancement()).isEqualTo(DEFAULT_ANNE_LANCEMENT);
        assertThat(testTiersFinanceur.getMoisLancement()).isEqualTo(DEFAULT_MOIS_LANCEMENT);
        assertThat(testTiersFinanceur.getDateResiliation()).isEqualTo(DEFAULT_DATE_RESILIATION);
        assertThat(testTiersFinanceur.getDerniereAnnee()).isEqualTo(DEFAULT_DERNIERE_ANNEE);
        assertThat(testTiersFinanceur.getDernierMois()).isEqualTo(DEFAULT_DERNIER_MOIS);
    }

    @Test
    @Transactional
    void createTiersFinanceurWithExistingId() throws Exception {
        // Create the TiersFinanceur with an existing ID
        tiersFinanceur.setId(1L);

        int databaseSizeBeforeCreate = tiersFinanceurRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTiersFinanceurMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tiersFinanceur))
            )
            .andExpect(status().isBadRequest());

        // Validate the TiersFinanceur in the database
        List<TiersFinanceur> tiersFinanceurList = tiersFinanceurRepository.findAll();
        assertThat(tiersFinanceurList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTiersFinanceurs() throws Exception {
        // Initialize the database
        tiersFinanceurRepository.saveAndFlush(tiersFinanceur);

        // Get all the tiersFinanceurList
        restTiersFinanceurMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tiersFinanceur.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].localisation").value(hasItem(DEFAULT_LOCALISATION)))
            .andExpect(jsonPath("$.[*].isActif").value(hasItem(DEFAULT_IS_ACTIF.booleanValue())))
            .andExpect(jsonPath("$.[*].dateInscription").value(hasItem(DEFAULT_DATE_INSCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].anneLancement").value(hasItem(DEFAULT_ANNE_LANCEMENT)))
            .andExpect(jsonPath("$.[*].moisLancement").value(hasItem(DEFAULT_MOIS_LANCEMENT)))
            .andExpect(jsonPath("$.[*].dateResiliation").value(hasItem(DEFAULT_DATE_RESILIATION.toString())))
            .andExpect(jsonPath("$.[*].derniereAnnee").value(hasItem(DEFAULT_DERNIERE_ANNEE)))
            .andExpect(jsonPath("$.[*].dernierMois").value(hasItem(DEFAULT_DERNIER_MOIS)));
    }

    @Test
    @Transactional
    void getTiersFinanceur() throws Exception {
        // Initialize the database
        tiersFinanceurRepository.saveAndFlush(tiersFinanceur);

        // Get the tiersFinanceur
        restTiersFinanceurMockMvc
            .perform(get(ENTITY_API_URL_ID, tiersFinanceur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tiersFinanceur.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.localisation").value(DEFAULT_LOCALISATION))
            .andExpect(jsonPath("$.isActif").value(DEFAULT_IS_ACTIF.booleanValue()))
            .andExpect(jsonPath("$.dateInscription").value(DEFAULT_DATE_INSCRIPTION.toString()))
            .andExpect(jsonPath("$.anneLancement").value(DEFAULT_ANNE_LANCEMENT))
            .andExpect(jsonPath("$.moisLancement").value(DEFAULT_MOIS_LANCEMENT))
            .andExpect(jsonPath("$.dateResiliation").value(DEFAULT_DATE_RESILIATION.toString()))
            .andExpect(jsonPath("$.derniereAnnee").value(DEFAULT_DERNIERE_ANNEE))
            .andExpect(jsonPath("$.dernierMois").value(DEFAULT_DERNIER_MOIS));
    }

    @Test
    @Transactional
    void getNonExistingTiersFinanceur() throws Exception {
        // Get the tiersFinanceur
        restTiersFinanceurMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTiersFinanceur() throws Exception {
        // Initialize the database
        tiersFinanceurRepository.saveAndFlush(tiersFinanceur);

        int databaseSizeBeforeUpdate = tiersFinanceurRepository.findAll().size();

        // Update the tiersFinanceur
        TiersFinanceur updatedTiersFinanceur = tiersFinanceurRepository.findById(tiersFinanceur.getId()).get();
        // Disconnect from session so that the updates on updatedTiersFinanceur are not directly saved in db
        em.detach(updatedTiersFinanceur);
        updatedTiersFinanceur
            .nom(UPDATED_NOM)
            .localisation(UPDATED_LOCALISATION)
            .isActif(UPDATED_IS_ACTIF)
            .dateInscription(UPDATED_DATE_INSCRIPTION)
            .anneLancement(UPDATED_ANNE_LANCEMENT)
            .moisLancement(UPDATED_MOIS_LANCEMENT)
            .dateResiliation(UPDATED_DATE_RESILIATION)
            .derniereAnnee(UPDATED_DERNIERE_ANNEE)
            .dernierMois(UPDATED_DERNIER_MOIS);

        restTiersFinanceurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTiersFinanceur.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTiersFinanceur))
            )
            .andExpect(status().isOk());

        // Validate the TiersFinanceur in the database
        List<TiersFinanceur> tiersFinanceurList = tiersFinanceurRepository.findAll();
        assertThat(tiersFinanceurList).hasSize(databaseSizeBeforeUpdate);
        TiersFinanceur testTiersFinanceur = tiersFinanceurList.get(tiersFinanceurList.size() - 1);
        assertThat(testTiersFinanceur.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testTiersFinanceur.getLocalisation()).isEqualTo(UPDATED_LOCALISATION);
        assertThat(testTiersFinanceur.getIsActif()).isEqualTo(UPDATED_IS_ACTIF);
        assertThat(testTiersFinanceur.getDateInscription()).isEqualTo(UPDATED_DATE_INSCRIPTION);
        assertThat(testTiersFinanceur.getAnneLancement()).isEqualTo(UPDATED_ANNE_LANCEMENT);
        assertThat(testTiersFinanceur.getMoisLancement()).isEqualTo(UPDATED_MOIS_LANCEMENT);
        assertThat(testTiersFinanceur.getDateResiliation()).isEqualTo(UPDATED_DATE_RESILIATION);
        assertThat(testTiersFinanceur.getDerniereAnnee()).isEqualTo(UPDATED_DERNIERE_ANNEE);
        assertThat(testTiersFinanceur.getDernierMois()).isEqualTo(UPDATED_DERNIER_MOIS);
    }

    @Test
    @Transactional
    void putNonExistingTiersFinanceur() throws Exception {
        int databaseSizeBeforeUpdate = tiersFinanceurRepository.findAll().size();
        tiersFinanceur.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTiersFinanceurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tiersFinanceur.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tiersFinanceur))
            )
            .andExpect(status().isBadRequest());

        // Validate the TiersFinanceur in the database
        List<TiersFinanceur> tiersFinanceurList = tiersFinanceurRepository.findAll();
        assertThat(tiersFinanceurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTiersFinanceur() throws Exception {
        int databaseSizeBeforeUpdate = tiersFinanceurRepository.findAll().size();
        tiersFinanceur.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTiersFinanceurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tiersFinanceur))
            )
            .andExpect(status().isBadRequest());

        // Validate the TiersFinanceur in the database
        List<TiersFinanceur> tiersFinanceurList = tiersFinanceurRepository.findAll();
        assertThat(tiersFinanceurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTiersFinanceur() throws Exception {
        int databaseSizeBeforeUpdate = tiersFinanceurRepository.findAll().size();
        tiersFinanceur.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTiersFinanceurMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tiersFinanceur)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TiersFinanceur in the database
        List<TiersFinanceur> tiersFinanceurList = tiersFinanceurRepository.findAll();
        assertThat(tiersFinanceurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTiersFinanceurWithPatch() throws Exception {
        // Initialize the database
        tiersFinanceurRepository.saveAndFlush(tiersFinanceur);

        int databaseSizeBeforeUpdate = tiersFinanceurRepository.findAll().size();

        // Update the tiersFinanceur using partial update
        TiersFinanceur partialUpdatedTiersFinanceur = new TiersFinanceur();
        partialUpdatedTiersFinanceur.setId(tiersFinanceur.getId());

        partialUpdatedTiersFinanceur
            .nom(UPDATED_NOM)
            .isActif(UPDATED_IS_ACTIF)
            .dateInscription(UPDATED_DATE_INSCRIPTION)
            .moisLancement(UPDATED_MOIS_LANCEMENT)
            .derniereAnnee(UPDATED_DERNIERE_ANNEE);

        restTiersFinanceurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTiersFinanceur.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTiersFinanceur))
            )
            .andExpect(status().isOk());

        // Validate the TiersFinanceur in the database
        List<TiersFinanceur> tiersFinanceurList = tiersFinanceurRepository.findAll();
        assertThat(tiersFinanceurList).hasSize(databaseSizeBeforeUpdate);
        TiersFinanceur testTiersFinanceur = tiersFinanceurList.get(tiersFinanceurList.size() - 1);
        assertThat(testTiersFinanceur.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testTiersFinanceur.getLocalisation()).isEqualTo(DEFAULT_LOCALISATION);
        assertThat(testTiersFinanceur.getIsActif()).isEqualTo(UPDATED_IS_ACTIF);
        assertThat(testTiersFinanceur.getDateInscription()).isEqualTo(UPDATED_DATE_INSCRIPTION);
        assertThat(testTiersFinanceur.getAnneLancement()).isEqualTo(DEFAULT_ANNE_LANCEMENT);
        assertThat(testTiersFinanceur.getMoisLancement()).isEqualTo(UPDATED_MOIS_LANCEMENT);
        assertThat(testTiersFinanceur.getDateResiliation()).isEqualTo(DEFAULT_DATE_RESILIATION);
        assertThat(testTiersFinanceur.getDerniereAnnee()).isEqualTo(UPDATED_DERNIERE_ANNEE);
        assertThat(testTiersFinanceur.getDernierMois()).isEqualTo(DEFAULT_DERNIER_MOIS);
    }

    @Test
    @Transactional
    void fullUpdateTiersFinanceurWithPatch() throws Exception {
        // Initialize the database
        tiersFinanceurRepository.saveAndFlush(tiersFinanceur);

        int databaseSizeBeforeUpdate = tiersFinanceurRepository.findAll().size();

        // Update the tiersFinanceur using partial update
        TiersFinanceur partialUpdatedTiersFinanceur = new TiersFinanceur();
        partialUpdatedTiersFinanceur.setId(tiersFinanceur.getId());

        partialUpdatedTiersFinanceur
            .nom(UPDATED_NOM)
            .localisation(UPDATED_LOCALISATION)
            .isActif(UPDATED_IS_ACTIF)
            .dateInscription(UPDATED_DATE_INSCRIPTION)
            .anneLancement(UPDATED_ANNE_LANCEMENT)
            .moisLancement(UPDATED_MOIS_LANCEMENT)
            .dateResiliation(UPDATED_DATE_RESILIATION)
            .derniereAnnee(UPDATED_DERNIERE_ANNEE)
            .dernierMois(UPDATED_DERNIER_MOIS);

        restTiersFinanceurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTiersFinanceur.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTiersFinanceur))
            )
            .andExpect(status().isOk());

        // Validate the TiersFinanceur in the database
        List<TiersFinanceur> tiersFinanceurList = tiersFinanceurRepository.findAll();
        assertThat(tiersFinanceurList).hasSize(databaseSizeBeforeUpdate);
        TiersFinanceur testTiersFinanceur = tiersFinanceurList.get(tiersFinanceurList.size() - 1);
        assertThat(testTiersFinanceur.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testTiersFinanceur.getLocalisation()).isEqualTo(UPDATED_LOCALISATION);
        assertThat(testTiersFinanceur.getIsActif()).isEqualTo(UPDATED_IS_ACTIF);
        assertThat(testTiersFinanceur.getDateInscription()).isEqualTo(UPDATED_DATE_INSCRIPTION);
        assertThat(testTiersFinanceur.getAnneLancement()).isEqualTo(UPDATED_ANNE_LANCEMENT);
        assertThat(testTiersFinanceur.getMoisLancement()).isEqualTo(UPDATED_MOIS_LANCEMENT);
        assertThat(testTiersFinanceur.getDateResiliation()).isEqualTo(UPDATED_DATE_RESILIATION);
        assertThat(testTiersFinanceur.getDerniereAnnee()).isEqualTo(UPDATED_DERNIERE_ANNEE);
        assertThat(testTiersFinanceur.getDernierMois()).isEqualTo(UPDATED_DERNIER_MOIS);
    }

    @Test
    @Transactional
    void patchNonExistingTiersFinanceur() throws Exception {
        int databaseSizeBeforeUpdate = tiersFinanceurRepository.findAll().size();
        tiersFinanceur.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTiersFinanceurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, tiersFinanceur.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tiersFinanceur))
            )
            .andExpect(status().isBadRequest());

        // Validate the TiersFinanceur in the database
        List<TiersFinanceur> tiersFinanceurList = tiersFinanceurRepository.findAll();
        assertThat(tiersFinanceurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTiersFinanceur() throws Exception {
        int databaseSizeBeforeUpdate = tiersFinanceurRepository.findAll().size();
        tiersFinanceur.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTiersFinanceurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tiersFinanceur))
            )
            .andExpect(status().isBadRequest());

        // Validate the TiersFinanceur in the database
        List<TiersFinanceur> tiersFinanceurList = tiersFinanceurRepository.findAll();
        assertThat(tiersFinanceurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTiersFinanceur() throws Exception {
        int databaseSizeBeforeUpdate = tiersFinanceurRepository.findAll().size();
        tiersFinanceur.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTiersFinanceurMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(tiersFinanceur))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TiersFinanceur in the database
        List<TiersFinanceur> tiersFinanceurList = tiersFinanceurRepository.findAll();
        assertThat(tiersFinanceurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTiersFinanceur() throws Exception {
        // Initialize the database
        tiersFinanceurRepository.saveAndFlush(tiersFinanceur);

        int databaseSizeBeforeDelete = tiersFinanceurRepository.findAll().size();

        // Delete the tiersFinanceur
        restTiersFinanceurMockMvc
            .perform(delete(ENTITY_API_URL_ID, tiersFinanceur.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TiersFinanceur> tiersFinanceurList = tiersFinanceurRepository.findAll();
        assertThat(tiersFinanceurList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
