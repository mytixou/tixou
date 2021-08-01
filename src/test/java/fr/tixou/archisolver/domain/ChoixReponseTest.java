package fr.tixou.archisolver.domain;

import static org.assertj.core.api.Assertions.assertThat;

import fr.tixou.archisolver.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ChoixReponseTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChoixReponse.class);
        ChoixReponse choixReponse1 = new ChoixReponse();
        choixReponse1.setId(1L);
        ChoixReponse choixReponse2 = new ChoixReponse();
        choixReponse2.setId(choixReponse1.getId());
        assertThat(choixReponse1).isEqualTo(choixReponse2);
        choixReponse2.setId(2L);
        assertThat(choixReponse1).isNotEqualTo(choixReponse2);
        choixReponse1.setId(null);
        assertThat(choixReponse1).isNotEqualTo(choixReponse2);
    }
}
