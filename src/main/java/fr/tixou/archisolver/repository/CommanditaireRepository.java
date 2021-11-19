package fr.tixou.archisolver.repository;

import fr.tixou.archisolver.domain.Commanditaire;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Commanditaire entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommanditaireRepository extends JpaRepository<Commanditaire, Long> {}
