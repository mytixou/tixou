package fr.tixou.archisolver.domain;

import static org.assertj.core.api.Assertions.assertThat;

import fr.tixou.archisolver.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ConsommationPchETest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ConsommationPchE.class);
        ConsommationPchE consommationPchE1 = new ConsommationPchE();
        consommationPchE1.setId(1L);
        ConsommationPchE consommationPchE2 = new ConsommationPchE();
        consommationPchE2.setId(consommationPchE1.getId());
        assertThat(consommationPchE1).isEqualTo(consommationPchE2);
        consommationPchE2.setId(2L);
        assertThat(consommationPchE1).isNotEqualTo(consommationPchE2);
        consommationPchE1.setId(null);
        assertThat(consommationPchE1).isNotEqualTo(consommationPchE2);
    }
}
