package fr.tixou.archisolver.domain;

import static org.assertj.core.api.Assertions.assertThat;

import fr.tixou.archisolver.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SoldePchTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SoldePch.class);
        SoldePch soldePch1 = new SoldePch();
        soldePch1.setId(1L);
        SoldePch soldePch2 = new SoldePch();
        soldePch2.setId(soldePch1.getId());
        assertThat(soldePch1).isEqualTo(soldePch2);
        soldePch2.setId(2L);
        assertThat(soldePch1).isNotEqualTo(soldePch2);
        soldePch1.setId(null);
        assertThat(soldePch1).isNotEqualTo(soldePch2);
    }
}
