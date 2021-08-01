package fr.tixou.archisolver.domain;

import static org.assertj.core.api.Assertions.assertThat;

import fr.tixou.archisolver.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CommanditaireTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Commanditaire.class);
        Commanditaire commanditaire1 = new Commanditaire();
        commanditaire1.setId(1L);
        Commanditaire commanditaire2 = new Commanditaire();
        commanditaire2.setId(commanditaire1.getId());
        assertThat(commanditaire1).isEqualTo(commanditaire2);
        commanditaire2.setId(2L);
        assertThat(commanditaire1).isNotEqualTo(commanditaire2);
        commanditaire1.setId(null);
        assertThat(commanditaire1).isNotEqualTo(commanditaire2);
    }
}
