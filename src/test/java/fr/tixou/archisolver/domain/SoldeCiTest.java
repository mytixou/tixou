package fr.tixou.archisolver.domain;

import static org.assertj.core.api.Assertions.assertThat;

import fr.tixou.archisolver.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SoldeCiTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SoldeCi.class);
        SoldeCi soldeCi1 = new SoldeCi();
        soldeCi1.setId(1L);
        SoldeCi soldeCi2 = new SoldeCi();
        soldeCi2.setId(soldeCi1.getId());
        assertThat(soldeCi1).isEqualTo(soldeCi2);
        soldeCi2.setId(2L);
        assertThat(soldeCi1).isNotEqualTo(soldeCi2);
        soldeCi1.setId(null);
        assertThat(soldeCi1).isNotEqualTo(soldeCi2);
    }
}
