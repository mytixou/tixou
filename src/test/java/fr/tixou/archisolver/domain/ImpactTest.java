package fr.tixou.archisolver.domain;

import static org.assertj.core.api.Assertions.assertThat;

import fr.tixou.archisolver.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ImpactTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Impact.class);
        Impact impact1 = new Impact();
        impact1.setId(1L);
        Impact impact2 = new Impact();
        impact2.setId(impact1.getId());
        assertThat(impact1).isEqualTo(impact2);
        impact2.setId(2L);
        assertThat(impact1).isNotEqualTo(impact2);
        impact1.setId(null);
        assertThat(impact1).isNotEqualTo(impact2);
    }
}
