package fr.tixou.archisolver.domain;

import static org.assertj.core.api.Assertions.assertThat;

import fr.tixou.archisolver.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TiersFinanceurTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TiersFinanceur.class);
        TiersFinanceur tiersFinanceur1 = new TiersFinanceur();
        tiersFinanceur1.setId(1L);
        TiersFinanceur tiersFinanceur2 = new TiersFinanceur();
        tiersFinanceur2.setId(tiersFinanceur1.getId());
        assertThat(tiersFinanceur1).isEqualTo(tiersFinanceur2);
        tiersFinanceur2.setId(2L);
        assertThat(tiersFinanceur1).isNotEqualTo(tiersFinanceur2);
        tiersFinanceur1.setId(null);
        assertThat(tiersFinanceur1).isNotEqualTo(tiersFinanceur2);
    }
}
