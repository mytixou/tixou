package fr.tixou.archisolver.domain;

import static org.assertj.core.api.Assertions.assertThat;

import fr.tixou.archisolver.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ConsommationCiTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ConsommationCi.class);
        ConsommationCi consommationCi1 = new ConsommationCi();
        consommationCi1.setId(1L);
        ConsommationCi consommationCi2 = new ConsommationCi();
        consommationCi2.setId(consommationCi1.getId());
        assertThat(consommationCi1).isEqualTo(consommationCi2);
        consommationCi2.setId(2L);
        assertThat(consommationCi1).isNotEqualTo(consommationCi2);
        consommationCi1.setId(null);
        assertThat(consommationCi1).isNotEqualTo(consommationCi2);
    }
}
