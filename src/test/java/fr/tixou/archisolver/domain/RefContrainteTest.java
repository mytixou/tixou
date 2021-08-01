package fr.tixou.archisolver.domain;

import static org.assertj.core.api.Assertions.assertThat;

import fr.tixou.archisolver.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RefContrainteTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RefContrainte.class);
        RefContrainte refContrainte1 = new RefContrainte();
        refContrainte1.setId(1L);
        RefContrainte refContrainte2 = new RefContrainte();
        refContrainte2.setId(refContrainte1.getId());
        assertThat(refContrainte1).isEqualTo(refContrainte2);
        refContrainte2.setId(2L);
        assertThat(refContrainte1).isNotEqualTo(refContrainte2);
        refContrainte1.setId(null);
        assertThat(refContrainte1).isNotEqualTo(refContrainte2);
    }
}
