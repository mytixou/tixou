package fr.tixou.archisolver.domain;

import static org.assertj.core.api.Assertions.assertThat;

import fr.tixou.archisolver.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SoldeApaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SoldeApa.class);
        SoldeApa soldeApa1 = new SoldeApa();
        soldeApa1.setId(1L);
        SoldeApa soldeApa2 = new SoldeApa();
        soldeApa2.setId(soldeApa1.getId());
        assertThat(soldeApa1).isEqualTo(soldeApa2);
        soldeApa2.setId(2L);
        assertThat(soldeApa1).isNotEqualTo(soldeApa2);
        soldeApa1.setId(null);
        assertThat(soldeApa1).isNotEqualTo(soldeApa2);
    }
}
