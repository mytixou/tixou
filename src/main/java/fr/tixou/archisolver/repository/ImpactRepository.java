package fr.tixou.archisolver.repository;

import fr.tixou.archisolver.domain.Impact;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Impact entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImpactRepository extends JpaRepository<Impact, Long> {}
