package fr.tixou.archisolver.domain;

import static org.assertj.core.api.Assertions.assertThat;

import fr.tixou.archisolver.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class NatureActiviteTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NatureActivite.class);
        NatureActivite natureActivite1 = new NatureActivite();
        natureActivite1.setId(1L);
        NatureActivite natureActivite2 = new NatureActivite();
        natureActivite2.setId(natureActivite1.getId());
        assertThat(natureActivite1).isEqualTo(natureActivite2);
        natureActivite2.setId(2L);
        assertThat(natureActivite1).isNotEqualTo(natureActivite2);
        natureActivite1.setId(null);
        assertThat(natureActivite1).isNotEqualTo(natureActivite2);
    }
}
