package fr.tixou.archisolver.repository;

import fr.tixou.archisolver.domain.SoldeApa;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the SoldeApa entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SoldeApaRepository extends JpaRepository<SoldeApa, Long> {}
