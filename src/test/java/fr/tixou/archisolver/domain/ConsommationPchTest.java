package fr.tixou.archisolver.domain;

import static org.assertj.core.api.Assertions.assertThat;

import fr.tixou.archisolver.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ConsommationPchTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ConsommationPch.class);
        ConsommationPch consommationPch1 = new ConsommationPch();
        consommationPch1.setId(1L);
        ConsommationPch consommationPch2 = new ConsommationPch();
        consommationPch2.setId(consommationPch1.getId());
        assertThat(consommationPch1).isEqualTo(consommationPch2);
        consommationPch2.setId(2L);
        assertThat(consommationPch1).isNotEqualTo(consommationPch2);
        consommationPch1.setId(null);
        assertThat(consommationPch1).isNotEqualTo(consommationPch2);
    }
}
