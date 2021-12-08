package fr.tixou.archisolver.repository;

import fr.tixou.archisolver.domain.Aide;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Aide entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AideRepository extends JpaRepository<Aide, Long> {}
