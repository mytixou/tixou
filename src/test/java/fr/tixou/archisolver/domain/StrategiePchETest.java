package fr.tixou.archisolver.domain;

import static org.assertj.core.api.Assertions.assertThat;

import fr.tixou.archisolver.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class StrategiePchETest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StrategiePchE.class);
        StrategiePchE strategiePchE1 = new StrategiePchE();
        strategiePchE1.setId(1L);
        StrategiePchE strategiePchE2 = new StrategiePchE();
        strategiePchE2.setId(strategiePchE1.getId());
        assertThat(strategiePchE1).isEqualTo(strategiePchE2);
        strategiePchE2.setId(2L);
        assertThat(strategiePchE1).isNotEqualTo(strategiePchE2);
        strategiePchE1.setId(null);
        assertThat(strategiePchE1).isNotEqualTo(strategiePchE2);
    }
}
