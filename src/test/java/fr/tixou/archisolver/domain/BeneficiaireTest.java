package fr.tixou.archisolver.domain;

import static org.assertj.core.api.Assertions.assertThat;

import fr.tixou.archisolver.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class BeneficiaireTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Beneficiaire.class);
        Beneficiaire beneficiaire1 = new Beneficiaire();
        beneficiaire1.setId("id1");
        Beneficiaire beneficiaire2 = new Beneficiaire();
        beneficiaire2.setId(beneficiaire1.getId());
        assertThat(beneficiaire1).isEqualTo(beneficiaire2);
        beneficiaire2.setId("id2");
        assertThat(beneficiaire1).isNotEqualTo(beneficiaire2);
        beneficiaire1.setId(null);
        assertThat(beneficiaire1).isNotEqualTo(beneficiaire2);
    }
}
