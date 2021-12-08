package fr.tixou.archisolver.repository;

import fr.tixou.archisolver.domain.StrategieCi;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the StrategieCi entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StrategieCiRepository extends JpaRepository<StrategieCi, Long> {}
