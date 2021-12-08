package fr.tixou.archisolver.domain;

import static org.assertj.core.api.Assertions.assertThat;

import fr.tixou.archisolver.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class StrategiePchTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StrategiePch.class);
        StrategiePch strategiePch1 = new StrategiePch();
        strategiePch1.setId(1L);
        StrategiePch strategiePch2 = new StrategiePch();
        strategiePch2.setId(strategiePch1.getId());
        assertThat(strategiePch1).isEqualTo(strategiePch2);
        strategiePch2.setId(2L);
        assertThat(strategiePch1).isNotEqualTo(strategiePch2);
        strategiePch1.setId(null);
        assertThat(strategiePch1).isNotEqualTo(strategiePch2);
    }
}
