package fr.tixou.archisolver.repository;

import fr.tixou.archisolver.domain.SoldePchE;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the SoldePchE entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SoldePchERepository extends JpaRepository<SoldePchE, Long> {}
