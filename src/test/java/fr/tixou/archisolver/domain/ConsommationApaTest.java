package fr.tixou.archisolver.domain;

import static org.assertj.core.api.Assertions.assertThat;

import fr.tixou.archisolver.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ConsommationApaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ConsommationApa.class);
        ConsommationApa consommationApa1 = new ConsommationApa();
        consommationApa1.setId(1L);
        ConsommationApa consommationApa2 = new ConsommationApa();
        consommationApa2.setId(consommationApa1.getId());
        assertThat(consommationApa1).isEqualTo(consommationApa2);
        consommationApa2.setId(2L);
        assertThat(consommationApa1).isNotEqualTo(consommationApa2);
        consommationApa1.setId(null);
        assertThat(consommationApa1).isNotEqualTo(consommationApa2);
    }
}
