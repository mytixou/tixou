package fr.tixou.archisolver.domain;

import static org.assertj.core.api.Assertions.assertThat;

import fr.tixou.archisolver.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class StrategieCiTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StrategieCi.class);
        StrategieCi strategieCi1 = new StrategieCi();
        strategieCi1.setId(1L);
        StrategieCi strategieCi2 = new StrategieCi();
        strategieCi2.setId(strategieCi1.getId());
        assertThat(strategieCi1).isEqualTo(strategieCi2);
        strategieCi2.setId(2L);
        assertThat(strategieCi1).isNotEqualTo(strategieCi2);
        strategieCi1.setId(null);
        assertThat(strategieCi1).isNotEqualTo(strategieCi2);
    }
}
