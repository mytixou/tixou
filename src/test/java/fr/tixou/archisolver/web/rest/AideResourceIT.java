package fr.tixou.archisolver.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.tixou.archisolver.IntegrationTest;
import fr.tixou.archisolver.domain.Aide;
import fr.tixou.archisolver.domain.enumeration.TypeAide;
import fr.tixou.archisolver.repository.AideRepository;
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
 * Integration tests for the {@link AideResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AideResourceIT {

    private static final TypeAide DEFAULT_NOM = TypeAide.CI;
    private static final TypeAide UPDATED_NOM = TypeAide.APA;

    private static final Boolean DEFAULT_IS_ACTIF = false;
    private static final Boolean UPDATED_IS_ACTIF = true;

    private static final LocalDate DEFAULT_DATE_LANCEMENT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_LANCEMENT = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_ANNE_LANCEMENT = 1;
    private static final Integer UPDATED_ANNE_LANCEMENT = 2;

    private static final Integer DEFAULT_MOIS_LANCEMENT = 1;
    private static final Integer UPDATED_MOIS_LANCEMENT = 2;

    private static final LocalDate DEFAULT_DATE_ARRET = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_ARRET = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_DERNIERE_ANNEE = 1;
    private static final Integer UPDATED_DERNIERE_ANNEE = 2;

    private static final Integer DEFAULT_DERNIER_MOIS = 1;
    private static final Integer UPDATED_DERNIER_MOIS = 2;

    private static final String ENTITY_API_URL = "/api/aides";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AideRepository aideRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAideMockMvc;

    private Aide aide;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Aide createEntity(EntityManager em) {
        Aide aide = new Aide()
            .nom(DEFAULT_NOM)
            .isActif(DEFAULT_IS_ACTIF)
            .dateLancement(DEFAULT_DATE_LANCEMENT)
            .anneLancement(DEFAULT_ANNE_LANCEMENT)
            .moisLancement(DEFAULT_MOIS_LANCEMENT)
            .dateArret(DEFAULT_DATE_ARRET)
            .derniereAnnee(DEFAULT_DERNIERE_ANNEE)
            .dernierMois(DEFAULT_DERNIER_MOIS);
        return aide;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Aide createUpdatedEntity(EntityManager em) {
        Aide aide = new Aide()
            .nom(UPDATED_NOM)
            .isActif(UPDATED_IS_ACTIF)
            .dateLancement(UPDATED_DATE_LANCEMENT)
            .anneLancement(UPDATED_ANNE_LANCEMENT)
            .moisLancement(UPDATED_MOIS_LANCEMENT)
            .dateArret(UPDATED_DATE_ARRET)
            .derniereAnnee(UPDATED_DERNIERE_ANNEE)
            .dernierMois(UPDATED_DERNIER_MOIS);
        return aide;
    }

    @BeforeEach
    public void initTest() {
        aide = createEntity(em);
    }

    @Test
    @Transactional
    void createAide() throws Exception {
        int databaseSizeBeforeCreate = aideRepository.findAll().size();
        // Create the Aide
        restAideMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(aide)))
            .andExpect(status().isCreated());

        // Validate the Aide in the database
        List<Aide> aideList = aideRepository.findAll();
        assertThat(aideList).hasSize(databaseSizeBeforeCreate + 1);
        Aide testAide = aideList.get(aideList.size() - 1);
        assertThat(testAide.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testAide.getIsActif()).isEqualTo(DEFAULT_IS_ACTIF);
        assertThat(testAide.getDateLancement()).isEqualTo(DEFAULT_DATE_LANCEMENT);
        assertThat(testAide.getAnneLancement()).isEqualTo(DEFAULT_ANNE_LANCEMENT);
        assertThat(testAide.getMoisLancement()).isEqualTo(DEFAULT_MOIS_LANCEMENT);
        assertThat(testAide.getDateArret()).isEqualTo(DEFAULT_DATE_ARRET);
        assertThat(testAide.getDerniereAnnee()).isEqualTo(DEFAULT_DERNIERE_ANNEE);
        assertThat(testAide.getDernierMois()).isEqualTo(DEFAULT_DERNIER_MOIS);
    }

    @Test
    @Transactional
    void createAideWithExistingId() throws Exception {
        // Create the Aide with an existing ID
        aide.setId(1L);

        int databaseSizeBeforeCreate = aideRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAideMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(aide)))
            .andExpect(status().isBadRequest());

        // Validate the Aide in the database
        List<Aide> aideList = aideRepository.findAll();
        assertThat(aideList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAides() throws Exception {
        // Initialize the database
        aideRepository.saveAndFlush(aide);

        // Get all the aideList
        restAideMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(aide.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].isActif").value(hasItem(DEFAULT_IS_ACTIF.booleanValue())))
            .andExpect(jsonPath("$.[*].dateLancement").value(hasItem(DEFAULT_DATE_LANCEMENT.toString())))
            .andExpect(jsonPath("$.[*].anneLancement").value(hasItem(DEFAULT_ANNE_LANCEMENT)))
            .andExpect(jsonPath("$.[*].moisLancement").value(hasItem(DEFAULT_MOIS_LANCEMENT)))
            .andExpect(jsonPath("$.[*].dateArret").value(hasItem(DEFAULT_DATE_ARRET.toString())))
            .andExpect(jsonPath("$.[*].derniereAnnee").value(hasItem(DEFAULT_DERNIERE_ANNEE)))
            .andExpect(jsonPath("$.[*].dernierMois").value(hasItem(DEFAULT_DERNIER_MOIS)));
    }

    @Test
    @Transactional
    void getAide() throws Exception {
        // Initialize the database
        aideRepository.saveAndFlush(aide);

        // Get the aide
        restAideMockMvc
            .perform(get(ENTITY_API_URL_ID, aide.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(aide.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.isActif").value(DEFAULT_IS_ACTIF.booleanValue()))
            .andExpect(jsonPath("$.dateLancement").value(DEFAULT_DATE_LANCEMENT.toString()))
            .andExpect(jsonPath("$.anneLancement").value(DEFAULT_ANNE_LANCEMENT))
            .andExpect(jsonPath("$.moisLancement").value(DEFAULT_MOIS_LANCEMENT))
            .andExpect(jsonPath("$.dateArret").value(DEFAULT_DATE_ARRET.toString()))
            .andExpect(jsonPath("$.derniereAnnee").value(DEFAULT_DERNIERE_ANNEE))
            .andExpect(jsonPath("$.dernierMois").value(DEFAULT_DERNIER_MOIS));
    }

    @Test
    @Transactional
    void getNonExistingAide() throws Exception {
        // Get the aide
        restAideMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewAide() throws Exception {
        // Initialize the database
        aideRepository.saveAndFlush(aide);

        int databaseSizeBeforeUpdate = aideRepository.findAll().size();

        // Update the aide
        Aide updatedAide = aideRepository.findById(aide.getId()).get();
        // Disconnect from session so that the updates on updatedAide are not directly saved in db
        em.detach(updatedAide);
        updatedAide
            .nom(UPDATED_NOM)
            .isActif(UPDATED_IS_ACTIF)
            .dateLancement(UPDATED_DATE_LANCEMENT)
            .anneLancement(UPDATED_ANNE_LANCEMENT)
            .moisLancement(UPDATED_MOIS_LANCEMENT)
            .dateArret(UPDATED_DATE_ARRET)
            .derniereAnnee(UPDATED_DERNIERE_ANNEE)
            .dernierMois(UPDATED_DERNIER_MOIS);

        restAideMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAide.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedAide))
            )
            .andExpect(status().isOk());

        // Validate the Aide in the database
        List<Aide> aideList = aideRepository.findAll();
        assertThat(aideList).hasSize(databaseSizeBeforeUpdate);
        Aide testAide = aideList.get(aideList.size() - 1);
        assertThat(testAide.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testAide.getIsActif()).isEqualTo(UPDATED_IS_ACTIF);
        assertThat(testAide.getDateLancement()).isEqualTo(UPDATED_DATE_LANCEMENT);
        assertThat(testAide.getAnneLancement()).isEqualTo(UPDATED_ANNE_LANCEMENT);
        assertThat(testAide.getMoisLancement()).isEqualTo(UPDATED_MOIS_LANCEMENT);
        assertThat(testAide.getDateArret()).isEqualTo(UPDATED_DATE_ARRET);
        assertThat(testAide.getDerniereAnnee()).isEqualTo(UPDATED_DERNIERE_ANNEE);
        assertThat(testAide.getDernierMois()).isEqualTo(UPDATED_DERNIER_MOIS);
    }

    @Test
    @Transactional
    void putNonExistingAide() throws Exception {
        int databaseSizeBeforeUpdate = aideRepository.findAll().size();
        aide.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAideMockMvc
            .perform(
                put(ENTITY_API_URL_ID, aide.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(aide))
            )
            .andExpect(status().isBadRequest());

        // Validate the Aide in the database
        List<Aide> aideList = aideRepository.findAll();
        assertThat(aideList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAide() throws Exception {
        int databaseSizeBeforeUpdate = aideRepository.findAll().size();
        aide.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAideMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(aide))
            )
            .andExpect(status().isBadRequest());

        // Validate the Aide in the database
        List<Aide> aideList = aideRepository.findAll();
        assertThat(aideList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAide() throws Exception {
        int databaseSizeBeforeUpdate = aideRepository.findAll().size();
        aide.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAideMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(aide)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Aide in the database
        List<Aide> aideList = aideRepository.findAll();
        assertThat(aideList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAideWithPatch() throws Exception {
        // Initialize the database
        aideRepository.saveAndFlush(aide);

        int databaseSizeBeforeUpdate = aideRepository.findAll().size();

        // Update the aide using partial update
        Aide partialUpdatedAide = new Aide();
        partialUpdatedAide.setId(aide.getId());

        partialUpdatedAide.derniereAnnee(UPDATED_DERNIERE_ANNEE);

        restAideMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAide.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAide))
            )
            .andExpect(status().isOk());

        // Validate the Aide in the database
        List<Aide> aideList = aideRepository.findAll();
        assertThat(aideList).hasSize(databaseSizeBeforeUpdate);
        Aide testAide = aideList.get(aideList.size() - 1);
        assertThat(testAide.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testAide.getIsActif()).isEqualTo(DEFAULT_IS_ACTIF);
        assertThat(testAide.getDateLancement()).isEqualTo(DEFAULT_DATE_LANCEMENT);
        assertThat(testAide.getAnneLancement()).isEqualTo(DEFAULT_ANNE_LANCEMENT);
        assertThat(testAide.getMoisLancement()).isEqualTo(DEFAULT_MOIS_LANCEMENT);
        assertThat(testAide.getDateArret()).isEqualTo(DEFAULT_DATE_ARRET);
        assertThat(testAide.getDerniereAnnee()).isEqualTo(UPDATED_DERNIERE_ANNEE);
        assertThat(testAide.getDernierMois()).isEqualTo(DEFAULT_DERNIER_MOIS);
    }

    @Test
    @Transactional
    void fullUpdateAideWithPatch() throws Exception {
        // Initialize the database
        aideRepository.saveAndFlush(aide);

        int databaseSizeBeforeUpdate = aideRepository.findAll().size();

        // Update the aide using partial update
        Aide partialUpdatedAide = new Aide();
        partialUpdatedAide.setId(aide.getId());

        partialUpdatedAide
            .nom(UPDATED_NOM)
            .isActif(UPDATED_IS_ACTIF)
            .dateLancement(UPDATED_DATE_LANCEMENT)
            .anneLancement(UPDATED_ANNE_LANCEMENT)
            .moisLancement(UPDATED_MOIS_LANCEMENT)
            .dateArret(UPDATED_DATE_ARRET)
            .derniereAnnee(UPDATED_DERNIERE_ANNEE)
            .dernierMois(UPDATED_DERNIER_MOIS);

        restAideMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAide.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAide))
            )
            .andExpect(status().isOk());

        // Validate the Aide in the database
        List<Aide> aideList = aideRepository.findAll();
        assertThat(aideList).hasSize(databaseSizeBeforeUpdate);
        Aide testAide = aideList.get(aideList.size() - 1);
        assertThat(testAide.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testAide.getIsActif()).isEqualTo(UPDATED_IS_ACTIF);
        assertThat(testAide.getDateLancement()).isEqualTo(UPDATED_DATE_LANCEMENT);
        assertThat(testAide.getAnneLancement()).isEqualTo(UPDATED_ANNE_LANCEMENT);
        assertThat(testAide.getMoisLancement()).isEqualTo(UPDATED_MOIS_LANCEMENT);
        assertThat(testAide.getDateArret()).isEqualTo(UPDATED_DATE_ARRET);
        assertThat(testAide.getDerniereAnnee()).isEqualTo(UPDATED_DERNIERE_ANNEE);
        assertThat(testAide.getDernierMois()).isEqualTo(UPDATED_DERNIER_MOIS);
    }

    @Test
    @Transactional
    void patchNonExistingAide() throws Exception {
        int databaseSizeBeforeUpdate = aideRepository.findAll().size();
        aide.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAideMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, aide.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(aide))
            )
            .andExpect(status().isBadRequest());

        // Validate the Aide in the database
        List<Aide> aideList = aideRepository.findAll();
        assertThat(aideList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAide() throws Exception {
        int databaseSizeBeforeUpdate = aideRepository.findAll().size();
        aide.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAideMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(aide))
            )
            .andExpect(status().isBadRequest());

        // Validate the Aide in the database
        List<Aide> aideList = aideRepository.findAll();
        assertThat(aideList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAide() throws Exception {
        int databaseSizeBeforeUpdate = aideRepository.findAll().size();
        aide.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAideMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(aide)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Aide in the database
        List<Aide> aideList = aideRepository.findAll();
        assertThat(aideList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAide() throws Exception {
        // Initialize the database
        aideRepository.saveAndFlush(aide);

        int databaseSizeBeforeDelete = aideRepository.findAll().size();

        // Delete the aide
        restAideMockMvc
            .perform(delete(ENTITY_API_URL_ID, aide.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Aide> aideList = aideRepository.findAll();
        assertThat(aideList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
