package fr.tixou.archisolver.domain;

import static org.assertj.core.api.Assertions.assertThat;

import fr.tixou.archisolver.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SoldePchETest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SoldePchE.class);
        SoldePchE soldePchE1 = new SoldePchE();
        soldePchE1.setId(1L);
        SoldePchE soldePchE2 = new SoldePchE();
        soldePchE2.setId(soldePchE1.getId());
        assertThat(soldePchE1).isEqualTo(soldePchE2);
        soldePchE2.setId(2L);
        assertThat(soldePchE1).isNotEqualTo(soldePchE2);
        soldePchE1.setId(null);
        assertThat(soldePchE1).isNotEqualTo(soldePchE2);
    }
}
