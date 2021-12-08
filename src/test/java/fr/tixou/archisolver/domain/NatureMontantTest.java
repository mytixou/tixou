package fr.tixou.archisolver.domain;

import static org.assertj.core.api.Assertions.assertThat;

import fr.tixou.archisolver.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class NatureMontantTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NatureMontant.class);
        NatureMontant natureMontant1 = new NatureMontant();
        natureMontant1.setId(1L);
        NatureMontant natureMontant2 = new NatureMontant();
        natureMontant2.setId(natureMontant1.getId());
        assertThat(natureMontant1).isEqualTo(natureMontant2);
        natureMontant2.setId(2L);
        assertThat(natureMontant1).isNotEqualTo(natureMontant2);
        natureMontant1.setId(null);
        assertThat(natureMontant1).isNotEqualTo(natureMontant2);
    }
}
