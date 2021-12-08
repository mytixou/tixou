package fr.tixou.archisolver.domain;

import static org.assertj.core.api.Assertions.assertThat;

import fr.tixou.archisolver.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class StrategieApaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StrategieApa.class);
        StrategieApa strategieApa1 = new StrategieApa();
        strategieApa1.setId(1L);
        StrategieApa strategieApa2 = new StrategieApa();
        strategieApa2.setId(strategieApa1.getId());
        assertThat(strategieApa1).isEqualTo(strategieApa2);
        strategieApa2.setId(2L);
        assertThat(strategieApa1).isNotEqualTo(strategieApa2);
        strategieApa1.setId(null);
        assertThat(strategieApa1).isNotEqualTo(strategieApa2);
    }
}
