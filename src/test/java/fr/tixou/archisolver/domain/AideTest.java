package fr.tixou.archisolver.domain;

import static org.assertj.core.api.Assertions.assertThat;

import fr.tixou.archisolver.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AideTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Aide.class);
        Aide aide1 = new Aide();
        aide1.setId(1L);
        Aide aide2 = new Aide();
        aide2.setId(aide1.getId());
        assertThat(aide1).isEqualTo(aide2);
        aide2.setId(2L);
        assertThat(aide1).isNotEqualTo(aide2);
        aide1.setId(null);
        assertThat(aide1).isNotEqualTo(aide2);
    }
}
