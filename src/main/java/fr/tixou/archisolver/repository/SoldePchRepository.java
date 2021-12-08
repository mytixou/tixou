package fr.tixou.archisolver.repository;

import fr.tixou.archisolver.domain.SoldePch;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the SoldePch entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SoldePchRepository extends JpaRepository<SoldePch, Long> {}
